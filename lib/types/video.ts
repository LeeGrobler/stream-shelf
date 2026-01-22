export type Video = {
  // TODO: as these properties become available, start making them required
  name: string
  link: string
  duration: number
  url: string
  thumbUrl: string
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
