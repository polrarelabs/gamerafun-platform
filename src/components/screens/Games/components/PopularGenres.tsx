"use client";

import { Slider, Text } from "@components/shared";
import PopularIcon from "@icons/web3/PopularIcon";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { palette } from "public/material";
import { memo, useEffect } from "react";
import CardGenres from "./CardGenres";

const PopularGenres = () => {
  const { genreItems, getGenres } = useGame();

  useEffect(() => {
    getGenres({});
  }, []);

  return (
    <Stack direction="column" gap={2} sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" gap={2}>
        <PopularIcon sx={{ color: palette.colorGray }} />
        <Text color="white" fontSize="20px" fontWeight={700}>
          Popular Genres
        </Text>
      </Stack>
      {genreItems && genreItems.length > 6 ? (
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
