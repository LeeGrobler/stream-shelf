'use client'

import VideoCard from '@/components/VideoCard'
import { useVideos } from '@/store/videos.context'

const VideosPage = () => {
  const { videos } = useVideos()

  return (
    <section className="grid grid-cols-4 gap-4">
      {videos.map(video => (
        <VideoCard key={video.name} {...video} />
      ))}
    </section>
  )
}

export default VideosPage

