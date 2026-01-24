'use client'

import DirectoryPicker from '@/components/DirectoryPicker'
import Modal from '@/components/Modal'
import { useMediaDir } from '@/store/media-dir.context'

const SettingsPage = () => {
  const { mediaDir } = useMediaDir()

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-base-content/60">
          Configure how the app behaves
        </p>
      </header>

      <section className="card bg-base-200 shadow-sm">
        <div className="card-body space-y-4">
          <h2 className="card-title text-base">Media</h2>

          <div className="divider my-0" />

          <div className="flex items-start justify-between gap-6">
            <div className="space-y-1">
              <div className="font-medium">Media folder</div>
              <div className="text-sm text-base-content/60 break-all">
                {mediaDir || 'No folder selected'}
              </div>
            </div>

            <Modal
              openText="Change"
              title="Change media folder"
              footer={<button className="btn btn-primary btn-sm">Done</button>}
            >
              <DirectoryPicker />
            </Modal>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SettingsPage
