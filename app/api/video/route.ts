import { readdirSync } from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    /*
      TODO:
      1. set up default directory and read its content
      2. filter out non-video files
      3. transform file names to pretty print
    */

    const files = readdirSync(process.cwd())

    return NextResponse.json({
      message: 'Videos fetched successfully',
      files
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      message: 'Video fetching failed',
      error
    }, { status: 500 })
  }
}