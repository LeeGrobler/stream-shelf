import path from "path";
import { existsSync, readdirSync, statSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

import { ensureCacheDir, loadCache, saveCache } from "@/lib/api/cache";
import { VIDEO_EXTENSIONS } from "@/lib/constants";
import { getVideoDuration } from "@/lib/api/ffmpeg";
import { generateThumbnail } from "@/lib/api/thumbnail";

export async function POST(req: NextRequest) {
  try {
    const { directory } = await req.json()
    if (!directory) {
      return NextResponse.json({
        ok: false,
        message: 'Missing directory'
      }, { status: 400 })
    }

    if (!existsSync(directory)) {
      return NextResponse.json({
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

    for (const e of videos) {
      const filePath = path.join(directory, e.name)

      try {
        const stat = statSync(filePath)
        const cached = cache.videos[e.name]

        if (cached && cached.mtime === stat.mtimeMs) {
          skipped++
          continue
        }

        const duration = await getVideoDuration(filePath)
        const thumb = await generateThumbnail(filePath, thumbsDir, duration, e.name)

        cache.videos[e.name] = {
          duration,
          thumb,
          mtime: stat.mtimeMs
        }

        saveCache(cacheDir, cache)
        processed++
      } catch (err) {
        console.log('Metadata generation failed for:', e.name, err);
        failed++
      }
    }

    return NextResponse.json({
      ok: true,
      processed,
      skipped,
      failed,
    })

  } catch (err) {
    console.log('Metadata route failed: ', err);
    return NextResponse.json({ // TODO: update response json to an actual type
      ok: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}
