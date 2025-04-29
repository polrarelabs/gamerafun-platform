// 'use client'

import { Metadata } from "next";
import { AGENTS_PATH } from "@constant/paths";
import { generateMetadata } from "@utils/seo";
import { Stack } from "@mui/material";
import { Overview, Filters, AgentList } from "@components/screens/Agents";
import { MIN_HEIGHT_SCREEN, SCREEN_PX } from "@constant";
import { Banner } from "@components/screens/BannerSlider.tsx";
import { setToken } from "@api/helpers";
import { useRecommendTokens } from "@store/token";
import { useGame } from "@store/game";

export const metadata: Metadata = generateMetadata("Agents", AGENTS_PATH);

export default function Home() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNGFkNjY4Yy0yMTliLTRiNDAtYjY0NC0xZjJiM2ZmNTg1YmUiLCJpYXQiOjE3NDU4OTAwNjEsImV4cCI6MTc0NjQ5NDg2MX0.yYmoChm8xsIjh_k8M4Hd2zdQgi-kDJX2-42H2cHrKdg";
  setToken(token);

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

      <Overview />

      {/* <ArbitrumCatalogue /> */}
      <Stack width="100%" spacing={3} pb={14} px={SCREEN_PX}>
        <Filters />
        <AgentList />
      </Stack>
    </Stack>
  );
}
