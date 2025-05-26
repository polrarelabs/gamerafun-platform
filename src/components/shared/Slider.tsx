"use client";

import React, { memo, useRef } from "react";
import { IconButton, Stack } from "@mui/material";
import { palette } from "public/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { animate, motion, useMotionValue } from "framer-motion";

interface SliderProps {
  itemWidth: number;
  step: number;
  children: React.ReactNode;
  iconWhite?: boolean;
}

const Slider = ({
  itemWidth,
  step,
  children,
  iconWhite = false,
}: SliderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  const ITEM_WIDTH = itemWidth;
  const STEP = ITEM_WIDTH + step;

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
    <Stack direction="row" alignItems="center" gap={1}>
      <Stack
        direction="row"
        overflow="hidden"
        flex={1}
        ref={containerRef}
        sx={{ position: "relative" }}
      >
        {iconWhite ? (
          <>
            <IconButton
              onClick={() => handleScroll("left")}
              sx={{
                position: "absolute",
                top: "50%",
                left: 30,
                translate: "-50% -50%",
                zIndex: 1,
                color: "black",
                background: "white",
                "&:hover": {
                  background: palette.textWhite,
                },
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: 35 }} />
            </IconButton>
            <IconButton
              onClick={() => handleScroll("right")}
              sx={{
                position: "absolute",
                top: "50%",
                right: 0,
                translate: "0 -50%",
                zIndex: 1,
                transform: "rotate(180deg)",
                color: "black",
                background: "white",
                "&:hover": {
                  background: palette.textWhite,
                },
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: 35 }} />
            </IconButton>
          </>
        ) : (
          <>
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
          </>
        )}
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
          {children}
        </motion.div>
      </Stack>
    </Stack>
  );
};

export default memo(Slider);
