"use client";

import { Stack } from "@mui/material";
import { memo } from "react";
import OptionGame from "./OptionGame";
import BrowserGame from "./BrowserGame";

const LayoutBrowserGame = () => {
  return (
    <Stack direction="row" gap={4}>
      <BrowserGame />
      <OptionGame />
    </Stack>
  );
};

export default memo(LayoutBrowserGame);
