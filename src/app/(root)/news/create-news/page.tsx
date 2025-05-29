import { CreateBlog } from "@components/screens/News";
import React, { memo } from "react";

const CreateNewPage = () => {
  return <CreateBlog type="create" />;
};

export default memo(CreateNewPage);
