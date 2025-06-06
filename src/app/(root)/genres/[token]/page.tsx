"use client";

import { GenresDetail } from "@components/screens/Genres/components";
import { BackgroundImage, Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX, SCREEN_PY } from "@constant";
import { AddedDateSort } from "@constant/enum";
import { GENRES_PATH, HOME_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { palette } from "public/material";
import { memo, useEffect } from "react";
import img from "public/images/img-local.webp";

const GenresDetails = () => {
  const {
    setMinRating,
    setMaxRating,
    SetPlatforms,
    genresTitle,
    genreItems,
    getGenres,
  } = useGame();
  const { setTags, setCheckDate } = useBlog();

  useEffect(() => {
    getGenres({});
    setCheckDate(AddedDateSort.AllTime);
    SetPlatforms([]);
    setMaxRating(0);
    setMinRating(0);
    setTags([]);
  }, []);

  const getUrl = (value: string) => {
    if (!genreItems) return;

    const arr: string[] = [];
    for (const item of genreItems) {
      arr.push(item.name.toLowerCase());
    }

    const index = arr.indexOf(value.toLowerCase());
    return genreItems[index]?.media ? genreItems[index].media : img;
  };

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
    <Stack py={4} direction={"column"} gap={4}>
      <Stack
        direction={"column"}
        gap={2}
        px={SCREEN_PX}
        position={"relative"}
        py={8}
      >
        <BackgroundImage url={getUrl(genresTitle) ?? img} />
        <Stack zIndex={3}>
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
        </Stack>
      </Stack>
      <GenresDetail />
    </Stack>
  );
};

export default memo(GenresDetails);
