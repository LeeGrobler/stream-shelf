'use client'

import { useVideo } from '@/store/video.context'

type Props = {
  slug: string
}

const VideoClient = ({ slug }: Props) => {
  const { videos } = useVideo()
  const video = videos.find(v => v.slug === slug)

  if (!video) return <p>Video not found</p>

  return (
    <div>
      <video key={video.fileName} controls>
        <source src={video.url} />
      </video>

      <h3 className="text-lg mt-4">{video.name}</h3>
    </div>
  )
}

export default VideoClient
