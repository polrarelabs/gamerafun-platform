"use client";

import Link from "@components/Link";
import { Text } from "@components/shared";
// import { SCREEN_PX } from '@constant'
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Stack } from "@mui/material";
import LayoutGame from "./components/LayoutGame";
import FormAddGame from "./components/FormCreateGame";
import { setToken } from "@api/helpers";

const GameHome = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNGFkNjY4Yy0yMTliLTRiNDAtYjY0NC0xZjJiM2ZmNTg1YmUiLCJpYXQiOjE3NDY1MDUyNjQsImV4cCI6MTc0NzExMDA2NH0.Y3LogNWRXBHqmSf2V8mVKQorsbNCyEtRIcdmFA1D4aU";
  setToken(token);
  return (
    <Stack px={8} py={4} direction={"column"} gap={4}>
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

export default GameHome;
