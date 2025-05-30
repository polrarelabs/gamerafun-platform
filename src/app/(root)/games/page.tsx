/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { LayoutGame } from "@components/screens/Games";
import { FormCreateGame } from "@components/screens/Games/components";
import { Image, Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
// import { SCREEN_PX } from '@constant'
import { SCREEN_PX } from "@constant";
import { AddedDateSort, SortBy } from "@constant/enum";
import { HOME_PATH } from "@constant/paths";
import { Box, Stack, useTheme } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { memo, useEffect } from "react";
import image from "public/images/img-login.png";

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
    <Stack direction={"column"} gap={4}>
      <Stack
        px={SCREEN_PX}
        direction={"column"}
        gap={2}
        position={"relative"}
        py={4}
      >
        <Stack
          position={"absolute"}
          top={0}
          left={0}
          width={"100%"}
          height={"100%"}
          zIndex={1}
        >
          <Image
            // src={(url && url.length > 0) ? url : image}
            src={image}
            alt={`img-`}
            size="100%"
            aspectRatio={3 / 2}
            sizes={`1920px`}
            containerProps={{
              sx: {
                width: `100%`,
                height: "100%",
                overflow: "hidden",
                opacity: 0.2,
                border: "1px",
                borderColor: palette.borderColorLinear,
                "& img": {
                  objectFit: "cover",
                  objectPosition: "center",
                },
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              background: palette.colorGame?.colorBgLineaer1,
              zIndex: 2,
            }}
          />
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          zIndex={3}
        >
          <Breadcumbs breadcumbs={breadcrumbs} />
          <FormCreateGame />
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
