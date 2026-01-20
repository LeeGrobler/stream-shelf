'use client'

import { useEffect, useState } from "react"
import { useAppContext } from "@/store/context";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface Folder {
  name: string;
  parentPath: string;
  path: string;
}

const DirectoryPicker = ({
  handleSelectClick
}: {
  handleSelectClick: () => void
}) => {
  const { mediaDir, setMediaDir } = useAppContext()
  const [folders, setFolders] = useState<Folder[] | null>(null)

  useEffect(() => {
    const fetchFolders = async () => {
      const response = await fetch(`${BASE_URL}/api/directory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cwd: mediaDir })
      })

      if (!response.ok) throw new Error(response?.statusText || "Failed to fetch folders");
      const data = await response.json()

      setMediaDir(data.cwd)
      setFolders(data.folders)
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