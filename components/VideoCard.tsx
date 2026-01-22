import Image from "next/image"
import Link from "next/link"
import { Video } from "@/lib/types/video"

const VideoCard = ({ name, link, duration, thumbUrl }: Video) => {

  return (
    <article className="group relative rounded-lg overflow-hidden bg-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/videos/${link}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={thumbUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="eager"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-80" />

          {duration && (
            <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs font-medium text-white">
              {duration}
            </span>
          )}
        </div>

        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-medium text-white">
            {name}
          </h3>
        </div>
      </Link>
    </article>
  )
}

export default VideoCard
