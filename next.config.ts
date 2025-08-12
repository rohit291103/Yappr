/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right', // move from bottom-left to bottom-right
  },
};

module.exports = nextConfig;
