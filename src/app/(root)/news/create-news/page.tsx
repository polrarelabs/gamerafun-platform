import { CreateBlog } from "@components/screens/News";
import React, { memo } from "react";
import { generateMetadata } from "@utils/seo";
import { Metadata } from "next";
import { CREATE_NEWS_PATH } from "@constant/paths";

export const metadata: Metadata = generateMetadata(
  "Create News",
  CREATE_NEWS_PATH,
);

const CreateNewPage = () => {
  return <CreateBlog type="create" />;
};

export default memo(CreateNewPage);
