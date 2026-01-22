import { readdirSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { FoldersResponse } from "@/lib/types/folder";

export async function POST(req: NextRequest) {
  try {
    // TODO: implement path security by defaulting to the user folder and disallowing traversing up from there
    const request: { cwd: string } = await req.json()
    if (!request.cwd) request.cwd = 'C:/'

    const folders = readdirSync(request.cwd, { withFileTypes: true })
      .filter(entry => entry.isDirectory());

    return NextResponse.json<FoldersResponse>({
      ok: true,
      message: 'Directories fetched successfully',
      cwd: request.cwd,
      folders
    }, { status: 200 })
  } catch (error) {
    console.log('error: ', error);

    return NextResponse.json<FoldersResponse>({
      ok: false,
      message: 'Directory fetching failed',
    }, { status: 500 })
  }
}