type VideoMetadata = {
  fileName: string
  durationSeconds: number
  mtime: number
}

export type Index = {
  version: 2
  videos: Record<string, VideoMetadata>
}

type MetadataGenerationSuccessResponse = {
  ok: true
  processed: number
  skipped: number
  failed: number
}

type MetadataGenerationErrorResponse = {
  ok: false
  message: string
}

export type MetadataGenerationResponse = MetadataGenerationSuccessResponse | MetadataGenerationErrorResponse
