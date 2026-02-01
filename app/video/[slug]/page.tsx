import VideoClient from "@/components/VideoClient"

type Props = {
  params: Promise<{ slug: string }>
}

const VideoPage = async ({ params }: Props) => {
  const { slug } = await params

  return <VideoClient slug={slug} />
}

export default VideoPage
