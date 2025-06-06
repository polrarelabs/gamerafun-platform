import { CreateGame } from "@components/screens/Games";
import { memo } from "react";
import { Metadata } from "next";
import { UPDATE_GAME_PATH } from "@constant/paths";
import { generateMetadata } from "@utils/seo";

export const metadata: Metadata = generateMetadata(
  "Update Game",
  UPDATE_GAME_PATH,
);

const UpdateGames = () => {
  return <CreateGame name="update" />;
};

export default memo(UpdateGames);
