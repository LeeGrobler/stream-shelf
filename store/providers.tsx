'use client'

import { MediaDirProvider } from "./media-dir.context"
import { VideoProvider } from "./video.context"

type Props = Readonly<{
  children: React.ReactNode;
}>

const AppProviders = ({ children }: Props) => {
  return (
    <MediaDirProvider>
      <VideoProvider>
        {children}
      </VideoProvider>
    </MediaDirProvider>
  )
}

export default AppProviders
