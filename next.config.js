/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['farcastipmini.vercel.app'],
    unoptimized: true,
  }
}

module.exports = nextConfig