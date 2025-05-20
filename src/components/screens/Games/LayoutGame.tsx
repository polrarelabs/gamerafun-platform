/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Stack } from "@mui/material";
import React, { memo, useEffect } from "react";
import { BodyBrowserGame, PopularGenres } from "./components";
import { useGame } from "@store/game";

const LayoutGame = () => {
  const { fetchGameCount } = useGame();
  useEffect(() => {
    fetchGameCount();
  }, []);

  return (
    <Stack direction={"column"} gap={8}>
      <PopularGenres />
      <BodyBrowserGame />
    </Stack>
  );
};

export default memo(LayoutGame);
