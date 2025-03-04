/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // For static export
  },
  experimental: {
    // This helps with some SSR issues on Amplify
    appDocumentPreloading: false,
  },
  // Handle transpilation issues
  transpilePackages: ['@heroui'],
};

module.exports = nextConfig;
