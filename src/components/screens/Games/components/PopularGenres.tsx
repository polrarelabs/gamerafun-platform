"use client";

import { Slider, Text } from "@components/shared";
import PopularIcon from "@icons/web3/PopularIcon";
import { Stack, IconButton } from "@mui/material";
import { motion, useMotionValue, animate } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { palette } from "public/material";
import { useGame } from "@store/game";

const PopularGenres = () => {
  const { gameCount, getGameCount } = useGame();
  const [arrKeys, setArrKeys] = useState<string[]>([]);

  useEffect(() => {
    getGameCount();
  }, []);
  useEffect(() => {
    if (gameCount?.genre) {
      setArrKeys(Object.keys(gameCount.genre));
    }
  }, [gameCount]);
  return (
    <Stack direction="column" gap={2} sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" gap={2}>
        <PopularIcon sx={{ color: palette.colorGray }} />
        <Text color="white" fontSize="20px" fontWeight={700}>
          Popular Genres
        </Text>
      </Stack>
      {arrKeys && arrKeys.length > 6 ? (
        <Slider itemWidth={208} step={16}>
          {arrKeys.map((item) => (
            <Stack
              key={item}
              width={`208px`}
              height="108px"
              bgcolor={palette.bgColorYellow}
              position="relative"
              flexShrink={0}
              sx={{
                borderRadius: "6px",
                opacity: 0.7,
                "&:hover": {
                  opacity: 1,
                  cursor: "pointer",
                },
              }}
            >
              <Text
                position="absolute"
                left="50%"
                bottom={2}
                color="common.white"
                variant={{ xs: "body1", md: "subtitle1" }}
                fontWeight={500}
                sx={{
                  translate: "-50% -50%",
                  // zIndex: 3,
                }}
              >
                {item}
              </Text>
            </Stack>
          ))}
        </Slider>
      ) : (
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          {arrKeys &&
            arrKeys.map((item, index) => {
              return (
                <Stack
                  key={index}
                  width={`208px`}
                  height="108px"
                  bgcolor={palette.bgColorYellow}
                  position="relative"
                  flexShrink={0}
                  sx={{
                    borderRadius: "6px",
                    opacity: 0.7,
                    "&:hover": {
                      opacity: 1,
                      cursor: "pointer",
                    },
                  }}
                >
                  <Text
                    position="absolute"
                    left="50%"
                    bottom={2}
                    color="common.white"
                    variant={{ xs: "body1", md: "subtitle1" }}
                    fontWeight={500}
                    sx={{
                      translate: "-50% -50%",
                    }}
                  >
                    {item}
                  </Text>
                </Stack>
              );
            })}
        </Stack>
      )}
    </Stack>
  );
};

export default memo(PopularGenres);

// const containerRef = useRef<HTMLDivElement | null>(null);
// const trackRef = useRef<HTMLDivElement | null>(null);
// const x = useMotionValue(0);

// const ITEM_WIDTH = 208;
// const STEP = ITEM_WIDTH + 16;

// const handleScroll = (direction: "left" | "right") => {
//   const container = containerRef.current;
//   const track = trackRef.current;
//   if (!container || !track) return;

//   const step = direction === "left" ? STEP : -STEP;
//   const newX = x.get() + step;

//   const maxScroll = -(track.scrollWidth - container.offsetWidth);
//   const clampedX = Math.max(Math.min(newX, 0), maxScroll);

//   animate(x, clampedX, {
//     type: "tween",
//     duration: 0.35,
//     ease: "easeInOut",
//   });
// };

{
  /* <Stack direction="row" alignItems="center" gap={1}>
        <Stack
          direction="row"
          overflow="hidden"
          flex={1}
          ref={containerRef}
          sx={{ position: "relative" }}
        >
          <IconButton
            onClick={() => handleScroll("left")}
            sx={{
              position: "absolute",
              top: "50%",
              left: 25,
              translate: "-50% -50%",
              zIndex: 1,
              color: palette.colorGray,
              "&:hover": {
                color: "white",
              },
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton
            onClick={() => handleScroll("right")}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              translate: "0 -50%",
              zIndex: 1,
              color: palette.colorGray,
              transform: "rotate(180deg)",
              "&:hover": {
                color: "white",
              },
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <motion.div
            ref={trackRef}
            style={{ x, display: "flex", gap: `16px` }}
            drag="x"
            dragConstraints={false}
            onDragEnd={(_event, info) => {
              if (info.offset.x > 50) {
                handleScroll("left");
              } else if (info.offset.x < -50) {
                handleScroll("right");
              }
            }}
          >
            {arrKeys.map((item) => (
              <Stack
                key={item}
                width={`${ITEM_WIDTH}px`}
                height="108px"
                bgcolor={palette.bgColorYellow}
                position="relative"
                flexShrink={0}
                sx={{
                  borderRadius: "6px",
                  opacity: 0.7,
                  "&:hover": {
                    opacity: 1,
                    cursor: "pointer",
                  },
                }}
              >
                <Text
                  position="absolute"
                  left="50%"
                  bottom={2}
                  color="common.white"
                  variant={{ xs: "body1", md: "subtitle1" }}
                  fontWeight={500}
                  sx={{
                    translate: "-50% -50%",
                    // zIndex: 3,
                  }}
                >
                  {item}
                </Text>
              </Stack>
            ))}
          </motion.div>
        </Stack>
      </Stack> */
}
