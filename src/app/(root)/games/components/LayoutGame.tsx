/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Stack } from "@mui/material";
import React, { memo, useEffect } from "react";
import PopularGenres from "./PopularGenres";
import BodyBrowserGame from "./BodyBrowserGame";
import { useGameCount } from "@store/game";

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
