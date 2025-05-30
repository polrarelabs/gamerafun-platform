"use client";

import React, { memo } from "react";
import Tooltip from "./Tooltip";
import { palette } from "public/material";
import { Stack } from "@mui/material";
import Text from "./Text";
import { BsFillHexagonFill } from "react-icons/bs";
import { thumbColor } from "./helper";

interface AverageStarProps {
  size: number;
  value: number;
  isBg?: boolean;
  fontSize?: number;
  color?: boolean;
  onSider?: boolean;
  onReview?: boolean;
}

const AverageStar = ({
  size,
  value,
  isBg = true,
  fontSize = 16,
  color = false,
  onSider = false,
  onReview = false,
}: AverageStarProps) => {
  return (
    <Stack position={"relative"}>
      <Tooltip
        title={`This game have a rating of ${value}/10`}
        placement="top"
        sx={{
          fontSize: "14px",
          fontWeight: 700,
          color: palette.colorGray,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"relative"}
        >
          <Text
            color={
              color
                ? thumbColor(value)
                : onSider
                  ? value === 0
                    ? thumbColor(value)
                    : "black"
                  : "black"
            }
            fontSize={`${fontSize}px`}
            fontWeight={700}
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              translate: "-50% -50%",
              zIndex: 3,
            }}
          >
            {value === 0 ? "-" : value}
          </Text>
          {onReview ? (
            <BsFillHexagonFill
              size={size}
              style={{
                color:
                  value === 0
                    ? palette.colorGame?.color
                    : thumbColor(value, 0.6),
                zIndex: 1,
              }}
            />
          ) : (
            <BsFillHexagonFill
              size={size}
              style={{
                color:
                  value === 0
                    ? palette.colorGame?.color
                    : thumbColor(value, 0.6),
                position: "absolute",
                left: "50%",
                top: "50%",
                translate: "-50% -50%",
                zIndex: 1,
              }}
            />
          )}

          {isBg && (
            <BsFillHexagonFill
              size={size - 4}
              style={{
                color:
                  value === 0 ? palette.colorGame?.color : thumbColor(value),
                zIndex: 2,
              }}
            />
          )}
        </Stack>
      </Tooltip>
    </Stack>
  );
};

export default memo(AverageStar);
