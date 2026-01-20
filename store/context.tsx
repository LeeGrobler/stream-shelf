
import { createContext, useContext, useEffect, useSyncExternalStore } from "react"

type Ctx = {
  mediaDir: string | null
  setMediaDir: (v: string | null) => void
}

const Context = createContext<Ctx | undefined>(undefined)

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const mediaDir = useSyncExternalStore(
    (listener: () => void) => {
      window.addEventListener("storage", listener);
      return () => void window.removeEventListener("storage", listener);
    },
    () => localStorage.getItem('mediaDir'),
    () => null
  )

  useEffect(() => {
    if (localStorage.getItem('mediaDir') === null) {
      localStorage.setItem('mediaDir', '')
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'mediaDir', newValue: '' })
      )
    }
  }, [])

  const setMediaDir = (directory: string | null) => {
    if (!directory) localStorage.removeItem('mediaDir')
    else localStorage.setItem('mediaDir', directory)

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'mediaDir',
        newValue: directory,
      })
    )
  }

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
