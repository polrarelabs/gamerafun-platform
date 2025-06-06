import { CreateGenres } from "@components/screens/Genres";
import React, { memo } from "react";
import { generateMetadata } from "@utils/seo";
import { Metadata } from "next";
import { CREATE_GENRES_PATH } from "@constant/paths";

export const metadata: Metadata = generateMetadata(
  "Create Genres",
  CREATE_GENRES_PATH,
);
const CreateGenresPage = () => {
  return <CreateGenres />;
};

export default memo(CreateGenresPage);
