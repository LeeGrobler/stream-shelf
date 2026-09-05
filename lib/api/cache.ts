import path from "path";
import { createHash } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { Index } from "@/lib/types/metadata";

export function ensureCacheDir(mediaDir: string) {
  const cacheDir = path.join(mediaDir, '.ss-cache')
  const thumbsDir = path.join(cacheDir, 'thumbs')
  const previewDir = path.join(cacheDir, 'previews')

  mkdirSync(thumbsDir, { recursive: true })
  mkdirSync(previewDir, { recursive: true })

  return { cacheDir, thumbsDir, previewDir }
}

export function loadCache(cacheDir: string): Index {
  const index = path.join(cacheDir, 'index.json')

  if (!existsSync(index)) {
    return {
      version: 2,
      videos: {}
    }
  }

  const parsed = JSON.parse(readFileSync(index, 'utf-8')) as {
    videos?: Record<string, {
      fileName?: unknown
      durationSeconds?: unknown
      mtime?: unknown
    }>
  }

  return {
    version: 2,
    videos: Object.fromEntries(
      Object.entries(parsed.videos ?? {}).flatMap(([key, video]) => {
        if (typeof video.durationSeconds !== 'number' || typeof video.mtime !== 'number') {
          return []
        }

        const fileName = typeof video.fileName === 'string' ? video.fileName : key
        const id = getVideoId(fileName)

        return [[id, {
          fileName,
          durationSeconds: video.durationSeconds,
          mtime: video.mtime
        }]]
      })
    )
  }
}

export function saveCache(cacheDir: string, cache: Index) {
  const index = path.join(cacheDir, 'index.json')
  writeFileSync(index, JSON.stringify(cache, null, 2))
}

export function getVideoId(fileName: string) {
  return createHash('sha256').update(fileName).digest('base64url').slice(0, 16)
}
