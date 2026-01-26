export type Index = {
  version: 1
  videos: Record<string, {
    duration: number
    thumb: string
    mtime: number
  }>
}