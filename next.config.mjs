/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  env: {
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  },
  // Optimize build performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@coinbase/onchainkit'],
  },
  // Improve build reliability
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
