"use client";

import { Stack, useMediaQuery } from "@mui/material";
import React, { memo } from "react";
import LastNewsLists from "./LastNewsLists";
import LastNewsOptions from "./LastNewsOptions";
import { useTheme } from "@mui/material/styles";
const LayoutLastNews = () => {
  const theme = useTheme();
  const isLayoutMD = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Stack direction={"row"} gap={4}>
      <LastNewsLists />
      <LastNewsOptions isLayoutMD={isLayoutMD} />
    </Stack>
  );
};

export default memo(LayoutLastNews);
