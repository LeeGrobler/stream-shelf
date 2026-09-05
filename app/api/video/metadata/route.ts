import path from "path";
import { existsSync, readdirSync, statSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

import { ensureCacheDir, getVideoId, loadCache, saveCache } from "@/lib/api/cache";
import { VIDEO_EXTENSIONS } from "@/lib/constants";
import { generatePreview, generateThumbnails, getVideoDuration } from "@/lib/api/ffmpeg";
import { MetadataGenerationResponse } from "@/lib/types/metadata";
import pLimit from "p-limit";

export async function POST(req: NextRequest) {
  // TODO: rework this whole thing, i hate it.
  // we need a clear cache button too that just drops .ss-cache
  // it shouldn't skip generation just because the json mtime number hasn't changed
  // implement mvc services, these routes are getting silly long
  // implement real-time updates

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

    const { cacheDir, thumbsDir, previewDir } = ensureCacheDir(directory)
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
            const id = getVideoId(e.name)
            const thumbPath = path.join(thumbsDir, `${id}_1.png`)
            const previewPath = path.join(previewDir, `${id}.mp4`)

            if (cached?.mtime === status.mtimeMs && existsSync(thumbPath) && existsSync(previewPath)) {
              skipped++
              return
            }

            const durationSeconds = cached?.mtime === status.mtimeMs
              ? cached.durationSeconds
              : await getVideoDuration(filePath)

            await generateThumbnails(filePath, thumbsDir, durationSeconds, id)
            generatePreview(thumbsDir, previewDir, id)

            cache.videos[e.name] = {
              durationSeconds,
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

    saveCache(cacheDir, cache)

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
