"use client";

import { formatMMMMDoYYYY } from "@components/helper";
import { Avartars, AverageStar, Text } from "@components/shared";
import CircleIcon from "@icons/common/CircleIcon";
import DislikeIcon from "@icons/common/DislikeIcon";
import LikeIcon from "@icons/common/LikeIcon";
import { Stack } from "@mui/material";
import { RateProps } from "@store/game/type";
import { palette } from "public/material";
import React, { memo, useState } from "react";

interface CardReviewProps {
  data: RateProps;
}

const CardReview = ({ data }: CardReviewProps) => {
  const [title, setTitle] = useState<string>("");

  const handleClick = (value: string) => {
    if (title === value) return setTitle("");
    return setTitle(value);
  };

  return (
    <Stack
      sx={{
        background: palette.backgroundReview,
        padding: "24px",
        borderRadius: "5px",
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

      <Stack gap={2}>
        <Text color="white" fontSize={"14px"} fontWeight={400}>
          {data.review}
        </Text>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Text color={palette.colorGray} fontSize={"14px"}>
            Published on {formatMMMMDoYYYY(new Date().toISOString())}
          </Text>
          <CircleIcon
            sx={{
              fontSize: 3,
              color: palette.colorGray,
            }}
          />
          <Text color={palette.colorGray} fontSize={"14px"}>
            Rated 3 games
          </Text>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
          {GroupButton.map(({ Icon, type }) => {
            return (
              <Stack
                key={type}
                p={2}
                sx={{
                  background:
                    title === type
                      ? type === "like"
                        ? palette.colorBorderTag
                        : palette.colorBgErrors
                      : palette.colorItemGame?.bgBtnLike,
                  transition: "all 0.3s ease-in-out",
                  color:
                    title === type
                      ? type === "like"
                        ? palette.greenColor
                        : palette.colorErrors
                      : palette.colorItemGame?.bgBtnLikeHover,
                  borderRadius: "5px",
                  "&:hover": {
                    color: "black",
                    background:
                      title === type
                        ? type === "like"
                          ? palette.greenColor
                          : palette.colorErrors
                        : palette.colorItemGame?.bgBtnLikeHover,
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleClick(type)}
              >
                <Icon
                  sx={{
                    fontSize: 14,
                  }}
                />
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(CardReview);

const GroupButton = [
  {
    type: "like",
    Icon: LikeIcon,
  },
  {
    type: "dislike",
    Icon: DislikeIcon,
  },
];
