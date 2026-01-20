'use client'

import { ContextProvider } from "@/store/context"
import ClientGuard from "./client-guard"

export default function ClientBootstrap({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContextProvider>
      <ClientGuard>
        {children}
      </ClientGuard>
    </ContextProvider>
  )
}
