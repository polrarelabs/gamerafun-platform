"use client";

import Link from "@components/Link";
import { Text } from "@components/shared";
// import { SCREEN_PX } from '@constant'
import { Breadcrumbs, Stack } from "@mui/material";
import React, { useEffect } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PopularGenres from "./components/PopularGenres";
import BrowserGame from "./components/BrowserGame";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getListGame } from "@store/listGame/action";
import { ListGame } from "@store/listGame";

const GameHome = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getListGame());
  }, [dispatch]);

  const data: ListGame[] = useAppSelector((state) => state.lisgame.data);
  // const loading = useAppSelector(state => state.lisgame.loading)
  // const error = useAppSelector(state => state.lisgame.error)

  return (
    <Stack px={8} py={4} direction={"column"} gap={4}>
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

          <Text sx={{ color: "text.primary" }}>GAMES</Text>
        </Breadcrumbs>

        <Stack direction={"column"}>
          <Text color="white" fontWeight={700} fontSize={"74px"}>
            TITLE GAME
          </Text>
          <Text color="#F9FAFB" fontWeight={500} fontSize={"20px"}>
            TITLE GAME
          </Text>
        </Stack>
      </Stack>

      <PopularGenres />
      <BrowserGame />
    </Stack>
  );
};

export default GameHome;
