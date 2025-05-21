"use client";

import useBreakpoint from "@hooks/useBreakpoint";
import { Stack } from "@mui/material";
import { palette } from "public/material";
import React, { memo, useEffect, useRef, useState } from "react";
import Image from "./Image";
import Text from "./Text";
import useWindowSize from "@hooks/useWindowSize";
import { ListGame } from "@store/game";
import img from "public/images/img-logo.png";
import { GetIcon } from "@components/screens/Games/components";

interface CardItemProps {
  index: number;
  data: ListGame;
  handleClick?: (value: number) => void;
  title: string;
  displayLayout?: string;
}

const CardItem = ({ index, data, handleClick, title }: CardItemProps) => {
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
  const { isSmSmaller } = useBreakpoint();

  const [hover, setHover] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

  return (
    <Stack
      position={"relative"}
      // p={"6px"}
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
      direction={isSmSmaller ? "row" : "column"}
      justifyContent={"space-between"}
      onMouseEnter={() => {
        setHover(true);
        setId(index);
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
        height={isSmSmaller ? "100%" : undefined}
        ref={isSmSmaller ? containerRef : undefined}
        p={"6px"}
      >
        <Image
          src={data.media[0] ? data.media[0].url : img}
          alt={`img-${img}`}
          size="100%"
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
                // objectFit: hover && id === index ? "cover" : "fill",
                objectFit: "cover",
                objectPosition: "center",
                transition: "all 0.5s ease-in-out",
              },
            },
          }}
        />
      </Stack>

      {isSmSmaller ? (
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
            <Text
              color={palette.colorGray}
              fontSize={"12px"}
              textAlign={"center"}
            >
              {data.description ? data.description : "description"}
            </Text>
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
            <Text
              color={palette.colorGray}
              fontSize={"12px"}
              textAlign={"center"}
            >
              {data.description ? data.description : "description"}
            </Text>
            <GetIcon array={data.support_os} />
          </Stack>
          <Stack
            bgcolor={palette.colorItemGame?.borderTitle}
            py="2px"
            sx={{
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px",
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
        </>
      )}
    </Stack>
  );
};

export default memo(CardItem);
