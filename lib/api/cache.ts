import path from "path";
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
      version: 1,
      videos: {}
    }
  }

  return JSON.parse(readFileSync(index, 'utf-8'))
}

export function saveCache(cacheDir: string, cache: Index) {
  const index = path.join(cacheDir, 'index.json')
  writeFileSync(index, JSON.stringify(cache))
}
