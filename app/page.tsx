import VideoCard from "@/components/VideoCard"
import ContinueBtn from "@/components/ContinueBtn"
import { videos } from "@/lib/constants"

const HomePage = () => {
  return (
    <section>
      <h1 className="text-center">Your Streaming Library<br />Reimagined</h1>
      <p className="text-center mt-5">Organize, browse, and stream the videos on your PC - beautifully.</p>

      <ContinueBtn />

      <div className="mt-20 space-y-7">
        <h3>Continue Watching</h3>

        <ul className="videos">
          {videos.map((video) => (
            <li key={video.title}>
              <VideoCard {...video} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HomePage
