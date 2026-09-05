import VideoClient from "@/components/VideoClient"

type Props = {
  params: Promise<{ id: string }>
}

const VideoPage = async ({ params }: Props) => {
  const { id } = await params

  return <VideoClient id={id} />
}

export default VideoPage
