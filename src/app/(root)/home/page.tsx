// 'use client'

import { Banner, LatestNews } from "@components/screens/Home";
import { MIN_HEIGHT_SCREEN } from "@constant";
import { HOME_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { generateMetadata } from "@utils/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata("Home", HOME_PATH);

export default function Home() {
  return (
    <Stack
      flex={1}
      minHeight={MIN_HEIGHT_SCREEN}
      alignItems="center"
      spacing={4}
    >
      <Banner />

      <LatestNews />
    </Stack>
  );
}
