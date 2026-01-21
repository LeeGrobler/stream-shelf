'use client'

import { useState } from 'react'
import DirectoryPicker from '@/components/DirectoryPicker'
import Modal from '@/components/Modal'
import { useAppContext } from '@/store/context'

const SettingsPage = () => {
  const { mediaDir } = useAppContext()
  const [open, setOpen] = useState(false)

  return (
    <>
      <section className='flex justify-between'>
        Media Directory: {mediaDir}
        <button onClick={() => setOpen(true)}>Change</button>

        <Modal open={open} onClose={() => setOpen(false)} title="Set Media Directory">
          <DirectoryPicker handleSelectClick={() => setOpen(false)} />
        </Modal>
      </section>
    </>
  )
}

export default SettingsPage