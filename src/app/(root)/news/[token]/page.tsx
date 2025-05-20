"use client";
import { Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX } from "@constant";
import { NEWS_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { palette } from "public/material";
import { memo } from "react";

const News = () => {
  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: "/",
      title: "HOME",
    },
    {
      href: NEWS_PATH,
      title: "NEWS",
    },
    {
      title: "id",
    },
  ];
  return (
    <Stack px={SCREEN_PX} py={4} direction={"column"} gap={4}>
      <Stack direction={"column"} gap={2}>
        <Breadcumbs breadcumbs={breadcrumbs} />
        <Stack direction={"column"}>
          <Text color={palette.textWhite} fontWeight={700} fontSize={"31px"}>
            Details
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(News);
