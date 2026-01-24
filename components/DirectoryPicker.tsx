'use client'

import { useCallback, useEffect, useState } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { FaFolder } from "react-icons/fa";

import { useMediaDir } from '@/store/media-dir.context';
import { Folder, FoldersResponse } from '@/lib/types/folder';
import DirectoryButton from './DirectoryButton';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
if (!BASE_URL) throw new Error('NEXT_PUBLIC_BASE_URL not set')

export type DirectoryActions = {
  handleBack: () => void
}

type Props = Readonly<{
  onReady?: (actions: DirectoryActions) => void
}>

const DirectoryPicker = ({ onReady }: Props) => {
  const { mediaDir, setMediaDir } = useMediaDir()
  const [folders, setFolders] = useState<Folder[] | null>(null)

  const handleFolderClick = (folder: string) => {
    if (mediaDir === null) return
    setMediaDir(`${mediaDir}${folder}/`)
  }

  const handleBack = useCallback(() => {
    if (!mediaDir) return

    const dirArr = mediaDir.split('/')
    dirArr.splice(-2)
    setMediaDir(dirArr.join('/') + '/')
  }, [mediaDir, setMediaDir])

  // this uses inversion of control to lift up handleBack, allowing parent to invoke it
  useEffect(() => {
    if (!onReady) return
    onReady({ handleBack })
  }, [onReady, handleBack])

  useEffect(() => {
    if (mediaDir === null) return

    const fetchFolders = async () => {
      const response = await fetch(`${BASE_URL}/api/directory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cwd: mediaDir })
      })

      if (!response.ok) throw new Error(response?.statusText || 'Failed to fetch folders');

      const data: FoldersResponse = await response.json()
      if (!data.ok) throw new Error(data.message)

      setFolders(data.folders)
      if (data.cwd !== mediaDir) {
        setMediaDir(data.cwd)
      }
    }

    fetchFolders()
  }, [mediaDir, setMediaDir])

  if (mediaDir === null) {
    return <p>Loading directory…</p>
  }

  return (
    <div className="flex flex-col">
      <input value={mediaDir} name="cwd" type="text" placeholder="Folder" className="input w-full" disabled />

      <div className="max-h-72 overflow-y-auto">
        {mediaDir.split('/').length > 2 &&
          <DirectoryButton onClick={handleBack}>
            <IoArrowBackOutline />
            ... [Back]
          </DirectoryButton>
        }

        {folders?.map((folder, i) => (
          <DirectoryButton
            key={folder.name}
            onClick={() => handleFolderClick(folder.name)}
            className={i % 2 === 0 ? 'bg-[#181A1E]' : ''}
          >
            <FaFolder />
            {folder.name}
          </DirectoryButton>
        ))}
      </div>
    </div >
  )
}

export default DirectoryPicker