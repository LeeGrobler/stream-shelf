'use client'

import AppProviders from "@/store/providers"

type Props = Readonly<{
  children: React.ReactNode;
}>

export default function ClientBootstrap({ children }: Props) {
  return (
    <AppProviders>
      {children}
    </AppProviders>
  )
}
