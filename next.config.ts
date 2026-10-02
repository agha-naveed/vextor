import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb', // Allows uploads up to 100MB
    },
  },
};

export default nextConfig;
