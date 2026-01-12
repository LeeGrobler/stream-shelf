'use client'

import { useEffect, useState } from "react"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface Folder {
  name: string;
  parentPath: string;
  path: string;
}

const DirectoryPicker = () => {
  const [cwd, setCwd] = useState<string | null>(null)
  const [folders, setFolders] = useState<Folder[] | null>(null)

  useEffect(() => {
    const fetchFolders = async () => {
      const response = await fetch(`${BASE_URL}/api/directory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cwd: cwd || localStorage.getItem('directory')
        })
      })

      if (!response.ok) throw new Error(response?.statusText || "Failed to fetch folders");
      const data = await response.json()

      setCwd(data.cwd)
      setFolders(data.folders)
    }

    fetchFolders()
  }, [cwd])

  const handleFolderClick = (folder: string) => {
    setCwd(`${cwd}${folder}/`)
  }

  const handleBackClick = () => {
    if (!cwd) return

    const dirArr = cwd.split('/')
    dirArr.splice(-2)
    setCwd(dirArr?.join('/') + '/')
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2>CWD: {cwd}</h2>
        <div className="flex gap-4">
          <button onClick={handleBackClick}>Back</button>
          <button onClick={() => localStorage.setItem('directory', cwd as string)}>Select</button>
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