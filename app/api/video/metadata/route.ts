import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {

  } catch (error) {
    console.log('error: ', error);

    return NextResponse.json<GenerateMetadataResponse>({
      ok: false,
      message: 'Failed to generate metadata',
    }, { status: 500 })
  }
}
