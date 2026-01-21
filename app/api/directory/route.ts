import { readdirSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // TODO: implement path security by defaulting to the user folder and disallowing traversing up from there
    let { cwd } = await req.json()
    if (!cwd) cwd = 'C:/'

    const folders = readdirSync(cwd, { withFileTypes: true })
      .filter(entry => entry.isDirectory());

    return NextResponse.json({
      message: 'Directories fetched successfully',
      cwd,
      folders
    }, { status: 200 })
  } catch (error) {
    console.log('error: ', error);

    return NextResponse.json({
      message: 'Directory fetching failed',
      error
    }, { status: 500 })
  }
}