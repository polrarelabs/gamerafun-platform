/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Text } from "@components/shared";
import CloseIcon from "@icons/common/CloseIcon";
import { Stack } from "@mui/material";
import { palette } from "public/material";
import React, { memo } from "react";

interface BoxSelectedProps {
  name: string;
  value: any | null;
  onClose: any;
}

const BoxSelected = ({ name, value, onClose }: BoxSelectedProps) => {
  const getArr = (arr: string[]) => {
    let arrNew: string = "";

    for (let i = 0; i < arr.length; i++) {
      if (i === arr.length - 1) {
        arrNew = arrNew + arr[i];
      } else arrNew = arrNew + arr[i] + "," + " ";
    }

    return arrNew;
  };

  return (
    <Stack
      direction={"row"}
      gap={1}
      alignItems={"center"}
      border={`1px solid ${palette.bgMenuHover}`}
      p={"4px 8px"}
      borderRadius={"4px"}
    >
      <Text
        textTransform={"uppercase"}
        color={palette.colorGray}
        fontSize={"12px"}
        fontWeight={600}
      >
        {name}
      </Text>
      <Text
        color={palette.greenColor}
        fontSize={"12px"}
        fontWeight={600}
        textTransform={"uppercase"}
        sx={{
          backgroundColor: palette.greenColorButton,
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        {Array.isArray(value)
          ? getArr(value)
          : name.toLowerCase() === "max rating" ||
              name.toLowerCase() === "min rating"
            ? `above ${value}`
            : value}
      </Text>
      <Stack
        fontSize={"8px"}
        borderRadius={"1000px"}
        bgcolor={palette.colorGray}
        color={"black"}
        p={"3px"}
        sx={{
          "&:hover": {
            backgroundColor: palette.colorGame?.bgColor2,
            cursor: "pointer",
          },
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </Stack>
    </Stack>
  );
};

export default memo(BoxSelected);
