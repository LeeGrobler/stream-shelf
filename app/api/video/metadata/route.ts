import path from "path";
import { existsSync, readdirSync, statSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

import { ensureCacheDir, loadCache, saveCache } from "@/lib/api/cache";
import { VIDEO_EXTENSIONS } from "@/lib/constants";
import { generateThumbnail, getVideoDuration } from "@/lib/api/ffmpeg";
import { MetadataGenerationResponse } from "@/lib/types/metadata";
import pLimit from "p-limit";

export async function POST(req: NextRequest) {
  try {
    const { directory } = await req.json()
    if (!directory) {
      return NextResponse.json<MetadataGenerationResponse>({
        ok: false,
        message: 'Missing directory'
      }, { status: 400 })
    }

    if (!existsSync(directory)) {
      return NextResponse.json<MetadataGenerationResponse>({
        ok: false,
        message: 'Directory does not exist'
      }, { status: 400 })
    }

    const { cacheDir, thumbsDir } = ensureCacheDir(directory)
    const cache = loadCache(cacheDir)
    const videos = readdirSync(directory, { withFileTypes: true })
      .filter(e => e.isFile())
      .filter(e => VIDEO_EXTENSIONS.has(path.extname(e.name).toLowerCase()))

    let processed = 0
    let skipped = 0
    let failed = 0

    const limit = pLimit(5) // TODO: move this to a config file, probably
    await Promise.all(
      videos.map(e =>
        limit(async () => {
          const filePath = path.join(directory, e.name)

          try {
            const status = statSync(filePath)
            const cached = cache.videos[e.name]

            if (cached?.mtime === status.mtimeMs) {
              skipped++
              return
            }

            const slug = e.name.toLowerCase().replace(/\.[^/.]+$/, '').replace(/[^a-z0-9]+/g, '-')
            const duration = await getVideoDuration(filePath)
            await generateThumbnail(filePath, thumbsDir, duration, slug)

            cache.videos[e.name] = {
              duration,
              slug,
              mtime: status.mtimeMs
            }

            saveCache(cacheDir, cache)
            processed++
          } catch (err) {
            console.log('Metadata generation failed for:', e.name, err);
            failed++
          }
        })
      )
    )

    return NextResponse.json<MetadataGenerationResponse>({
      ok: true,
      processed,
      skipped,
      failed,
    })

  } catch (err) {
    console.log('Metadata route failed: ', err);
    return NextResponse.json<MetadataGenerationResponse>({
      ok: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}
