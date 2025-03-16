/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Amplify
  images: {
    unoptimized: true, // Required for static deployment
  },
  experimental: {
    serverExternalPackages: ['@aws-amplify/auth', 'aws-amplify'], // Correct property name
  },
  // Add this to prevent static optimization failing
  staticPageGenerationTimeout: 1, // 1 second timeout for static generation
};

module.exports = nextConfig;
