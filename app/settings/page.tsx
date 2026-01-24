'use client'

import DirectoryPicker from '@/components/DirectoryPicker'
import Modal from '@/components/Modal'
import { useMediaDir } from '@/store/media-dir.context'

const SettingsPage = () => {
  const { mediaDir } = useMediaDir()

  return (
    <>
      <section className="flex justify-between">
        Media Folder: {mediaDir}

        <Modal
          openText="Change"
          title="Add Media Folder"
          footer={<button className="btn">Done</button>}
        >
          <DirectoryPicker />
        </Modal>
      </section>
    </>
  )
}

export default SettingsPage