"use client";

import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect } from "react";
import LayoutLastNews from "./LastNews";
import { useBlog } from "@store/new";
import { useGame } from "@store/game";
import { AddedDateSort, SortBy, Tag } from "@constant/enum";
import { Button } from "@components/shared";
import { Stack } from "@mui/material";
import { CREATE_NEWS_PATH, NEWS_PATH, UPDATE_NEWS_PATH } from "@constant/paths";
import { SCREEN_PX } from "@constant";
import LastNewSlider from "./LastNewSlider";
import Latest from "@components/Latest";

const Layout = () => {
  const router = useRouter();
  const pathName = usePathname();

  const handleDetail = (id: string) => {
    const url = pathName + "/" + id;
    router.push(url);
  };

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
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"end"}
        gap={2}
        mb={2}
      >
        <Button
          variant="outlined"
          onClick={() => router.push(CREATE_NEWS_PATH)}
        >
          Create Blog
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push(UPDATE_NEWS_PATH)}
        >
          Update Blog
        </Button>
      </Stack>
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
