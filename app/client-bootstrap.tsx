'use client'

import { ContextProvider } from "@/store/context"

type Props = Readonly<{
  children: React.ReactNode;
}>

export default function ClientBootstrap({ children }: Props) {
  return (
    <ContextProvider>
      {children}
    </ContextProvider>
  )
}
