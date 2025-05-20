"use client";

import Link from "@components/Link";
import { LayoutGame } from "@components/screens/Games";
import { FormCreateGame } from "@components/screens/Games/components";
import { Text } from "@components/shared";
// import { SCREEN_PX } from '@constant'
import { SCREEN_PX } from "@constant";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Stack, useTheme } from "@mui/material";
import { memo } from "react";

const GameHome = () => {
  const theme = useTheme();
  const { palette } = theme;

  return (
    <Stack px={SCREEN_PX} py={4} direction={"column"} gap={4}>
      <Stack direction={"column"} gap={2}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
              color: palette.textBreadcrumb,
            }}
          >
            <Link underline="hover" color="inherit" href="/">
              <Text sx={{ color: "text.primary" }}>HOME</Text>
            </Link>

            <Text sx={{ color: "text.primary" }}>GAMES</Text>
          </Breadcrumbs>
          <FormCreateGame />
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
