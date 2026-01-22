export type Video = {
  // TODO: as these properties become available, start making them required
  name: string
  url: string
  duration?: number
  thumbnailUrl?: string
}

export type VideosSuccessResponse = {
  ok: true
  message: string
  videos: Video[]
}

export type VideosErrorResponse = {
  ok: false
  message: string
}

export type VideosResponse = VideosSuccessResponse | VideosErrorResponse
