'use client'

import { useEffect, useState } from "react"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const Videos = () => {
  const [directory] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('directory');
  });

  const [videos, setVideos] = useState<string[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(`${BASE_URL}/api/video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directory })
      })

      if (!response.ok) throw new Error(response?.statusText || "Failed to fetch videos");
      setVideos(await response.json())
    }

    if (directory) fetchVideos()
  }, [directory])

  if (!directory) {
    return (
      <main>
        <p>Please set a media directory before proceeding.</p>
      </main>
    )
  }

  return (
    <main>
      <div>
        <p>{directory}</p>
      </div>
      <div>
        <code>
          {JSON.stringify(videos, null, 2)}
        </code>
      </div>
    </main>
  )
}

export default Videos

