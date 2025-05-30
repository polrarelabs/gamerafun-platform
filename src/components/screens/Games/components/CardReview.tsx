"use client";

import { Avartars, AverageStar, Text } from "@components/shared";
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
      >
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Avartars
            sx={{
              background: palette.colorIconHover,
            }}
          />
          <Text color="white" fontSize={"18px"} fontWeight={600}>
            display name
          </Text>
        </Stack>
        <Stack position={"relative"}>
          <AverageStar size={52} value={data.score} />
        </Stack>
      </Stack>

      <Stack>
        <Text color="white" fontSize={"14px"} fontWeight={400}>
          {data.review}
        </Text>
      </Stack>
    </Stack>
  );
};

export default memo(CardReview);
