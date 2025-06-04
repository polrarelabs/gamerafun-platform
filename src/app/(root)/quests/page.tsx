"use client";

import { BannerJoin } from "@components/screens/News";
import { LayoutQuest } from "@components/screens/Quests";
import { Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX } from "@constant";
import { HOME_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { palette } from "public/material";
import React, { memo } from "react";

const RequestsPage = () => {
  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: HOME_PATH,
      title: "home",
    },
    {
      title: "quests",
    },
  ];

  return (
    <>
      <Stack direction={"column"} gap={2} px={SCREEN_PX} mb={6}>
        <Breadcumbs breadcumbs={breadcrumbs} />
        <Stack direction={"column"} gap={1}>
          <Text
            color="white"
            fontWeight={700}
            fontSize={"74px"}
            textTransform={"uppercase"}
          >
            quests
          </Text>
          <Text
            color={palette.colorGray}
            fontWeight={500}
            fontSize={"20px"}
            width={{ xs: "100%", md: "60%", lg: "35%" }}
          >
            Explore GAMERA Quests by completing in-game challenges and engaging
            with top games to earn XP, level up, and unlock exclusive rewards.
          </Text>
        </Stack>
        <LayoutQuest />
      </Stack>
      <BannerJoin />
    </>
  );
};

export default memo(RequestsPage);
