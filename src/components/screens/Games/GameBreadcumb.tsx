/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { BackgroundImage, Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX } from "@constant";
import { AddedDateSort, SortByBlog, SortByGame } from "@constant/enum";
import { HOME_PATH } from "@constant/paths";
import { Stack, useTheme } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import image from "public/images/img-login.webp";
import { memo, useEffect } from "react";

const GameBreadcumb = () => {
  const theme = useTheme();

  const {
    setMinRating,
    setMaxRating,
    SetPlatforms,
    SetGenres,
    setSearch: searchGame,
    setSortBy: sortGame,
  } = useGame();
  const { setTags, setCheckDate, setSortByBlog, setSearch } = useBlog();

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

  const { palette } = theme;
  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: HOME_PATH,
      title: "HOME",
    },
    {
      title: "GAMES",
    },
  ];

  return (
    <Stack
      px={SCREEN_PX}
      direction={"column"}
      gap={2}
      position={"relative"}
      py={4}
    >
      <BackgroundImage url={image} />
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        zIndex={3}
      >
        <Breadcumbs breadcumbs={breadcrumbs} />
      </Stack>

      <Stack direction={"column"} zIndex={3}>
        <Text
          color="white"
          fontWeight={700}
          fontSize={"74px"}
          textTransform={"uppercase"}
        >
          game
        </Text>
        <Text
          color={palette.colorGray}
          fontWeight={500}
          fontSize={"20px"}
          width={{ xs: "100%", md: "60%", lg: "35%" }}
        >
          GAMERA showcases top games across different platforms including Steam,
          web3 and beyond!
        </Text>
      </Stack>
    </Stack>
  );
};

export default memo(GameBreadcumb);
