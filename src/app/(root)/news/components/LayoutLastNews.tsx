import { Stack } from "@mui/material";
import React, { memo } from "react";
import LastNewsLists from "./LastNewsLists";
import LastNewsOptions from "./LastNewsOptions";

const LayoutLastNews = () => {
  return (
    <Stack direction={"row"} gap={4}>
      <LastNewsLists />
      <LastNewsOptions />
    </Stack>
  );
};

export default memo(LayoutLastNews);
