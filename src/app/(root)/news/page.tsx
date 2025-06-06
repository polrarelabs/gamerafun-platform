import Layout from "@components/screens/News/Layout";
import { Stack } from "@mui/material";
import { memo } from "react";

import { generateMetadata } from "@utils/seo";
import { Metadata } from "next";
import { NewBreadcumb } from "@components/screens/News";
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
