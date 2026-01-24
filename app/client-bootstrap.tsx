'use client'

import AppProviders from '@/store/providers'
import MediaDirGuard from './media-dir-guard';

type Props = Readonly<{
  children: React.ReactNode;
}>

export default function ClientBootstrap({ children }: Props) {
  return (
    <AppProviders>
      <MediaDirGuard>
        {children}
      </MediaDirGuard>
    </AppProviders>
  )
}
