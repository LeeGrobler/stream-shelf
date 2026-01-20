'use client'

import { useState } from 'react'
import DirectoryPicker from '@/components/DirectoryPicker'
import Modal from '@/components/Modal'
import { useAppContext } from '@/store/context'

const SettingsPage = () => {
  const { mediaDir } = useAppContext()
  const [open, setOpen] = useState(false)

  return (
    <main>
      <section className='flex justify-between'>
        Media Directory: {mediaDir}
        <button onClick={() => setOpen(true)}>Change</button>

        <Modal open={open} onClose={() => setOpen(false)} title="Set Media Directory">
          <DirectoryPicker handleSelectClick={() => setOpen(false)} />
        </Modal>
      </section>
    </main>
  )
}

export default SettingsPage