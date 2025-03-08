import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"], // 画像のホストを許可
  },
};

export default nextConfig;
