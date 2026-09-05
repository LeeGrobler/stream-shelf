export type Video = {
  id: string
  name: string
  fileName: string
  durationSeconds?: number
  url: string
  thumbUrl: string
  previewUrl: string
  addedAt?: number
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
