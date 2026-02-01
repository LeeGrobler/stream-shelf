import path from 'path';
import mime from 'mime'
import { createReadStream, existsSync, readdirSync, statSync } from 'fs';
import { NextRequest, NextResponse } from 'next/server';

import { Video, VideoResponse } from '@/lib/types/video';
import { VIDEO_EXTENSIONS } from '@/lib/constants';
import { ensureCacheDir, loadCache } from '@/lib/api/cache';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const dir = searchParams.get('dir')
  const file = searchParams.get('file')
  const preview = Boolean(searchParams.get('preview'))

  if (!dir || !file) {
    return new NextResponse('Missing params', { status: 400 })
  }

  const filePath = preview
    ? path.join(`${dir}/.ss-cache/previews`, `${file}.mp4`)
    : path.join(dir, file)

  if (!existsSync(filePath)) {
    return new NextResponse('File does not exist', { status: 404 })
  }

  const stat = statSync(filePath)
  const range = req.headers.get('range')

  if (!range) {
    return new NextResponse(
      createReadStream(filePath) as unknown as BodyInit, {
      headers: {
        'Content-Type': mime.getType(filePath) ?? 'application/octet-stream',
        'Content-Length': stat.size.toString(),
      }
    })
  }

  try {
    const [startStr, endStr] = range.replace(/bytes=/, '').split('-')
    const start = parseInt(startStr, 10)
    const end = endStr ? parseInt(endStr, 10) : stat.size - 1
    const chunkSize = end - start + 1
    const stream = createReadStream(filePath, { start, end })

    return new NextResponse(stream as unknown as BodyInit, {
      status: 206,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize.toString(),
        'Content-Type': mime.getType(filePath) ?? 'application/octet-stream',
      },
    })
  } catch (err) {
    console.log('error: ', err);
    return new NextResponse('Failed to stream video', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { directory } = await req.json()
    if (!directory) {
      return NextResponse.json<VideoResponse>({
        ok: false,
        message: 'No directory included',
      }, { status: 400 })
    }

    const entries = readdirSync(directory, { withFileTypes: true })
      .filter(e => e.isFile())
      .filter(e => VIDEO_EXTENSIONS.has(path.extname(e.name).toLowerCase()))

    if (!entries.length) {
      return NextResponse.json<VideoResponse>({
        ok: false,
        message: 'No videos found'
      }, { status: 400 })
    }

    const { cacheDir } = ensureCacheDir(directory)
    const cache = loadCache(cacheDir)

    const videos: Video[] = entries.map(e => {
      const name = e.name.split('.')[0]
      const slug = cache.videos?.[e.name]?.slug
      const durationSeconds = cache.videos?.[e.name]?.durationSeconds

      return {
        name,
        slug,
        durationSeconds,
        url: `/api/video?dir=${encodeURIComponent(directory)}&file=${encodeURIComponent(e.name)}`,
        thumbUrl: `/api/thumbnail?dir=${encodeURIComponent(directory)}&file=${encodeURIComponent(`${slug}_1.png`)}`,
        previewUrl: `/api/video?preview=true&dir=${encodeURIComponent(directory)}&file=${encodeURIComponent(slug)}`,
      }
    })

    return NextResponse.json<VideoResponse>({
      ok: true,
      message: 'Videos fetched successfully',
      videos
    }, { status: 200 })
  } catch (err) {
    console.log('error: ', err);

    return NextResponse.json<VideoResponse>({
      ok: false,
      message: 'Video fetching failed',
    }, { status: 500 })
  }
}
