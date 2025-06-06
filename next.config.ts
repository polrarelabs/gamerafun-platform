import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    API_URL: process.env.API_URL,
    APP_ENVIRONMENT: process.env.APP_ENVIRONMENT,
    BONDING_PACKAGE_ID: process.env.BONDING_PACKAGE_ID,
    USDC_COIN_TYPE: process.env.USDC_COIN_TYPE,
    SOCKET_URL: process.env.SOCKET_URL,
    APTOS_API_KEY: process.env.APTOS_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    X_URL: process.env.X_URL,
    TELEGRAM_URL: process.env.TELEGRAM_URL,
    STUDIO_URL: process.env.STUDIO_URL,
    DOCUMENTS_URL: process.env.DOCUMENTS_URL,
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
