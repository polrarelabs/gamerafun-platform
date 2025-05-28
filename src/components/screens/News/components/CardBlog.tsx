"use client";

import { Image, Text } from "@components/shared";
import useWindowSize from "@hooks/useWindowSize";
import { Stack } from "@mui/material";
import { palette } from "public/material";
import React, { forwardRef, memo, useEffect, useRef, useState } from "react";
import img from "public/images/img-bg-login.png";
import { formatMMMMDoYYYY } from "@components/helper";
import { useGallery } from "@store/media";
import { BlogItem } from "@store/new/type";
export interface PropsLastNew {
  index: number;
  displayLayout: string;
  data: BlogItem;
  handleClick?: (id: string) => void;
  isHover?: boolean;
  widthMax?: number | null;
}

const CardBlog = forwardRef<HTMLDivElement, PropsLastNew>(
  (
    {
      index,
      data,
      displayLayout,
      handleClick,
      isHover = true,
      widthMax = null,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { width } = useWindowSize();
    const [height, setHeight] = useState<number | undefined>(undefined);
    const [hover, setHover] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);

    const { setUrl } = useGallery();

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
        alignItems={displayLayout === "list" ? "center" : undefined}
        sx={{
          background: palette.colorGame?.colorBorderLinear,
          padding: "1px",
          borderRadius: "16px",
          transition:
            displayLayout === "list" ? undefined : "translate 0.2s ease-in-out",
          "&:hover": {
            translate: isHover
              ? displayLayout === "list"
                ? undefined
                : "0 -6px"
              : undefined,
            cursor: "pointer",
          },
        }}
        onMouseEnter={(e) => {
          if (isHover === true) {
            setHover(true);
            setId(index);
            const img = e.currentTarget.querySelector("img");
            if (img) {
              setUrl(img.src);
            }
          }
        }}
        onMouseLeave={() => {
          if (isHover === true) {
            setHover(false);
            setId(null);
          }
        }}
        onClick={() => {
          if (handleClick) handleClick(data.id);
        }}
      >
        <Stack
          bgcolor={palette.bgMenuHover}
          p={"6px"}
          width="100%"
          height="100%"
          borderRadius={"16px"}
        >
          <Stack
            height={displayLayout === "list" ? "100%" : undefined}
            ref={displayLayout === "list" ? containerRef : undefined}
          >
            <Image
              src={data.thumbnailUrl ? data.thumbnailUrl : img}
              alt={`img-${img}`}
              size={"100%"}
              aspectRatio={3 / 2}
              sizes={widthMax === null ? `${height}px` : `${widthMax}px`}
              draggable={false}
              containerProps={{
                sx: {
                  width: widthMax == null ? `${height}px` : `${widthMax}px`,
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
            height={"100%"}
            justifyContent={"space-between"}
          >
            <Stack direction={"column"} gap={2}>
              <Text
                color={palette.colorGray}
                fontSize={"12px"}
                fontWeight={600}
              >
                {formatMMMMDoYYYY(data.publicDate)}
              </Text>

              <Text
                color={palette.textWhite}
                fontSize={"18px"}
                fontWeight={700}
              >
                {data.title}
              </Text>

              <Text
                color={palette.colorGray}
                fontSize={"14px"}
                fontWeight={400}
              >
                {data.metaDescription}
              </Text>
            </Stack>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              {data.tags &&
                data.tags.length > 0 &&
                data.tags.map((tag, index) => {
                  if (index < 2) {
                    return (
                      <Text
                        key={index}
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
                        {tag}
                      </Text>
                    );
                  } else if (index === 2) {
                    return (
                      <Text
                        key={index}
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
                        {`+${data.tags.length - 2}`}
                      </Text>
                    );
                  }
                })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  },
);

CardBlog.displayName = "CardBlog";
export default memo(CardBlog);
