/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Text } from "@components/shared";
import CloseIcon from "@icons/CloseIcon";
import { Stack } from "@mui/material";
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
      border={"1px solid #1f2937"}
      p={"4px 8px"}
      borderRadius={"4px"}
    >
      <Text
        textTransform={"uppercase"}
        color="#9CA3AF"
        fontSize={"12px"}
        fontWeight={600}
      >
        {name}
      </Text>
      <Text
        color="#33F57A"
        fontSize={"12px"}
        fontWeight={600}
        textTransform={"uppercase"}
        sx={{
          backgroundColor: "color-mix(in srgb, #33F57A, transparent 85%)",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        {Array.isArray(value)
          ? getArr(value)
          : name.toLowerCase() === "user rating" ||
              name.toLowerCase() === "editor rating"
            ? `above ${value}`
            : value}
      </Text>
      <Stack
        fontSize={"8px"}
        borderRadius={"1000px"}
        bgcolor={"#9ca3af"}
        color={"#111111"}
        p={"3px"}
        sx={{
          "&:hover": {
            backgroundColor: "#6b7280",
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
