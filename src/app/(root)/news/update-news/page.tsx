import { CreateBlog } from "@components/screens/News";
import React, { memo } from "react";
import { generateMetadata } from "@utils/seo";
import { Metadata } from "next";
import { UPDATE_NEWS_PATH } from "@constant/paths";

export const metadata: Metadata = generateMetadata(
  "Update News",
  UPDATE_NEWS_PATH,
);

const UpdateNewsPage = () => {
  return <CreateBlog type="update" />;
};

export default memo(UpdateNewsPage);
