'use client'

import { useAppContext } from '@/store/context'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ClientGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const { mediaDir } = useAppContext()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!mediaDir && pathname !== '/settings') {
      // TODO: do a notification telling the user to set their media directory before proceeding
      console.log('Please set your media directory before proceeding.');
      router.push('/settings')
    }
  }, [mediaDir, pathname, router])

  return children
}
