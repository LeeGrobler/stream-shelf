import Image from "next/image";
import Link from "next/link";

import { VideoItem } from "@/lib/constants";

const VideoCard = ({ title, image, duration }: VideoItem) => {
  return (
    <Link href={'/videos'} id="video-card">
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
        style={{ width: '100%', height: 'auto' }}
      />

      <p className="title">{title}</p>

      <div className="datetime">
        <div>
          <Image
            src="/icons/clock.svg"
            alt="time"
            width={14}
            height={14}
            style={{ width: '100%', height: 'auto' }}
          />
          <p>{duration}</p>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard