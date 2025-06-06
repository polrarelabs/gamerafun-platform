"use client";

import ListGenres from "@components/ListGenres";
import { SCREEN_PX } from "@constant";
import { AddedDateSort, SortByBlog, SortByGame } from "@constant/enum";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { memo, useEffect } from "react";

const LayoutGenres = () => {
  const {
    SetGenres,
    getGameCount,
    setMinRating,
    setMaxRating,
    SetPlatforms,
    setSearch: searchGame,
    setSortBy: sortGame,
  } = useGame();

  const { setTags, setCheckDate, setSortByBlog, setSearch } = useBlog();

  useEffect(() => {
    getGameCount();
    setCheckDate(AddedDateSort.AllTime);
    SetPlatforms([]);
    setMaxRating(0);
    setMinRating(0);
    SetGenres([]);
    setTags([]);
    setSearch("");
    searchGame("");
    setSortByBlog(SortByBlog.Newest);
    sortGame(SortByGame.Newest);
  }, []);

  return (
    <Stack px={SCREEN_PX}>
      <ListGenres xs={2} sm={3} md={5} />
    </Stack>
  );
};

export default memo(LayoutGenres);
