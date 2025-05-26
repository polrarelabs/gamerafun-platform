"use client";

import { LayoutGame } from "@components/screens/Games";
import { FormCreateGame } from "@components/screens/Games/components";
import { Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
// import { SCREEN_PX } from '@constant'
import { SCREEN_PX } from "@constant";
import { AddedDateSort, SortBy } from "@constant/enum";
import { HOME_PATH } from "@constant/paths";
import { Stack, useTheme } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { memo, useEffect } from "react";

const GameHome = () => {
  const theme = useTheme();

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
    <Stack px={SCREEN_PX} py={4} direction={"column"} gap={4}>
      <Stack direction={"column"} gap={2}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Breadcumbs breadcumbs={breadcrumbs} />
          <FormCreateGame />
        </Stack>

        <Stack direction={"column"}>
          <Text
            color="white"
            fontWeight={700}
            fontSize={"74px"}
            textTransform={"uppercase"}
          >
            game
          </Text>
          <Text color={palette.textWhite} fontWeight={500} fontSize={"20px"}>
            TITLE GAME
          </Text>
        </Stack>
      </Stack>
      <LayoutGame />
    </Stack>
  );
};

export default memo(GameHome);
