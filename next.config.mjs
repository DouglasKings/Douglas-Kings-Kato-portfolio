/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React Strict Mode for development
  // Disable all development indicators and overlays
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Additional optimizations for production
  experimental: {
    optimizePackageImports: ["lucide-react"], // Optimize imports for lucide-react
  },
  // Add any specific Next.js configurations here.
  // For example, image optimization domains, experimental features, etc.
  // output: 'standalone', // Uncomment if you need standalone output for Docker
};

export default nextConfig;
