"use client";

import { GenresDetail } from "@components/screens/Genres/components";
import { Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX } from "@constant";
import { AddedDateSort } from "@constant/enum";
import { GENRES_PATH, HOME_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { palette } from "public/material";
import { memo, useEffect } from "react";

const GenresDetails = () => {
  const { setMinRating, setMaxRating, SetPlatforms, genresTitle } = useGame();
  const { setTags, setCheckDate } = useBlog();

  useEffect(() => {
    setCheckDate(AddedDateSort.AllTime);
    SetPlatforms([]);
    setMaxRating(0);
    setMinRating(0);
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
          <Text
            color={palette.colorGray}
            fontWeight={500}
            fontSize={"20px"}
            mb={4}
          >
            title of {genresTitle}
          </Text>
        </Stack>
        <GenresDetail />
      </Stack>
    </Stack>
  );
};

export default memo(GenresDetails);
