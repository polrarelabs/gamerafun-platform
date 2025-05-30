"use client";

import ListGenres from "@components/ListGenres";
import { Text } from "@components/shared";
import { SCREEN_PX } from "@constant";
import { Stack } from "@mui/material";
import { palette } from "public/material";
import React, { memo } from "react";

const Genres = () => {
  return (
    <Stack px={SCREEN_PX} my={8} direction={"column"} gap={4} width={"100%"}>
      <Stack direction={"column"} alignItems={"center"}>
        <Text
          textAlign={"center"}
          fontSize={"31.2px"}
          color={palette.textWhite}
          fontWeight={700}
        >
          Discover More Game Genres
        </Text>
        <Text
          textAlign={"center"}
          fontSize={"18px"}
          color={palette.colorGray}
          fontWeight={400}
        >
          Explore a curated library of web3 games for each gamer.
        </Text>
      </Stack>
      <ListGenres xs={2} sm={3} md={5} lg={6} />
    </Stack>
  );
};

export default memo(Genres);
