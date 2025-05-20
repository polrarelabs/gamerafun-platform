/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Stack } from "@mui/material";
import React, { memo, useEffect } from "react";
import { useGameCount } from "@store/game";
import { BodyBrowserGame, PopularGenres } from "./components";

const LayoutGame = () => {
  const { fetchGameCount } = useGameCount();
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
