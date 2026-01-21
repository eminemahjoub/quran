import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Avoid monorepo lockfile root mis-detection on Windows
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
