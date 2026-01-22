import { createContext, useContext, useEffect, useSyncExternalStore } from "react"
import { usePathname, useRouter } from 'next/navigation'

type Ctx = {
  mediaDir: string | null
  setMediaDir: (v: string | null) => void
}

type Props = Readonly<{
  children: React.ReactNode;
}>

const Context = createContext<Ctx | undefined>(undefined)

export function MediaDirProvider({ children }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  const mediaDir = useSyncExternalStore(
    (listener: () => void) => {
      window.addEventListener("storage", listener);
      return () => void window.removeEventListener("storage", listener);
    },
    () => localStorage.getItem('mediaDir'),
    () => null
  )

  useEffect(() => {
    if (!localStorage.getItem('mediaDir')) {
      localStorage.setItem('mediaDir', '')
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'mediaDir', newValue: '' })
      )

      if (pathname !== '/settings') {
        // TODO: do a notification telling the user to set their media directory before proceeding
        console.log('Please set your media directory before proceeding.');
        router.push('/settings')
      }
    }
  }, [pathname, router])

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

export function useMediaDir() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useMediaDir must be used inside MediaDirProvider')
  return ctx
}
