import { BannerNew, NewsDetail, Related } from "@components/screens/new-detail";
import { SCREEN_PX } from "@constant";
import { Stack } from "@mui/material";
import { memo } from "react";

const News = () => {
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
