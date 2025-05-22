"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Image, Text } from "@components/shared";
import useWindowSize from "@hooks/useWindowSize";
import { Stack } from "@mui/material";
import { BlogItem } from "@store/new";
import { palette } from "public/material";
import React, { forwardRef, memo, useEffect, useRef, useState } from "react";

export interface PropsLastNew {
  hover: boolean;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  img: any | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
  id: number | null;
  displayLayout: string;
  data: BlogItem;
  handleClick: (id: number) => void;
}

const CardBlog = forwardRef<HTMLDivElement, PropsLastNew>(
  (
    {
      hover,
      setHover,
      img,
      setId,
      index,
      id,
      data,
      displayLayout,
      handleClick,
    },
    ref,
  ) => {
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
        ref={ref}
        direction={displayLayout === "list" ? "row" : "column"}
        borderRadius={"16px"}
        alignItems={displayLayout === "list" ? "center" : undefined}
        p={"6px"}
        border={"1px solid grey"}
        bgcolor={palette.bgMenu}
        sx={{
          transition:
            displayLayout === "list" ? undefined : "translate 0.2s ease-in-out",
          "&:hover": {
            translate: displayLayout === "list" ? undefined : "0 -6px",
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
        onClick={() => handleClick(data.id)}
      >
        <Stack
          height={displayLayout === "list" ? "100%" : undefined}
          ref={displayLayout === "list" ? containerRef : undefined}
        >
          <Image
            src={img}
            alt={`img-${img}`}
            size="100%"
            // aspectRatio={displayLayout === "list" ? 7 / 3 : 7 / 4}
            aspectRatio={3 / 2}
            sizes={`${height}px`}
            containerProps={{
              sx: {
                width: `${height}px`,
                height: "100%",
                overflow: "hidden",
                borderRadius: "16px",

                border: "1px",
                borderColor: palette.borderColorLinear,
                "& img": {
                  objectFit: hover && id === index ? "cover" : "fill",
                  objectPosition: "center",
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
          justifyContent={
            displayLayout === "list" ? "space-between" : undefined
          }
        >
          <Text color={palette.colorGray} fontSize={"12px"} fontWeight={600}>
            {data.publicDate}
          </Text>

          <Text color={palette.textWhite} fontSize={"18px"} fontWeight={700}>
            {data.title}
          </Text>

          <Text color={palette.colorGray} fontSize={"14px"} fontWeight={400}>
            {data.shortDescription}
          </Text>

          <Text
            color={palette.greenColorText}
            fontSize={"12px"}
            fontWeight={600}
            textTransform={"uppercase"}
            sx={{
              backgroundColor: palette.greenColorButton,
              padding: "4px 8px",
              borderRadius: "4px",
              width: "max-content",
              border: `1px solid ${palette.colorBorderTag}`,
            }}
          >
            Tag
          </Text>
        </Stack>
      </Stack>
    );
  },
);

CardBlog.displayName = "CardBlog";
export default memo(CardBlog);
