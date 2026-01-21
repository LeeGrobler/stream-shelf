import { createReadStream, readdirSync, statSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import mime from 'mime'

const VIDEO_EXTENSIONS = new Set(['.mp4', '.mkv', '.avi', '.mov', '.webm', '.flv', '.wmv', '.m4v'])

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const dir = searchParams.get('dir')
  const file = searchParams.get('file')

  if (!dir || !file) {
    return new NextResponse("Missing params", { status: 400 })
  }

  const filePath = path.join(dir, file)
  const stat = statSync(filePath)
  const range = req.headers.get('range')

  if (!range) {
    return new NextResponse(
      createReadStream(filePath) as unknown as BodyInit,
      {
        headers: {
          "Content-Type": mime.getType(filePath) ?? 'application/octet-stream',
          "Content-Length": stat.size.toString(),
        }
      }
    )
  }

  const [startStr, endStr] = range.replace(/bytes=/, '').split('-')
  const start = parseInt(startStr, 10)
  const end = endStr ? parseInt(endStr, 10) : stat.size - 1
  const chunkSize = end - start + 1
  const stream = createReadStream(filePath, { start, end })

  return new NextResponse(stream as unknown as BodyInit, {
    status: 206,
    headers: {
      "Content-Range": `bytes ${start}-${end}/${stat.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize.toString(),
      "Content-Type": mime.getType(filePath) ?? 'application/octet-stream',
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const { directory } = await req.json()
    if (!directory) {
      return NextResponse.json({
        message: 'No directory included',
      }, { status: 400 })
    }

    const entries = readdirSync(directory, { withFileTypes: true })
    const videos = entries
      .filter(e => e.isFile())
      .filter(e => VIDEO_EXTENSIONS.has(path.extname(e.name).toLowerCase()))
      .map(e => ({
        name: e.name,
        subs: e.name.replace(/\.[^/.]+$/, ".vtt"),
        url: `/api/video?dir=${encodeURIComponent(directory)}&file=${encodeURIComponent(e.name)}`
      }))
      .sort((a, b) => Number(a.name > b.name))

    return NextResponse.json({
      message: 'Videos fetched successfully',
      videos
    }, { status: 200 })
  } catch (error) {
    console.log('error: ', error);

    return NextResponse.json({
      message: 'Video fetching failed',
    }, { status: 500 })
  }
}
