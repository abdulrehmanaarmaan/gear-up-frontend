import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com"
      }
    ]
  }
};

export default nextConfig;
