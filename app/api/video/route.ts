import { readdirSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { directory } = await req.json()
    if (!directory) {
      return NextResponse.json({
        message: 'No directory included',
      }, { status: 400 })
    }

    console.log('directory:', directory);

    const videos = readdirSync(directory)

    return NextResponse.json({
      message: 'Videos fetched successfully',
      directory: directory,
      videos
    }, { status: 200 })
  } catch (error) {
    console.log('error: ', error);

    return NextResponse.json({
      message: 'Video fetching failed',
      error
    }, { status: 500 })
  }
}
