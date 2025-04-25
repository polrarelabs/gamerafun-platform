import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    API_URL: process.env.API_URL,
    APP_ENVIRONMENT: process.env.APP_ENVIRONMENT,
    BONDING_PACKAGE_ID: process.env.BONDING_PACKAGE_ID,
    NOCTRA_COIN_TYPE: process.env.NOCTRA_COIN_TYPE,
    USDC_COIN_TYPE: process.env.USDC_COIN_TYPE,
    SOCKET_URL: process.env.SOCKET_URL,
    APTOS_API_KEY: process.env.APTOS_API_KEY,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
