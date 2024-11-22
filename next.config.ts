import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React strict mode
  env: {
    MONGODB_URL: process.env.MONGODB_URL, // Expose the environment variable
  },
  webpack: (config) => {
    // Any custom Webpack configurations
    return config;
  },
};

export default nextConfig;
