/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Amplify
  images: {
    unoptimized: true, // Required for static deployment
  },
  // Use a much higher timeout if you want to keep this setting
  staticPageGenerationTimeout: 60, // 60 seconds should be plenty
};

module.exports = nextConfig;
