"use client";

import { SCREEN_PX } from "@constant";
import { Breadcrumbs, Stack } from "@mui/material";
import React, { memo, useEffect } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@components/Link";
import { Text } from "@components/shared";
import { LayoutGenres } from "@components/screens/Genres";
import { GenresDetail } from "@components/screens/Genres/components";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { GENRES_PATH, HOME_PATH } from "@constant/paths";

const GenresDetails = () => {
  const { setEditorRating, setUserRating, SetPlatforms, genresTitle } =
    useGame();
  const { setTags, setCheckDate } = useBlog();

  useEffect(() => {
    setCheckDate("all");
    SetPlatforms([]);
    setUserRating(0);
    setEditorRating(0);
    setTags([]);
  }, []);

  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: HOME_PATH,
      title: "HOME",
    },
    {
      title: "GENRES",
      href: GENRES_PATH,
    },
    {
      title: genresTitle,
    },
  ];

  return (
    <Stack px={SCREEN_PX} py={4} direction={"column"} gap={4}>
      <Stack direction={"column"} gap={2}>
        <Breadcumbs breadcumbs={breadcrumbs} />

        <Stack direction={"column"}>
          <Text
            color="white"
            fontWeight={700}
            fontSize={"74px"}
            textTransform={"uppercase"}
          >
            {genresTitle}
          </Text>
          <Text color="#9CA3AF" fontWeight={500} fontSize={"20px"} mb={4}>
            title of {genresTitle}
          </Text>
        </Stack>
        <GenresDetail />
      </Stack>
    </Stack>
  );
};

export default memo(GenresDetails);
