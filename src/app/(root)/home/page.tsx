// 'use client'

import { Metadata } from "next";
import { AGENTS_PATH, HOME_PATH } from "@constant/paths";
import { generateMetadata } from "@utils/seo";
import { Stack } from "@mui/material";
import { Overview, Filters, AgentList } from "@components/screens/Agents";
import { MIN_HEIGHT_SCREEN, SCREEN_PX } from "@constant";
import { Banner } from "@components/screens/BannerSlider.tsx";
import { setToken } from "@api/helpers";
import { useRecommendTokens } from "@store/token";
import { useGame } from "@store/game";
import { useAppSelector } from "@store/hooks";
import { useEffect } from "react";

export const metadata: Metadata = generateMetadata("Home", HOME_PATH);

export default function Home() {
  // const { items,
  //   status,
  //   error,
  //   isFetching,
  //   isSucceeded,
  //   onGetRecommendTokens } = useRecommendTokens()

  // console.log('useRecommendTokens', items,
  //   status,
  //   error,
  //   isFetching,
  //   isSucceeded,
  //   onGetRecommendTokens);

  return (
    <Stack
      flex={1}
      minHeight={MIN_HEIGHT_SCREEN}
      alignItems="center"
      spacing={4}
    >
      <Banner />

      {/* <Overview /> */}

      {/* <ArbitrumCatalogue /> */}
      {/* <Stack width="100%" spacing={3} pb={14} px={SCREEN_PX}>
        <Filters />
        <AgentList />
      </Stack> */}
    </Stack>
  );
}
