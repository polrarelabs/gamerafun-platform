import { generateMetadata } from "@utils/seo";
import { memo } from "react";
import { Metadata } from "next";
import { UPDATE_GAME_PATH } from "@constant/paths";
import { GameDetail } from "@components/screens/game-detail";

export const metadata: Metadata = generateMetadata(
  "Update Game",
  UPDATE_GAME_PATH,
);

const LayoutGameDetail = () => {
  return <GameDetail />;
};

export default memo(LayoutGameDetail);
