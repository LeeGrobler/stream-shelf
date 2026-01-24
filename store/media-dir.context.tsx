import { createContext, useContext, useSyncExternalStore } from 'react'

type Ctx = {
  mediaDir: string | null
  setMediaDir: (v: string) => void
}

type Props = Readonly<{
  children: React.ReactNode;
}>

const Context = createContext<Ctx | undefined>(undefined)

const subscribe = (listener: () => void) => {
  window.addEventListener('storage', listener)
  return () => window.removeEventListener('storage', listener)
}

const getSnapshot = () => {
  const value = localStorage.getItem('mediaDir')

  if (value === null) {
    localStorage.setItem('mediaDir', '')
    return ''
  }

  return value
}

export function MediaDirProvider({ children }: Props) {
  const mediaDir = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => null
  )

  const setMediaDir = (directory: string) => {
    localStorage.setItem('mediaDir', directory)
    window.dispatchEvent(new StorageEvent('storage'))
  }

  return (
    <Context.Provider value={{ mediaDir, setMediaDir }}>
      {children}
    </Context.Provider>
  )
}

export function useMediaDir() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useMediaDir must be used inside MediaDirProvider')
  return ctx
}
