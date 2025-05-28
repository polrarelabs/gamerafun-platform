import Latest from "@components/Latest";
import { Banner, Genres } from "@components/screens/Home";
import Subscribe from "@components/Subscribe";
import { MIN_HEIGHT_SCREEN } from "@constant";
import { GAME_PATH, HOME_PATH, NEWS_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { generateMetadata } from "@utils/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata("Home", HOME_PATH);

export default function Home() {
  return (
    <Stack
      flex={1}
      minHeight={MIN_HEIGHT_SCREEN}
      alignItems="center"
      spacing={4}
    >
      <Banner />
      <Latest
        title="Play Now"
        path={GAME_PATH}
        type="game"
        isHome={true}
        widthGame={200}
      />
      <Latest title="Latest News" path={NEWS_PATH} type="new" />

      <Genres />

      <Subscribe />
    </Stack>
  );
}
