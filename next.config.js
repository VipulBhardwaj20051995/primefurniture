/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // More compatible with AWS Amplify hosting
  images: {
    unoptimized: true,
  },
  // Add this experimental flag to help with client components
  experimental: {
    serverComponentsExternalPackages: ['@aws-amplify/auth', 'aws-amplify'],
  }
};

module.exports = nextConfig;
