"use client";

import { SCREEN_PX } from "@constant";
import { AddedDateSort, SortByBlog, SortByGame, Tag } from "@constant/enum";
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
    setSortByBlog,
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
    setSortByBlog(SortByBlog.Newest);
    sortGame(SortByGame.Newest);
  }, []);

  return (
    <Stack px={SCREEN_PX} gap={6}>
      {/* <LayoutNew /> */}
      <LayoutLastNews />
      <LastNewSlider
        title={"Latest Sponsored News"}
        tags={Tag.SPONSORED}
        widthGame={320}
        fetch={getBlogSponsored}
        data={blogSponsored}
      />
    </Stack>
  );
};

export default memo(Layout);
