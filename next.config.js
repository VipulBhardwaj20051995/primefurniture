/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Amplify
  images: {
    unoptimized: true, // Required for static deployment
  },
  // Add a more generous timeout
  staticPageGenerationTimeout: 180, // 60 seconds should be plenty
  // Add reliable error handling
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  }
};

module.exports = nextConfig;
