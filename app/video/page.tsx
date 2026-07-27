'use client'

import { useMemo, useState } from 'react'
import VideoCard from '@/components/VideoCard'
import { useVideo } from '@/store/video.context'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
if (!BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL not set")

const VideosPage = () => {
  const { videos, isGenerating, generateMetadata } = useVideo()
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'dateAdded'>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const visibleVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const filtered = videos.filter(video => {
      if (!normalizedQuery) return true
      return video.name.toLowerCase().includes(normalizedQuery)
    })

    return filtered.sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1

      if (sortBy === 'dateAdded') {
        const aDate = a.addedAt ?? 0
        const bDate = b.addedAt ?? 0
        return (aDate - bDate) * direction
      }

      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }) * direction
    })
  }, [query, sortBy, sortDirection, videos])

  return (
    <section className="flex flex-col gap-6">
      <div className="card bg-base-200">
        <div className="card-body py-4 px-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <label className="input input-sm flex-1 min-w-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 opacity-70">
                <circle cx="11" cy="11" r="6"></circle>
                <path d="M20 20L16.65 16.65"></path>
              </svg>
              <input
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search videos"
                className="grow"
              />
            </label>

            <div className="flex items-center gap-2">
              <span className="text-sm opacity-70">Sort by</span>
              <div className="join">
                <button
                  type="button"
                  className={`btn btn-sm join-item ${sortBy === 'name' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setSortBy('name')}
                >
                  Name
                </button>
                <button
                  type="button"
                  className={`btn btn-sm join-item ${sortBy === 'dateAdded' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setSortBy('dateAdded')}
                >
                  Date added
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="join">
              <button
                type="button"
                className={`btn btn-sm join-item ${sortDirection === 'asc' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSortDirection('asc')}
              >
                Asc
              </button>
              <button
                type="button"
                className={`btn btn-sm join-item ${sortDirection === 'desc' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSortDirection('desc')}
              >
                Desc
              </button>
            </div>

            <button onClick={generateMetadata} disabled={isGenerating} className="btn btn-sm btn-primary">
              {isGenerating ? 'Generating...' : 'Generate metadata'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {visibleVideos.map(video => (
          <VideoCard key={video.fileName} {...video} />
        ))}
      </div>
    </section>
  )
}

export default VideosPage
