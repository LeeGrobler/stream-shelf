import Link from "next/link"
import { MdOndemandVideo } from "react-icons/md";

const HomePage = () => {
  return (
    <>
      <section className="text-center">
        <h1 className="text-6xl max-sm:text-4xl pb-4 to-[#94eaff] bg-linear-to-b from-white via-white
        bg-clip-text font-semibold text-transparent"
        >
          Your Streaming Library<br />Reimagined
        </h1>
        <p className="mt-5 text-xl">Organize, browse, and stream the videos on your PC - beautifully.</p>

        <button className="btn mt-12 gap-2">
          <Link href='/videos'>My Videos</Link>
          <MdOndemandVideo className="text-2xl" />
        </button>
      </section>
    </>
  )
}

export default HomePage
