import { memo } from "react";
import { Metadata } from "next";
import { CREATE_GAME_PATH } from "@constant/paths";
import { generateMetadata } from "@utils/seo";
import { CreateGame } from "@components/screens/game-creation";

export const metadata: Metadata = generateMetadata(
  "Create Game",
  CREATE_GAME_PATH,
);
const CreateGames = () => {
  return <CreateGame />;
};

export default memo(CreateGames);
