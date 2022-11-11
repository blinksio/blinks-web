/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.rareblocks.xyz',
      },
      {
        protocol: 'https',
        hostname: 'i.seadn.io',
      },
    ],
  },
}

module.exports = nextConfig