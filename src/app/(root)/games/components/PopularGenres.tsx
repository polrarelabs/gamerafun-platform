"use client";

import { Text } from "@components/shared";
import PopularIcon from "@icons/PopularIcon";
import { Stack } from "@mui/material";
import { useGameCount } from "@store/game";
import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";

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

  return (
    <Stack
      direction="column"
      gap={2}
      overflow="hidden"
      ref={containerRef}
      sx={{ width: "100%", height: "auto" }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <PopularIcon sx={{ color: "#9CA3AF" }} />
        <Text color="white" fontSize="20px" fontWeight={700}>
          Popular Genres
        </Text>
      </Stack>
      <Stack
        component={motion.div}
        direction="row"
        gap={2}
        display="flex"
        ref={trackRef}
        drag="x"
        dragConstraints={{
          left: -(
            trackRef.current?.scrollWidth ??
            0 - (containerRef.current?.offsetWidth ?? 0)
          ),
          right: 0,
        }}
      >
        {arrKeys.map((item, index) => (
          <Stack
            key={index}
            width="208px"
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
                zIndex: 3,
              }}
            >
              {item}
            </Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default memo(PopularGenres);
