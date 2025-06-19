"use client";

import { SCREEN_PX } from "@constant";
import { Stack } from "@mui/material";
import { memo } from "react";
import { GameContainer } from "../game-container";
import { Popular } from "../game-popular";

const LayoutGame = () => {
  return (
    <Stack px={SCREEN_PX} direction={"column"} gap={8}>
      <Popular />
      <GameContainer />
    </Stack>
  );
};

export default memo(LayoutGame);
