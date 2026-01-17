'use client'

import { useEffect, useState } from "react"
import { useAppContext } from "@/store/context";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface Folder {
  name: string;
  parentPath: string;
  path: string;
}

const DirectoryPicker = () => {
  const { mediaDir, setMediaDir } = useAppContext()

  // const [cwd, setCwd] = useState<string | null>(null)
  const [folders, setFolders] = useState<Folder[] | null>(null)

  useEffect(() => {
    console.log('mediaDir: ', mediaDir);
  }, [mediaDir])

  useEffect(() => {
    const fetchFolders = async () => {
      const response = await fetch(`${BASE_URL}/api/directory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cwd: mediaDir || localStorage.getItem('mediaDir')
        })
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
    // <button onClick={() => setMediaDir('/mnt/media')}>
    //   Set media dir
    // </button>

    <div>
      <div className="flex justify-between">
        <h2>CWD: {mediaDir}</h2>
        <div className="flex gap-4">
          <button onClick={handleBackClick}>Back</button>
          <button onClick={() => localStorage.setItem('directory', mediaDir as string)}>Select</button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-4">
        {folders?.map(folder => (
          <button
            key={folder.name}
            onClick={() => handleFolderClick(folder.name)}
            className="text-left"
          >{folder.name}</button>
        ))}
      </div>
    </div>
  )
}

export default DirectoryPicker