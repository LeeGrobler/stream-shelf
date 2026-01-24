'use client'

import VideoCard from '@/components/VideoCard'
import { useVideo } from '@/store/video.context'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
if (!BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL not set")

const VideosPage = () => {
  const { videos } = useVideo()

  const handleGenerateMetadata = async () => {
    // await fetch('/api/video/metadata', { method: 'POST' })

    const response = await fetch(`${BASE_URL}/api/video/metadata`) // , {})
    if (!response.ok) throw new Error(response?.statusText || "Failed to fetch videos")

    // const response = await fetch(`${BASE_URL}/api/video`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ directory: mediaDir })
    // })

    // if (!response.ok) throw new Error(response?.statusText || "Failed to fetch videos")

    // const data: VideoResponse = await response.json()
    // if (!data.ok) throw new Error(data.message)

    // setVideos(data.videos)
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="card bg-base-200">
        <div className="card-body py-4 px-6 flex-row items-center justify-between">
          <div>
            Here&apos;ll be filters and sorting
          </div>

          <div className="flex items-center gap-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={handleGenerateMetadata}
            >
              Generate metadata
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {videos.map(video => (
          <VideoCard key={video.name} {...video} />
        ))}
      </div>
    </section>
  )
}

export default VideosPage
