"use client";

import { SCREEN_PX } from "@constant";
import { Breadcrumbs, Stack } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@components/Link";
import { Text } from "@components/shared";
import LayoutGenresDetail from "./components/LayoutGenresDetail";
import { useGameReducers } from "@store/game";

const GenresDetail = () => {
  const { genres } = useGameReducers();

  console.log("genres", genres);

  return (
    <Stack px={SCREEN_PX} py={4} direction={"column"} gap={4}>
      <Stack direction={"column"} gap={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{
            color: "#FFFFFFA5",
          }}
        >
          <Link underline="hover" color="inherit" href="/">
            <Text sx={{ color: "text.primary" }}>HOME</Text>
          </Link>
          <Link underline="hover" color="inherit" href="/">
            <Text sx={{ color: "text.primary" }}>GENRES</Text>
          </Link>
          <Text
            sx={{
              color: "text.primary",
              textTransform: "uppercase",
            }}
          >
            {genres[0]}
          </Text>
        </Breadcrumbs>

        <Stack direction={"column"}>
          <Text
            color="white"
            fontWeight={700}
            fontSize={"74px"}
            textTransform={"uppercase"}
          >
            {genres[0]}
          </Text>
          <Text color="#9CA3AF" fontWeight={500} fontSize={"20px"} mb={4}>
            title of {genres[0]}
          </Text>
        </Stack>
        <LayoutGenresDetail />
      </Stack>
    </Stack>
  );
};

export default GenresDetail;
