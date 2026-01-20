import { useEffect } from 'react'

export default function Modal({
  open,
  onClose,
  title,
  children,
  buttons
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  buttons?: React.ReactNode
}) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-6 text-gray-900 shadow-lg dark:bg-gray-900 dark:text-gray-100">
        {title && (
          <h2 className="mb-4 text-lg font-semibold">
            {title}
          </h2>
        )}

        <div className="text-sm">
          {children}
        </div>

        {buttons ?
          <div className="mt-6 flex justify-end gap-2">
            {buttons}
          </div> : null
        }
      </div>
    </div>
  )
}
