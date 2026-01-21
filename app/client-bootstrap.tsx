'use client'

import { ContextProvider } from "@/store/context"

export default function ClientBootstrap({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContextProvider>
      {children}
    </ContextProvider>
  )
}
