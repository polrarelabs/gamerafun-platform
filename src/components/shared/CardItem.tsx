/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GetIcon } from "@components/screens/Games/components";
import useBreakpoint from "@hooks/useBreakpoint";
import useWindowSize from "@hooks/useWindowSize";
import StarOutlineIcon from "@icons/common/StarOutlineIcon";
import GameIcon from "@icons/web3/GameIcon";
import { Stack } from "@mui/material";
import { PlatformLinkProps } from "@store/game/type";
import { motion } from "framer-motion";
import img from "public/images/img-logo.png";
import { palette } from "public/material";
import { forwardRef, memo, useEffect, useRef, useState } from "react";
import AverageStar from "./AverageStar";
import Image from "./Image";
import Text from "./Text";
import StarSolidIcon from "@icons/common/StarSolidIcon";
import { getImageSrc } from "@components/helper";

interface CardItemProps {
  index: number;
  data: any | null;
  handleClick?: (value: number) => void;
  title: string;
  displayLayout?: string;
  isSmaller: boolean;
  isHover?: boolean;
  widthMax?: number | null;
  isHome?: boolean;
  isReview?: boolean;
  isStar?: boolean;
}

const CardItem = forwardRef<HTMLDivElement, CardItemProps>(
  (
    {
      index,
      data,
      handleClick,
      isSmaller,
      isHover = true,
      widthMax = null,
      isHome = false,
      isReview = false,
      isStar = true,
    },
    ref,
  ) => {
    const { isMdSmaller } = useBreakpoint();
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
    // const refStar = useRef<HTMLDivElement | null>(null);
    // const isInView = useInView(refStar);

    const [hover, setHover] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);

    const [favorite, setFavorite] = useState<boolean>(false);

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

    const getPlatform = (platform: PlatformLinkProps[]) => {
      const arr: string[] = [];
      platform.forEach((item) => arr.push(Object.keys(item)[0]));
      return arr;
    };

    return (
      <Stack
        ref={ref}
        position={"relative"}
        zIndex={2}
        sx={{
          background: palette.colorGame?.colorBorderLinear1,
          padding: "1px",
          borderRadius: "16px",
          transition: "translate 0.2s ease-in-out",
          "&:hover": {
            translate: isHover ? "0 -6px" : undefined,
            cursor: "pointer",
          },
        }}
        justifyContent={"space-between"}
        onMouseEnter={(e) => {
          if (isHover === true) {
            setHover(true);
            setId(index);
            const img = e.currentTarget.querySelector("img");
            if (img) {
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
        {isStar && (
          <>
            {favorite && (
              <Stack
                position={"absolute"}
                top={15}
                right={10}
                sx={{
                  zIndex: 2,
                  height: 40,
                  width: 40,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <StarSolidIcon
                  sx={{
                    fontSize: 26,
                    color: "secondary.main",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFavorite(false);
                  }}
                />
              </Stack>
            )}
          </>
        )}
        <Stack
          bgcolor={palette.bgMenuHover}
          component={motion.section}
          p={"4px"}
          width="100%"
          height="100%"
          borderRadius={"16px"}
          direction={isSmaller ? "row" : "column"}
          gap={2}
        >
          <Stack
            height={isSmaller ? "100%" : undefined}
            ref={isSmaller ? containerRef : undefined}
            position={"relative"}
          >
            {isStar && (
              <>
                {!favorite && (
                  <Stack
                    position={"fixed"}
                    top={15}
                    right={10}
                    sx={{
                      zIndex: favorite ? 3 : hover ? 2 : undefined,
                      display: favorite ? "block" : hover ? "block" : "none",
                      height: 40,
                      width: 40,
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    component={motion.div}
                    variants={{
                      open: { y: 0, transition: { duration: 0.3 } },
                      close: { y: -10 },
                    }}
                    animate={favorite ? "open" : hover ? "open" : "close"}
                  >
                    <StarOutlineIcon
                      sx={{ fontSize: 26 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFavorite(true);
                      }}
                    />
                  </Stack>
                )}
              </>
            )}
            <Image
              src={getImageSrc(data.mediaUrl[0], img)}
              alt={`img-${img}`}
              size="100%"
              aspectRatio={1 / 1}
              sizes={
                widthMax === null ? (isSmaller ? 125 : `${height}px`) : widthMax
              }
              draggable={false}
              containerProps={{
                sx: {
                  width:
                    widthMax == null
                      ? isSmaller
                        ? 125
                        : `${height}px`
                      : widthMax,
                  height: isSmaller ? 125 : "100%",
                  overflow: "hidden",
                  borderRadius: "8px",

                  border: "1px",
                  borderColor: palette.borderColorLinear,
                  "& img": {
                    scale: hover && id === index ? 1.05 : 1,
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "all 0.2s ease-in-out",
                  },
                },
              }}
            />
            {!isHome && !isReview && (
              <>
                {!(data && data.rating > 0) && (
                  <Stack
                    position={"absolute"}
                    sx={{
                      right: isMdSmaller ? 5 : 10,
                      bottom: isMdSmaller ? 5 : 10,
                    }}
                  >
                    <AverageStar value={5} size={52} />
                  </Stack>
                )}
              </>
            )}
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
                <GetIcon array={getPlatform(data.platformLink)} />
              </Stack>
              <Stack
                py="2px"
                sx={{
                  borderBottomRightRadius: "12px",
                  background: palette.colorItemGame?.borderLinear,
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
            </Stack>
          ) : (
            <Stack
              direction={"column"}
              justifyContent={"space-between"}
              height={"100%"}
            >
              <Stack gap={1} pb={2}>
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
                {!isHome && !isReview && (
                  <GetIcon array={getPlatform(data.platformLink)} />
                )}
              </Stack>
              {!isHome && (
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
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    );
  },
);

CardItem.displayName = "CardItem";

export default memo(CardItem);
