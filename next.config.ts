import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
  output: "export",
  reactStrictMode: true,
  basePath: "/levesabor-nextjs",
};

export default nextConfig;
