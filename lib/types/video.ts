export type Video = {
  name: string
  slug: string
  durationSeconds: number
  url: string
  thumbUrl: string
  previewUrl: string
  status?: 'idle' | 'processing' | 'ready' | 'error'
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
