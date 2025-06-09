import { GenresBreadcumb, LayoutGenres } from "@components/screens/genre";
import { Stack } from "@mui/material";
import { memo } from "react";
import { Metadata } from "next";
import { GENRES_PATH } from "@constant/paths";
import { generateMetadata } from "@utils/seo";

export const metadata: Metadata = generateMetadata("Genres", GENRES_PATH);

const Genres = () => {
  return (
    <Stack py={4} direction={"column"} gap={{ md: 8, xs: 4 }}>
      <GenresBreadcumb />
      <LayoutGenres />
    </Stack>
  );
};

export default memo(Genres);
