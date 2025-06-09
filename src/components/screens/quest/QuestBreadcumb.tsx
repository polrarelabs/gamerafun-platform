"use client";

import { BackgroundImage, Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX } from "@constant";
import { HOME_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import image from "public/images/img-login.webp";
import { palette } from "public/material";
import { memo } from "react";

const QuestBreadcumb = () => {
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
    <Stack px={SCREEN_PX} mb={6} position={"relative"}>
      <BackgroundImage url={image} />
      <Stack gap={2} zIndex={3}>
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
      </Stack>
    </Stack>
  );
};

export default memo(QuestBreadcumb);
