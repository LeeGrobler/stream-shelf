'use client'

import { useEffect, useRef } from 'react'
import { useVideo } from '@/store/video.context'

type Props = {
  id: string
}

const VideoClient = ({ id }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { videos } = useVideo()
  const video = videos.find(v => v.id === id)

  useEffect(() => {
    if (!video || !videoRef.current) return

    videoRef.current.play().catch(() => { })
  }, [video])

  if (!video) return <p>Video not found</p>

  return (
    <div>
      <video ref={videoRef} key={video.fileName} controls autoPlay playsInline>
        <source src={video.url} />
      </video>

      <h3 className="text-lg mt-4">{video.name}</h3>
    </div>
  )
}

export default VideoClient
