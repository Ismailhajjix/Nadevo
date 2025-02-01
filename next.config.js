/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name', // Replace with your repository name
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