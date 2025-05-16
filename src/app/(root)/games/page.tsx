"use client";

import Link from "@components/Link";
import { Text } from "@components/shared";
// import { SCREEN_PX } from '@constant'
import { SCREEN_PX } from "@constant";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Stack } from "@mui/material";
import { memo } from "react";
import FormAddGame from "./components/FormCreateGame";
import LayoutGame from "./components/LayoutGame";

const GameHome = () => {
  return (
    <Stack px={SCREEN_PX} py={4} direction={"column"} gap={4}>
      <Stack direction={"column"} gap={2}>
        {/* <Breadcrumbs
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
        </Breadcrumbs> */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
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
          <FormAddGame />
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
          <Text color="#F9FAFB" fontWeight={500} fontSize={"20px"}>
            TITLE GAME
          </Text>
        </Stack>
      </Stack>
      <LayoutGame />
    </Stack>
  );
};

export default memo(GameHome);
