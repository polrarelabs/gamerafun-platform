/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Image } from "@components/shared";
import { Stack } from "@mui/material";
import React, { memo, useEffect, useRef } from "react";
import { palette } from "public/material";
import { DATA } from "./helper";

interface ThumbNailProps {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ThumbNail = ({ currentIndex, setCurrentIndex }: ThumbNailProps) => {
  const slider = useRef<NodeJS.Timeout | null>(null);

  const onChangeSlideIndex = (type: "prev" | "next") => {
    return () => {
      if (type === "prev") {
        setCurrentIndex((prevSlide) =>
          prevSlide === 0 ? DATA.length - 1 : prevSlide - 1,
        );
      } else {
        setCurrentIndex((prevSlide) =>
          prevSlide === DATA.length - 1 ? 0 : prevSlide + 1,
        );
      }
    };
  };

  useEffect(() => {
    slider.current = setInterval(onChangeSlideIndex("next"), 5000);
    return () => {
      if (slider.current) {
        clearInterval(slider.current);
      }
    };
  }, []);

  const handleClickImage = (index: number) => {
    setCurrentIndex(index);
    if (slider.current) {
      clearInterval(slider.current);
      slider.current = setInterval(onChangeSlideIndex("next"), 5000);
    }
  };

  return (
    <Stack
      position={"absolute"}
      bottom={0}
      right={0}
      direction={"row"}
      gap={2}
      m={4}
      // py={2}
    >
      {DATA.map((item, index) => {
        return (
          <Stack
            key={index}
            width={"96px"}
            height={"auto"}
            borderRadius={"6px"}
            border={"1px solid white"}
            position={"relative"}
            onClick={() => handleClickImage(index)}
            sx={{
              boxShadow:
                index === currentIndex
                  ? `0 0 0 3px ${palette.textWhite} , 0 0 18px 4px ${palette.textWhite}`
                  : undefined,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Image
              src={item.img}
              alt={`${item.img}+${item.title}`}
              aspectRatio={16 / 9}
              containerProps={{
                sx: {
                  "& img": {
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "6px",
                  },
                },
              }}
            />
            {index === currentIndex && (
              <Stack
                sx={{
                  position: "absolute",
                  width: "0%",
                  height: "100%",
                  bgcolor: "white",
                  opacity: 0.5,
                  zIndex: 4,
                  animationName: "width-size",
                  animationDuration: "5s",
                  "@keyframes width-size": {
                    "0%": {
                      width: "0%",
                    },
                    "100%": {
                      width: "100%",
                    },
                  },
                }}
              />
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default memo(ThumbNail);
