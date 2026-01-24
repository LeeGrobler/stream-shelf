export type Video = {
  name: string
  link: string
  duration: number
  url: string
  thumbUrl: string
}

export type VideoSuccessResponse = {
  ok: true
  message: string
  videos: Video[]
}

export type VideoErrorResponse = {
  ok: false
  message: string
}

export type VideoResponse = VideoSuccessResponse | VideoErrorResponse
