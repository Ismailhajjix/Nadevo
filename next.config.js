/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/nadevo',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /framer-motion/,
      sideEffects: false
    })
    return config
  },
  typescript: {
    // Temporarily ignore type errors during build
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig 