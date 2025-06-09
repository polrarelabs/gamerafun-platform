import { Stack } from "@mui/material";
import { memo } from "react";
import { generateMetadata } from "@utils/seo";
import { Metadata } from "next";
import { Layout, NewBreadcumb } from "@components/screens/new";
import { NEWS_PATH } from "@constant/paths";

export const metadata: Metadata = generateMetadata("News", NEWS_PATH);

const News = () => {
  return (
    <Stack direction={"column"} gap={4}>
      <NewBreadcumb />
      <Layout />
    </Stack>
  );
};

export default memo(News);
