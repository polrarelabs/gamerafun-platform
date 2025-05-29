"use client";

import { Stack } from "@mui/material";
import { RateProps } from "@store/game/type";
import { palette } from "public/material";
import React, { memo } from "react";

interface CardReviewProps {
  data: RateProps;
}

const CardReview = ({ data }: CardReviewProps) => {
  return (
    <Stack
      sx={{
        background: palette.backgroundReview,
        padding: "24px",
        borderRadius: "8px",
      }}
      gap={2}
      direction={"column"}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      ></Stack>
    </Stack>
  );
};

export default memo(CardReview);
