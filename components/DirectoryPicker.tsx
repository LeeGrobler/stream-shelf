'use client'

import { useEffect, useState } from "react"
import { useMediaDir } from "@/store/media-dir.context";
import { Folder } from "@/lib/types/folder";
import { FoldersResponse } from "@/lib/types/folder";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
if (!BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL not set")

type Props = Readonly<{
  handleSelectClick: () => void
}>

const DirectoryPicker = ({ handleSelectClick }: Props) => {
  const { mediaDir, setMediaDir } = useMediaDir()
  const [folders, setFolders] = useState<Folder[] | null>(null)

  useEffect(() => {
    const fetchFolders = async () => {
      const response = await fetch(`${BASE_URL}/api/directory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cwd: mediaDir })
      })

      if (!response.ok) throw new Error(response?.statusText || "Failed to fetch folders");

      const data: FoldersResponse = await response.json()
      if (!data.ok) throw new Error(data.message)

      setFolders(data.folders)
      if (data.cwd !== mediaDir) {
        setMediaDir(data.cwd)
      }
    }

    fetchFolders()
  }, [mediaDir, setMediaDir])

  const handleFolderClick = (folder: string) => {
    setMediaDir(`${mediaDir}${folder}/`)
  }

  const handleBackClick = () => {
    if (!mediaDir) return

    const dirArr = mediaDir.split('/')
    dirArr.splice(-2)
    setMediaDir(dirArr?.join('/') + '/')
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h2>{mediaDir}</h2>
      </div>

      <div className="grid grid-cols-4">
        {folders?.map(folder => (
          <button
            key={folder.name}
            onClick={() => handleFolderClick(folder.name)}
            className="text-left"
          >{folder.name}</button>
        ))}
      </div>

      <div className="flex gap-4 justify-end">
        <button onClick={handleBackClick}>Back</button>
        <button onClick={handleSelectClick}>Select</button>
      </div>
    </div>
  )
}

export default DirectoryPicker