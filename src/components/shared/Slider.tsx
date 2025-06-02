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
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const Slider = ({
  itemWidth,
  step,
  children,
  iconWhite = false,
  onLoadMore,
  hasMore,
}: SliderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  const ITEM_WIDTH = itemWidth;
  const STEP = ITEM_WIDTH + step;

  const isDragging = useRef(false);

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
          style={{ x, display: "flex", gap: `16px`, userSelect: "none" }}
          drag="x"
          dragConstraints={false}
          dragMomentum={false}
          onDragStart={() => {
            isDragging.current = true;
          }}
          onDragEnd={(_event, info) => {
            const container = containerRef.current;
            const track = trackRef.current;
            if (!container || !track) return;

            const maxScrollX = -(track.scrollWidth - container.offsetWidth);
            const currentX = x.get();

            if (info.offset.x > 50) {
              handleScroll("left");
            } else if (info.offset.x < -50) {
              handleScroll("right");
            }

            if (
              Math.abs(currentX - maxScrollX) < STEP &&
              typeof onLoadMore === "function"
            ) {
              onLoadMore();
            }

            setTimeout(() => {
              isDragging.current = false;
            }, 0);
          }}
        >
          {/* {children} */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement<{ isDragging?: boolean }>(child)) {
              return React.cloneElement(child, {
                isDragging: isDragging.current,
              });
            }
            return child;
          })}
        </motion.div>
      </Stack>
    </Stack>
  );
};

export default memo(Slider);
