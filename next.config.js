/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['luvler.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
