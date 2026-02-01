// import Image from "next/image"
import { useRef, useState } from "react"
import Link from "next/link"

import { Video } from "@/lib/types/video"
import { formatDuration } from "@/lib/client/time"

const VideoCard = ({ name, slug, durationSeconds, thumbUrl, previewUrl, status }: Video) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [previewAvailable, setPreviewAvailable] = useState(true)

  const onEnter = () => {
    if (!previewAvailable || !videoRef.current) return
    videoRef.current.currentTime = 0
    videoRef.current.play().catch(() => { })
  }

  const onLeave = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <article className="group relative rounded-lg overflow-hidden bg-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/video/${slug}`} className="block">
        <div onMouseEnter={onEnter} onMouseLeave={onLeave} className="relative aspect-video overflow-hidden">
          <video
            ref={videoRef}
            src={previewUrl}
            poster={thumbUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover rounded-lg"
            onError={() => setPreviewAvailable(false)}
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-80" />

          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs font-medium text-white">
            {durationSeconds ? formatDuration(durationSeconds) : '?'}
          </span>

          {status === 'processing' && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
              <span className="loading loading-spinner loading-lg text-white" />
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-medium text-white">
            {name}
          </h3>

          {!previewAvailable && (
            <span className="absolute bottom-2 right-2 text-xs opacity-60">
              preview pending
            </span>
          )}
        </div>
      </Link>
    </article>
  )
}

export default VideoCard
