/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['farcastip.vercel.app'], // We'll update this with the actual domain after deployment
  },
  // Enable static image optimization
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 