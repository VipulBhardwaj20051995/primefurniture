/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Amplify
  images: {
    unoptimized: true, // Required for static deployment
  },
  experimental: {
    serverExternalPackages: ['@aws-amplify/auth', 'aws-amplify'], // Correct property name
  }
};

module.exports = nextConfig; // Note: There's a typo in your code (nextConf)
