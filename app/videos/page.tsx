'use client'

import { useEffect, useState } from "react"
import { useAppContext } from "@/store/context"
import { Video, VideosResponse } from "@/lib/types/video"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
if (!BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL not set")

const VideosPage = () => {
  const { mediaDir } = useAppContext()
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(`${BASE_URL}/api/video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directory: mediaDir })
      })

      if (!response.ok) throw new Error(response?.statusText || "Failed to fetch videos")

      const data: VideosResponse = await response.json()
      if (!data.ok) throw new Error(data.message)

      setVideos(data.videos)
    }

    if (mediaDir) fetchVideos()
  }, [mediaDir])

  return (
    <>
      <section className="grid grid-cols-3 gap-2">
        {videos.map(video => (
          <video key={video.name} controls className="w-full rounded">
            <source src={video.url} />
            <track
              kind="subtitles"
              src={video.url}
              srcLang="en"
              label="English"
              default
            />
          </video>
        ))}
      </section>
    </>
  )
}

export default VideosPage

