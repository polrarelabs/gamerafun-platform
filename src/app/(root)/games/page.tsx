import { GameBreadcumb, LayoutGame } from "@components/screens/Games";
import { GAME_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { generateMetadata } from "@utils/seo";
import { memo } from "react";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata("Game", GAME_PATH);

const GameHome = () => {
  return (
    <Stack direction={"column"} gap={4}>
      <GameBreadcumb />
      <LayoutGame />
    </Stack>
  );
};

export default memo(GameHome);
