/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Stack } from "@mui/material";
import { palette } from "public/material";
import React, { forwardRef, memo, useEffect, useRef, useState } from "react";
import Image from "./Image";
import Text from "./Text";
import useWindowSize from "@hooks/useWindowSize";
import img from "public/images/img-logo.png";
import { GetIcon } from "@components/screens/Games/components";
import GameIcon from "@icons/web3/GameIcon";

interface CardItemProps {
  index: number;
  data: any | null;
  handleClick?: (value: number) => void;
  title: string;
  displayLayout?: string;
  isSmaller: boolean;
}

const CardItem = forwardRef<HTMLDivElement, CardItemProps>(
  ({ index, data, handleClick, title, isSmaller }, ref) => {
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

    const [hover, setHover] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);
    const getImageSrc = (url: string) => {
      if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
        return url;
      }
      return img;
    };
    const getGenres = (genres: string[]) => {
      if (genres && genres.length > 2) {
        return genres.map((genre, index) => {
          if (index < 2) {
            return (
              <Text
                key={index}
                color={palette.colorGray}
                fontSize={"12px"}
                textAlign={"center"}
              >
                {genre}
                {index < 1 && genres.length > 1 ? ", " : ""}
              </Text>
            );
          } else if (index === 2 && genres.length > 3) {
            return (
              <Text
                key={index}
                color={palette.colorGray}
                fontSize={"12px"}
                textAlign={"center"}
              >
                +{genres.length - 2}
              </Text>
            );
          }
        });
      } else if (genres && genres.length <= 2) {
        return genres.map((genre, index) => {
          return (
            <Text
              key={index}
              color={palette.colorGray}
              fontSize={"12px"}
              textAlign={"center"}
            >
              {genre}
              {index === genres.length - 1 ? "" : ", "}
            </Text>
          );
        });
      }
    };

    return (
      <Stack
        ref={ref}
        position={"relative"}
        p={"6px"}
        borderRadius={"16px"}
        bgcolor={palette.colorRelate?.bgColor}
        gap={2}
        border={`1px solid ${palette.colorItemGame?.border}`}
        sx={{
          transition: "translate 0.2s ease-in-out",
          "&:hover": {
            translate: "0 -6px",
            cursor: "pointer",
          },
        }}
        direction={isSmaller ? "row" : "column"}
        justifyContent={"space-between"}
        onMouseEnter={(e) => {
          setHover(true);
          setId(index);
          const img = e.currentTarget.querySelector("img");
          if (img) {
            console.log("Image URL:", img.src);
          }
        }}
        onMouseLeave={() => {
          setHover(false);
          setId(null);
        }}
        onClick={() => {
          if (handleClick) handleClick(data.id);
        }}
      >
        <Stack
          height={isSmaller ? "100%" : undefined}
          ref={isSmaller ? containerRef : undefined}
          // p={"6px"}
        >
          <Image
            src={getImageSrc(data.mediaUrl[0])}
            alt={`img-${img}`}
            size="100%"
            aspectRatio={isSmaller ? 1 / 1 : 3 / 2}
            sizes={isSmaller ? 150 : `${height}px`}
            containerProps={{
              sx: {
                width: isSmaller ? 150 : `${height}px`,
                height: isSmaller ? 150 : "100%",
                overflow: "hidden",
                borderRadius: "16px",

                border: "1px",
                borderColor: palette.borderColorLinear,
                "& img": {
                  objectFit: hover && id === index ? "cover" : "fill",
                  // objectFit: "cover",
                  objectPosition: "center",
                  transition: "all s ease-in-out",
                },
              },
            }}
          />
        </Stack>

        {isSmaller ? (
          <Stack justifyContent={"space-between"} width={"100%"}>
            <Stack py="0.5rem" gap={1} alignItems={"start"}>
              <Text
                fontSize={"18px"}
                color="white"
                textAlign={"center"}
                fontWeight={700}
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 1,
                }}
              >
                {data.name}
              </Text>
              <Stack
                direction={"row"}
                gap={1}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {getGenres(data.genreName)}
              </Stack>
              <GetIcon array={data.support_os} />
            </Stack>
            <Stack
              py="2px"
              sx={{
                borderBottomRightRadius: "12px",
                background: palette.colorItemGame?.borderLinear,
              }}
            >
              <Text
                color={palette.colorItemGame?.colorText}
                fontSize={"12px"}
                textAlign={"center"}
              >
                {title}
              </Text>
            </Stack>
          </Stack>
        ) : (
          <>
            <Stack py="0.5rem" gap={1}>
              <Text
                fontSize={"18px"}
                color="white"
                textAlign={"center"}
                fontWeight={700}
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 1,
                }}
              >
                {data.name}
              </Text>
              <Stack
                direction={"row"}
                gap={1}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {getGenres(data.genreName)}
              </Stack>
              <GetIcon array={data.support_os} />
            </Stack>
            <Stack
              bgcolor={palette.colorItemGame?.borderTitle}
              py="2px"
              sx={{
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
              }}
              direction={"row"}
              alignItems={"center"}
              gap={1}
              justifyContent={"center"}
            >
              <GameIcon
                sx={{
                  color: palette.colorGray,
                  fontSize: 15,
                }}
              />
              <Text
                color={palette.colorItemGame?.colorText}
                fontSize={"12px"}
                textTransform={"uppercase"}
              >
                {data.statusGame}
              </Text>
            </Stack>
          </>
        )}
      </Stack>
    );
  },
);

CardItem.displayName = "CardItem";

export default memo(CardItem);
