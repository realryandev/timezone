import { NextResponse } from "next/server"

export const runtime = "nodejs" // Specify Node.js runtime instead of Edge

export async function GET() {
  // Return the current server time
  return NextResponse.json({
    time: new Date().toISOString(),
    success: true,
  })
}

