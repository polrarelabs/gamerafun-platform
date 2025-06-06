"use client";

import { SCREEN_PX } from "@constant";
import { Stack } from "@mui/material";
import { memo } from "react";
import { BodyBrowserGame, PopularGenres } from "./components";

const LayoutGame = () => {
  return (
    <Stack px={SCREEN_PX} direction={"column"} gap={8}>
      <PopularGenres />
      <BodyBrowserGame />
    </Stack>
  );
};

export default memo(LayoutGame);
