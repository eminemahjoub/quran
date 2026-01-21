import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Avoid monorepo lockfile root mis-detection on Windows
    root: __dirname,
  },
};

export default nextConfig;
