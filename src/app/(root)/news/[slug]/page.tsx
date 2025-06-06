"use client";
import {
  BannerJoin,
  BannerNew,
  NewsDetail,
  Related,
} from "@components/screens/News";
import { SCREEN_PX } from "@constant";
import { Stack } from "@mui/material";
import { useBlog } from "@store/new";
import { memo, useEffect } from "react";
import { useParams } from "next/navigation";

const News = () => {
  const { getBlogId } = useBlog();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) getBlogId(slug as string);
  }, [slug]);


  return (
    <Stack gap={2}>
      <BannerNew />
      <Stack px={SCREEN_PX} direction={"column"} gap={2}>
        <NewsDetail />
      </Stack>
      <Stack
        width={"100%"}
        height={"auto"}
        bgcolor={"black"}
        px={SCREEN_PX}
        alignItems={"center"}
        direction={"row"}
        py={4}
      >
        <Related relateBy="news" title="Related News" />
      </Stack>
    </Stack>
  );
};

export default memo(News);

export const runtime = 'nodejs';
