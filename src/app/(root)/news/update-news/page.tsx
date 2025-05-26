import { CreateBlog } from "@components/screens/News";
import React, { memo } from "react";

const UpdateNewsPage = () => {
  return <CreateBlog type="update" />;
};

export default memo(UpdateNewsPage);
