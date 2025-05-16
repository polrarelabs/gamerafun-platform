"use client";

import { Image, Text } from "@components/shared";
import { Stack } from "@mui/material";
import React, { memo, useEffect, useRef, useState } from "react";
import { PropsLastNew } from "./LastNewsFull";
import useWindowSize from "@hooks/useWindowSize";

const LastNewsSmall = ({
  hover,
  setHover,
  img,
  setId,
  index,
  id,
}: PropsLastNew) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useWindowSize();
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;
    setHeight(
      containerRef.current?.offsetHeight
        ? containerRef.current?.offsetHeight * 1.5
        : undefined,
    );
  }, [width]);

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      borderRadius={"16px"}
      p={"6px"}
      border={"1px solid grey"}
      bgcolor={"#111827"}
      sx={{
        // transition: "translate 0.2s ease-in-out",
        "&:hover": {
          // translate: "0 -6px",
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
      <Stack height={"100%"} ref={containerRef}>
        <Image
          src={img}
          alt={`img-${img}`}
          size="100%"
          aspectRatio={7 / 3}
          sizes={`${height}px`}
          containerProps={{
            sx: {
              width: `${height}px`,
              height: "100%",
              overflow: "hidden",
              borderRadius: "16px",

              border: "1px",
              borderColor:
                "linear-gradient(180deg,rgba(189, 189, 189, 1) 0%, rgba(87, 87, 87, 0.5) 100%)",
              "& img": {
                objectFit: hover && id === index ? "cover" : "fill",
                objectPosition: "",
                transition: "all 0.5s ease-in-out",
              },
            },
          }}
        />
      </Stack>

      <Stack
        direction={"column"}
        gap={2}
        p={2}
        justifyContent={"space-between"}
      >
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

export default memo(LastNewsSmall);
