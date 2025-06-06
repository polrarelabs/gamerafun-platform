"use client";

import { RenderBlog } from "@components/ReadBlog";
import { useGame } from "@store/game";
import { memo } from "react";
const Overview = () => {
  const { gameById } = useGame();

  return <RenderBlog content={gameById.description} />;
};

export default memo(Overview);
