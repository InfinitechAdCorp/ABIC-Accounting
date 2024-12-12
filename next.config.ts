import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  publicRuntimeConfig: {
    loginUsername: 'test',
    loginPassword: '123',
  },
};

export default nextConfig;
