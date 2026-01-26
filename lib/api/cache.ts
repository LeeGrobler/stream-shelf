import path from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { Index } from "@/lib/types/cache";

export function ensureCacheDir(mediaDir: string) {
  const cacheDir = path.join(mediaDir, '.ss-cache')
  const thumbsDir = path.join(cacheDir, 'thumbs')

  mkdirSync(thumbsDir, { recursive: true })
  return { cacheDir, thumbsDir }
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
