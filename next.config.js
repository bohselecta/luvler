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
  // Disable static optimization for Clerk-dependent pages
  // Clerk keys are injected at runtime by Vercel, not at build time
  output: 'standalone',
};

module.exports = nextConfig;
