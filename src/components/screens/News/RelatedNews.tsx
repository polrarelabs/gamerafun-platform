"use client";
import { Text } from "@components/shared";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { palette } from "public/material";
import React, { memo } from "react";

const RelatedNews = () => {
  const { blogId, blog } = useBlog();

  const { dataListGame: game, fetchGetGame } = useGame();

  return (
    <Stack direction={"column"} gap={2}>
      <Stack direction={"row"} gap={2} alignItems={"start"}>
        <Text color={"white"} fontWeight={700} fontSize={"24px"}>
          Related Games
        </Text>
        <Text fontSize={"14px"} fontWeight={500} color={palette.greenColorText}>
          View All
        </Text>
      </Stack>
    </Stack>
  );
};

export default memo(RelatedNews);
