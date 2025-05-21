"use client";
import { NewsDetail } from "@components/screens/News";
import { Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX } from "@constant";
import { HOME_PATH, NEWS_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { useBlog } from "@store/new";
import { palette } from "public/material";
import { memo } from "react";

const News = () => {
  const { blogId } = useBlog();
  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: HOME_PATH,
      title: "HOME",
    },
    {
      href: NEWS_PATH,
      title: "NEWS",
    },
    {
      title: blogId.title,
    },
  ];
  return (
    <Stack px={SCREEN_PX} py={4} direction={"column"} gap={4}>
      <Stack direction={"column"} gap={2} maxWidth={"50%"}>
        <Breadcumbs breadcumbs={breadcrumbs} />
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          p={"6px 16px 4px"}
          bgcolor={palette.colorGame?.colorBtnNew}
          sx={{
            clipPath:
              "polygon(calc(0% + 10px) 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            width: "fit-content",
          }}
        >
          <Text
            color={"white"}
            fontWeight={500}
            fontSize={"12px"}
            fontStyle={"italic"}
            textTransform={"uppercase"}
          >
            news
          </Text>
        </Stack>
      </Stack>
      <Text color={"white"} fontWeight={700} fontSize={"44px"}>
        {blogId.title}
      </Text>
      <Text
        color={palette.colorGame?.textColor}
        fontWeight={300}
        fontSize={"21px"}
      >
        {blogId.shortDescription}
      </Text>
      <NewsDetail />
    </Stack>
  );
};

export default memo(News);
