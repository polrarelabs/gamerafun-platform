/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GetIcon } from "@components/screens/Games/components";
import useBreakpoint from "@hooks/useBreakpoint";
import useWindowSize from "@hooks/useWindowSize";
import StarOutlineIcon from "@icons/common/StarOutlineIcon";
import StarSolidIcon from "@icons/common/StarSolidIcon";
import GameIcon from "@icons/web3/GameIcon";
import { Stack } from "@mui/material";
import { PlatformLinkProps } from "@store/game/type";
import { motion } from "framer-motion";
import img from "public/images/img-logo.png";
import { palette } from "public/material";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AverageStar from "./AverageStar";
import Image from "./Image";
import Text from "./Text";
import { getImageSrc } from "@components/helper";

interface CardItemProps {
  data: any | null;
  handleClick?: (value: number) => void;
  displayLayout?: string;
  isSmaller: boolean;
  isHover?: boolean;
  widthMax?: number | null;
  isHome?: boolean;
  isReview?: boolean;
  isStar?: boolean;
  isDragging?: boolean;
}

const getGenres = (genres: string[]) => {
  if (!genres || genres.length === 0) return null;

  const items = genres.slice(0, 2).map((genre, idx) => (
    <Text
      key={idx}
      color={palette.colorGray}
      fontSize="12px"
      textAlign="center"
    >
      {genre}
      {idx === 0 && genres.length > 1 ? ", " : ""}
    </Text>
  ));

  if (genres.length > 2) {
    items.push(
      <Text
        key="more"
        color={palette.colorGray}
        fontSize="12px"
        textAlign="center"
      >
        +{genres.length - 2}
      </Text>,
    );
  }

  return items;
};

const getPlatform = (platform: PlatformLinkProps[]) =>
  platform.map((item) => Object.keys(item)[0]);

const CardItem = forwardRef<HTMLDivElement, CardItemProps>(
  (
    {
      isDragging,
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
      if (containerRef.current) {
        setHeight(containerRef.current.offsetHeight * 1.5);
      }
    }, [width]);

    const [hover, setHover] = useState(false);
    const [favorite, setFavorite] = useState(false);

    const containerWidth = widthMax ?? (isSmaller ? 125 : `${height}px`);

    const handleMouseEnter = useCallback(() => {
      if (isHover) setHover(true);
    }, [isHover]);

    const handleMouseLeave = useCallback(() => {
      if (isHover) setHover(false);
    }, [isHover]);

    const handleCardClick = () => {
      if (!isDragging && handleClick) {
        handleClick(data.id);
      }
    };
    const GameStatus = (
      <Stack
        py="2px"
        sx={{
          borderBottomLeftRadius: isSmaller ? undefined : "7px",
          borderBottomRightRadius: "7px",
          background: isSmaller
            ? palette.colorItemGame?.borderLinear
            : palette.colorItemGame?.borderTitle,
        }}
        direction="row"
        alignItems="center"
        gap={1}
        justifyContent="center"
      >
        <GameIcon sx={{ color: palette.colorGray, fontSize: 15 }} />
        <Text
          color={palette.colorItemGame?.colorText}
          fontSize="12px"
          textTransform="uppercase"
        >
          {data.statusGame}
        </Text>
      </Stack>
    );
    return (
      <Stack
        ref={ref}
        position="relative"
        sx={{
          background: palette.colorGame?.colorBorderLinear1,
          padding: "1px",
          borderRadius: "5px",
          cursor: hover ? "pointer" : "default",
          transform: isHover && hover ? "translate(0, -6px)" : "none",
          transition: "transform 0.2s ease-in-out",
        }}
        justifyContent="space-between"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        <Stack
          bgcolor={palette.bgMenuHover}
          component={motion.section}
          p="4px"
          width="100%"
          height="100%"
          borderRadius="5px"
          direction={isSmaller ? "row" : "column"}
          position={"relative"}
        >
          <Stack
            height={isSmaller ? "100%" : undefined}
            ref={isSmaller ? containerRef : undefined}
            position="relative"
          >
            {isStar && !favorite && (
              <Stack
                position="absolute"
                top={15}
                right={5}
                sx={{
                  zIndex: 3,
                  height: 40,
                  width: 40,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                component={motion.div}
                variants={{
                  open: { y: 0, opacity: 1, transition: { duration: 0.3 } },
                  close: { y: -20, opacity: 0 },
                }}
                animate={!favorite ? (hover ? "open" : "close") : "close"}
              >
                <StarOutlineIcon
                  sx={{ fontSize: 30 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFavorite(true);
                  }}
                />
              </Stack>
            )}
            {isStar && favorite && (
              <Stack
                position="absolute"
                top={15}
                right={5}
                sx={{
                  zIndex: 4,
                  height: 40,
                  width: 40,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <StarSolidIcon
                  sx={{ fontSize: 30, color: "secondary.main" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFavorite(false);
                  }}
                />
              </Stack>
            )}

            <Image
              src={getImageSrc(data.mediaUrl?.[0], img)}
              alt={`img-${img}`}
              size="100%"
              aspectRatio={1 / 1}
              sizes={containerWidth}
              draggable={false}
              containerProps={{
                sx: {
                  width: containerWidth,
                  height: isSmaller ? 125 : "100%",
                  overflow: "hidden",
                  borderRadius: "5px",
                  "& img": {
                    pointerEvents: "none",
                    objectFit: "cover",
                    objectPosition: "center",
                    scale: hover ? 1.05 : 1,
                    transition: "all 0.2s ease-in-out",
                  },
                },
              }}
            />

            {!isHome && !isReview && data.rating <= 0 && (
              <Stack
                position="absolute"
                sx={{
                  right: isMdSmaller ? 5 : 10,
                  bottom: isMdSmaller ? 5 : 10,
                }}
              >
                <AverageStar value={5} size={52} />
              </Stack>
            )}
          </Stack>
          <Stack
            justifyContent="space-between"
            height="100%"
            width={isSmaller ? "100%" : undefined}
          >
            <Stack py="0.5rem" gap={1} alignItems="center">
              <Text
                fontSize="18px"
                color="white"
                textAlign="center"
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
                direction="row"
                gap={1}
                alignItems="center"
                justifyContent="center"
              >
                {getGenres(data.genreName)}
              </Stack>

              {(isSmaller || (!isHome && !isReview)) && (
                <GetIcon array={getPlatform(data.platformLink)} />
              )}
            </Stack>

            {!isHome && GameStatus}
          </Stack>
        </Stack>
      </Stack>
    );
  },
);

CardItem.displayName = "CardItem";

export default memo(CardItem);
