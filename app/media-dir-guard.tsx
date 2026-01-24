'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useMediaDir } from '@/store/media-dir.context'

type Props = Readonly<{
  children: React.ReactNode
}>

const MediaDirGuard = ({ children }: Props) => {
  const { mediaDir } = useMediaDir()
  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (mediaDir === null) return

    if (mediaDir === '' && path !== '/settings') {
      // TODO: show an alert here, saying the following:
      console.log('Please set your media directory before proceeding.')
      router.replace('/settings')
    }
  }, [mediaDir, path, router])

  if (mediaDir === null) {
    // TODO: show a loader of some kind
    return null
  }

  return <>{children}</>
}

export default MediaDirGuard