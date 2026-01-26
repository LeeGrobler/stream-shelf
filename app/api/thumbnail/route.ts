import mime from 'mime'
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { createReadStream, existsSync } from "fs";

import { ensureCacheDir } from "@/lib/api/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
if (!BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL not set")

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const dir = searchParams.get('dir')
    const file = searchParams.get('file')

    if (!dir || !file) {
      return NextResponse.redirect(`${BASE_URL}/placeholder.png`)
    }

    const { thumbsDir } = ensureCacheDir(dir)
    const thumbPath = path.join(thumbsDir, file)

    if (!existsSync(thumbPath)) {
      return NextResponse.redirect(`${BASE_URL}/placeholder.png`)
    }

    return new NextResponse(
      createReadStream(thumbPath) as unknown as BodyInit, {
      headers: {
        'Content-Type': mime.getType(thumbPath) ?? 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      }
    })

  } catch (err) {
    console.log('Thumbnail route error: ', err);
    return NextResponse.redirect(`${BASE_URL}/placeholder.png`)
  }
}