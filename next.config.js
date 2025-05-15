/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['farcastipmini.vercel.app'],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/farcaster.json',
        destination: '/api/manifest',
      },
    ]
  },
}

module.exports = nextConfig