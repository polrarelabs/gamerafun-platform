import Latest from "@components/Latest";
import { Banner, Genres } from "@components/screens/Home";
import { GAME_PATH, HOME_PATH, NEWS_PATH, QUESTS_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { generateMetadata } from "@utils/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata("Home", HOME_PATH);

export default function Home() {
  return (
    <Stack height={"auto"} alignItems="center" gap={4}>
      <Banner />
      <Latest
        title="Latest Quests"
        type="quest"
        widthGame={414}
        path={QUESTS_PATH}
      />
      <Latest
        title="Play Now"
        path={GAME_PATH}
        type="game"
        isHome={true}
        widthGame={250}
        isStar={false}
      />
      <Latest title="Latest News" path={NEWS_PATH} type="new" />
      <Genres />
    </Stack>
  );
}
