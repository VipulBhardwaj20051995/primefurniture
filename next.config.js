/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // More compatible with AWS Amplify hosting
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
