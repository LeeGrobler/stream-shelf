import { createContext, useContext, useState } from "react"

type Ctx = {
  mediaDir: string | null
  setMediaDir: (v: string | null) => void
}

const Context = createContext<Ctx | undefined>(undefined)

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [mediaDir, setMediaDir] = useState<string | null>(null)

  return (
    <Context.Provider value={{ mediaDir, setMediaDir }}>
      {children}
    </Context.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useAppContext must be used inside ContextProvider')
  return ctx
}
