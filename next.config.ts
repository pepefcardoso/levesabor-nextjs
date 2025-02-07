import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    domains: ["s3.amazonaws.com", "via.placeholder.com", "example.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
