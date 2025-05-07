"use client";

import { Text } from "@components/shared";
import PopularIcon from "@icons/PopularIcon";
import { Stack, IconButton } from "@mui/material";
import { useGameCount } from "@store/game";
import { motion, useMotionValue, animate } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const PopularGenres = () => {
  const { data } = useGameCount();
  const [arrKeys, setArrKeys] = useState<string[]>([]);

  useEffect(() => {
    if (data?.genre) {
      setArrKeys(Object.keys(data.genre));
    }
  }, [data]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  const ITEM_WIDTH = 208;
  const STEP = ITEM_WIDTH + 16;

  const handleScroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const step = direction === "left" ? STEP : -STEP;
    const newX = x.get() + step;

    const maxScroll = -(track.scrollWidth - container.offsetWidth);
    const clampedX = Math.max(Math.min(newX, 0), maxScroll);

    animate(x, clampedX, {
      type: "tween",
      duration: 0.35,
      ease: "easeInOut",
    });
  };

  return (
    <Stack direction="column" gap={2} sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" gap={2}>
        <PopularIcon sx={{ color: "#9CA3AF" }} />
        <Text color="white" fontSize="20px" fontWeight={700}>
          Popular Genres
        </Text>
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
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
              color: "#9CA3AF",
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
              color: "#9CA3AF",
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
                bgcolor="#546744"
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
      </Stack>
    </Stack>
  );
};

export default memo(PopularGenres);
