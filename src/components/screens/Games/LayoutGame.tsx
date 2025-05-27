"use client";

import { Stack } from "@mui/material";
import React, { memo, useEffect } from "react";
import { BodyBrowserGame, PopularGenres } from "./components";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { AddedDateSort, SortBy } from "@constant/enum";
import { SCREEN_PX } from "@constant";

const LayoutGame = () => {
  // const {
  //   setMinRating,
  //   setMaxRating,
  //   SetPlatforms,
  //   SetGenres,
  //   fetchGameCount,
  //   setSearch: searchGame,
  //   setSortBy: sortGame,
  // } = useGame();
  // const { setTags, setCheckDate, setSortBy, setSearch } = useBlog();

  // useEffect(() => {
  //   fetchGameCount();
  //   setCheckDate(AddedDateSort.AllTime);
  //   SetPlatforms([]);
  //   setMaxRating(0);
  //   setMinRating(0);
  //   SetGenres([]);
  //   setTags([]);
  //   setSearch("");
  //   searchGame("");
  //   setSortBy(SortBy.Newest);
  //   sortGame(SortBy.Newest);
  // }, []);

  return (
    <Stack px={SCREEN_PX} direction={"column"} gap={8}>
      <PopularGenres />
      <BodyBrowserGame />
    </Stack>
  );
};

export default memo(LayoutGame);
