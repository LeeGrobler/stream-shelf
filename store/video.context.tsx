import { createContext, useContext, useEffect, useState } from 'react'
import { Video, VideoResponse } from '@/lib/types/video'
import { useMediaDir } from './media-dir.context'

type Ctx = {
  videos: Video[]
}

type Props = Readonly<{
  children: React.ReactNode;
}>

const VideoContext = createContext<Ctx | undefined>(undefined)

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
if (!BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL not set")

export function VideoProvider({ children }: Props) {
  const { mediaDir } = useMediaDir()
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(`${BASE_URL}/api/video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directory: mediaDir })
      })

      if (!response.ok) throw new Error(response?.statusText || "Failed to fetch videos")

      const data: VideoResponse = await response.json()
      if (!data.ok) throw new Error(data.message)

      setVideos(data.videos)
    }

    if (mediaDir) fetchVideos()
  }, [mediaDir])

  return (
    <VideoContext.Provider value={{ videos }}>
      {children}
    </VideoContext.Provider>
  )
}

export function useVideo() {
  const ctx = useContext(VideoContext)
  if (!ctx) throw new Error('useVideo must be used inside VideoProvider')
  return ctx
}