"use client";

import ListGenres from "@components/ListGenres";
import { AddedDateSort, SortBy } from "@constant/enum";
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

  const { setTags, setCheckDate, setSortBy, setSearch } = useBlog();

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
    setSortBy(SortBy.Newest);
    sortGame(SortBy.Newest);
  }, []);

  return <ListGenres xs={2} sm={3} md={5} />;
};

export default memo(LayoutGenres);
