/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
    SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
    SQUARE_ENVIRONMENT: process.env.SQUARE_ENVIRONMENT,
    SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
