"use client";

import { SCREEN_PX } from "@constant";
import { AddedDateSort, SortBy, Tag } from "@constant/enum";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect } from "react";
import LayoutLastNews from "./LastNews";
import LastNewSlider from "./LastNewSlider";

const Layout = () => {
  // const router = useRouter();
  // const pathName = usePathname();

  // const handleDetail = (id: string) => {
  //   const url = pathName + "/" + id;
  //   router.push(url);
  // };

  const {
    setMinRating,
    setMaxRating,
    SetPlatforms,
    SetGenres,
    setSearch: searchGame,
    setSortBy: sortGame,
  } = useGame();
  const {
    setTags,
    setCheckDate,
    setSortBy,
    setSearch,
    getBlogSponsored,
    blogSponsored,
  } = useBlog();

  useEffect(() => {
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

  return (
    <Stack px={SCREEN_PX} gap={6}>
      {/* <LayoutNew /> */}
      <LayoutLastNews />
      <LastNewSlider
        title={"Latest Sponsored News"}
        tags={Tag.SPONSORED}
        widthGame={340}
        fetch={getBlogSponsored}
        data={blogSponsored}
      />
    </Stack>
  );
};

export default memo(Layout);
