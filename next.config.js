/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // More compatible with AWS Amplify hosting
  images: {
    unoptimized: true,
  },
  // Fix the property name as mentioned in the warning
  experimental: {
    // OLD: serverComponentsExternalPackages: ['@aws-amplify/auth', 'aws-amplify'],
    serverExternalPackages: ['@aws-amplify/auth', 'aws-amplify'],
  }
};

module.exports = nextConfig;
