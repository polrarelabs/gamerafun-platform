"use client";

import Layout from "@components/screens/News/Layout";
import { BackgroundImage, Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX } from "@constant";
import { HOME_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { palette } from "public/material";
import { memo } from "react";
import image from "public/images/img-login.webp";

const News = () => {
  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: HOME_PATH,
      title: "HOME",
    },
    {
      title: "NEWS",
    },
  ];
  return (
    <Stack direction={"column"} gap={4}>
      <Stack px={SCREEN_PX} direction={"column"} gap={2} position={"relative"}>
        <BackgroundImage url={image} />
        <Stack
          direction={"column"}
          gap={2}
          position={"relative"}
          py={4}
          zIndex={3}
        >
          <Breadcumbs breadcumbs={breadcrumbs} />
          <Stack direction={"column"}>
            <Text color={palette.textWhite} fontWeight={700} fontSize={"31px"}>
              News
            </Text>
            <Text color={palette.colorGray} fontWeight={400} fontSize={"16px"}>
              Stay on top of the latest blockchain gaming news and enjoy
              exclusive interviews and informative web3 gaming opinion pieces.
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <Layout />
    </Stack>
  );
};

export default memo(News);
