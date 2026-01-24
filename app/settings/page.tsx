'use client'

import { useState } from 'react'
import DirectoryPicker, { DirectoryActions } from '@/components/DirectoryPicker'
import Modal from '@/components/Modal'
import { useMediaDir } from '@/store/media-dir.context'

const SettingsPage = () => {
  const { mediaDir } = useMediaDir()
  const [pickerActions, setPickerActions] = useState<DirectoryActions | null>(null)

  return (
    <>
      <section className="flex justify-between">
        Media Directory: {mediaDir}

        <Modal
          openText="Change"
          title="Set Media Directory"
          footer={
            <>
              <button type="button" onClick={pickerActions?.handleBack} className="btn">Back</button>
              <button className="btn">Done</button>
            </>
          }
        >
          <DirectoryPicker onReady={setPickerActions} />
        </Modal>
      </section>
    </>
  )
}

export default SettingsPage