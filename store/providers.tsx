'use client'

import { MediaDirProvider } from "./media-dir.context"
import { VideosProvider } from "./videos.context"

type Props = Readonly<{
  children: React.ReactNode;
}>

const AppProviders = ({ children }: Props) => {
  return (
    <MediaDirProvider>
      <VideosProvider>
        {children}
      </VideosProvider>
    </MediaDirProvider>
  )
}

export default AppProviders
