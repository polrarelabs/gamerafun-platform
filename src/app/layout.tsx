import type { Metadata } from "next";
import { space_grotesk } from "public/fonts";
import HashProvider from "@/contexts/HashProvider";
import InitializeProvider from "@/contexts/InitializeProvider";
import ThemeProvider from "@/contexts/ThemeProvider";
import { DOMAIN } from "@constant";
import {
  GENERAL_CONFIG,
  OPEN_GRAPH_CONFIG,
  TWITTER_CONFIG,
  KEYWORDS_CONFIG,
} from "@utils/seo";
import "public/styles/index.css";
import Snackbar from "@components/Snackbar";
import SocketProvider from "@contexts/SocketProvider";
import WalletProvider from "@contexts/WalletProvider";
import FetchData from "@components/FetchData";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  alternates: {
    canonical: "/",
  },
  ...GENERAL_CONFIG,
  openGraph: OPEN_GRAPH_CONFIG,
  twitter: TWITTER_CONFIG,
  keywords: KEYWORDS_CONFIG,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${space_grotesk.variable}`} id="body">
        <ThemeProvider>
          <SocketProvider>
            <InitializeProvider>
              <HashProvider>
                <WalletProvider>
                  {children}
                  <Snackbar />
                  <FetchData />
                  <Script
                    src="https://archive.cetus.zone/assets/terminal/main.js"
                    strategy="beforeInteractive"
                  />
                </WalletProvider>
              </HashProvider>
            </InitializeProvider>
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
