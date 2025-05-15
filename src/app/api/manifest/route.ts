import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    name: "FarcasTip",
    description: "Send MON test tokens as tips on Monad testnet",
    url: "https://farcastipmini.vercel.app",
    icon: "https://farcastipmini.vercel.app/icon.png",
    splash: {
      image: "https://farcastipmini.vercel.app/splash.png",
      backgroundColor: "#4F46E5"
    }
  }

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  })
} 