/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Amplify
  images: {
    unoptimized: true, // Required for static deployment
  },
  // No experimental settings - they caused errors
  staticPageGenerationTimeout: 1, // 1 second timeout for static generation
};

module.exports = nextConfig;
