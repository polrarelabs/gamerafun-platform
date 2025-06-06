/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Slider, Text } from "@components/shared";
import PopularIcon from "@icons/web3/PopularIcon";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { palette } from "public/material";
import { memo, useEffect } from "react";
import CardGenres from "./CardGenres";
import useBreakpoint from "@hooks/useBreakpoint";

const PopularGenres = () => {
  const { genreItems, getGenres } = useGame();

  const { isMdSmaller, isXsSmaller, isSmSmaller, isLgSmaller, isXlSmaller } =
    useBreakpoint();

  useEffect(() => {
    getGenres({});
  }, []);

  const GetSize = () => {
    if (isXlSmaller) return 6;
    if (isLgSmaller) return 5;
    if (isMdSmaller) return 4;
    if (isSmSmaller) return 3;
    if (isXsSmaller) return 2;
    return 8;
  };

  return (
    <Stack direction="column" gap={2} sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" gap={2}>
        <PopularIcon sx={{ color: palette.colorGray }} />
        <Text color="white" fontSize="20px" fontWeight={700}>
          Popular Genres
        </Text>
      </Stack>
      {genreItems && genreItems.length > GetSize() ? (
        <Slider itemWidth={208} step={16}>
          {genreItems.map((item, index) => {
            return <CardGenres key={index} data={item} index={index} />;
          })}
        </Slider>
      ) : (
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          {genreItems &&
            genreItems.map((item, index) => {
              return <CardGenres key={index} data={item} index={index} />;
            })}
        </Stack>
      )}
    </Stack>
  );
};

export default memo(PopularGenres);
