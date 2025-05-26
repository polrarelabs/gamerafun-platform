"use client";

import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect } from "react";
import LayoutLastNews from "./LastNews";
import { useBlog } from "@store/new";
import { useGame } from "@store/game";
import { AddedDateSort, SortBy } from "@constant/enum";
import { Button } from "@components/shared";
import { Stack } from "@mui/material";
import { CREATE_NEWS_PATH, UPDATE_NEWS_PATH } from "@constant/paths";

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
  const { setTags, setCheckDate, setSortBy, setSearch } = useBlog();

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
    <>
      {/* <LayoutNew /> */}
      <Stack width={"100%"} direction={"row"} justifyContent={"end"} gap={2}>
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
    </>
  );
};

export default memo(Layout);
