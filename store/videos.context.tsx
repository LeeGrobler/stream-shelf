import { createContext, useContext, useEffect, useState } from 'react'
import { Video, VideosResponse } from '@/lib/types/video'
import { useMediaDir } from './media-dir.context'

type Ctx = {
  videos: Video[]
}

type Props = Readonly<{
  children: React.ReactNode;
}>

const VideosContext = createContext<Ctx | undefined>(undefined)

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
if (!BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL not set")

export function VideosProvider({ children }: Props) {
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

      const data: VideosResponse = await response.json()
      if (!data.ok) throw new Error(data.message)

      setVideos(data.videos)
    }

    if (mediaDir) fetchVideos()
  }, [mediaDir])

  return (
    <VideosContext.Provider value={{ videos }}>
      {children}
    </VideosContext.Provider>
  )
}

export function useVideos() {
  const ctx = useContext(VideosContext)
  if (!ctx) throw new Error('useVideos must be used inside VideosProvider')
  return ctx
}