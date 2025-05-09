"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Image, Text } from "@components/shared";
import { Stack } from "@mui/material";
import React, { memo } from "react";

export interface PropsLastNew {
  hover: boolean;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  img: any | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
  id: number | null;
}

const LastNewsFull = ({
  hover,
  setHover,
  img,
  setId,
  index,
  id,
}: PropsLastNew) => {
  return (
    <Stack
      direction={"column"}
      borderRadius={"16px"}
      p={"6px"}
      border={"1px solid grey"}
      bgcolor={"#111827"}
      sx={{
        transition: "translate 0.2s ease-in-out",
        "&:hover": {
          translate: "0 -6px",
          cursor: "pointer",
        },
      }}
      onMouseEnter={() => {
        setHover(true);
        setId(index);
      }}
      onMouseLeave={() => {
        setHover(false);
        setId(null);
      }}
    >
      <Stack>
        <Image
          src={img}
          alt={`img-${img}`}
          size="100%"
          aspectRatio={7 / 4}
          sizes="960px"
          containerProps={{
            sx: {
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: "16px",

              border: "1px",
              borderColor:
                "linear-gradient(180deg,rgba(189, 189, 189, 1) 0%, rgba(87, 87, 87, 0.5) 100%)",
              "& img": {
                objectFit: hover && id === index ? "cover" : "fill",
                objectPosition: "center",
                transition: "all 0.5s ease-in-out",
              },
            },
          }}
        />
      </Stack>

      <Stack direction={"column"} gap={2} p={2}>
        <Text color="#9CA3AF" fontSize={"12px"} fontWeight={600}>
          TIME
        </Text>

        <Text color="#F9FAFB" fontSize={"18px"} fontWeight={700}>
          Name
        </Text>

        <Text color="#9CA3AF" fontSize={"14px"} fontWeight={400}>
          Description
        </Text>

        <Text
          color="#7dffac"
          fontSize={"12px"}
          fontWeight={600}
          textTransform={"uppercase"}
          sx={{
            backgroundColor: "color-mix(in srgb, #33F57A, transparent 85%)",
            padding: "4px 8px",
            borderRadius: "4px",
            width: "max-content",
            border: "1px solid #0a5d2b80",
          }}
        >
          Tag
        </Text>
      </Stack>
    </Stack>
  );
};

export default memo(LastNewsFull);
