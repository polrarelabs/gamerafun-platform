"use client";

import { Image, Text } from "@components/shared";
import { Stack } from "@mui/material";
import { motion, useInView } from "framer-motion";
import React, { useRef, useState } from "react";

const PopularGenres = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);

  const maxIndex = DATA.length;

  const onChangeSlideIndex = (type: "prev" | "next") => () => {
    setSlideIndex((prev) => {
      if (type === "prev") return (prev - 1 + maxIndex) % maxIndex;
      return (prev + 1) % maxIndex;
    });
  };

  return (
    <Stack direction={"column"} gap={2}>
      <Stack>
        <Text color="white" fontSize={"20px"} fontWeight={700}>
          Popular Genres
        </Text>
      </Stack>
      <Stack
        component={motion.section}
        direction="row"
        alignItems="center"
        whileHover="hover"
        ref={ref}
        maxWidth="100vw"
        overflow="hidden"
        position="relative"
        gap={2}
        // sx={{ aspectRatio: 4 / 3 }}
      >
        {DATA.map((item, index) => {
          return (
            <Stack
              key={index}
              width="100%"
              height="100%"
              position={"relative"}
              bgcolor={"#546744"}
              sx={{
                aspectRatio: 4 / 2.5,
                borderRadius: "6px",
                opacity: 0.7,
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <Text
                position={"absolute"}
                left={"50%"}
                bottom={2}
                color="common.white"
                variant={{ xs: "body1", md: "subtitle1" }}
                fontWeight={500}
                sx={{
                  translate: "-50% -50%",
                  zIndex: 3,
                }}
              >
                {item}
              </Text>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default PopularGenres;

const DATA = [
  "title1",
  "title2",
  "title3",
  "title4",
  "title5",
  "title6",
  "title7",
  "title8",
];
