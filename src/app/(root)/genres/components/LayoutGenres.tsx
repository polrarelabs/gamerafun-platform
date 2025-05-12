"use client";

import { Image, Text } from "@components/shared";
import { Box, Stack } from "@mui/material";
import { useGameCount, useGameReducers } from "@store/game";
import React, { useEffect, useState } from "react";
import img from "public/images/anh.png";
import { useRouter } from "next/navigation";

const LayoutGenres = () => {
  const router = useRouter();
  const { data, loading, error, fetchGameCount } = useGameCount();
  const { SetGenres } = useGameReducers();
  useEffect(() => {
    fetchGameCount();
  }, []);

  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.genre) {
      const arr: string[] = Object.keys(data.genre);
      setGenres(arr);
    }
  }, [data]);

  const [hover, setHover] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

  const handleHover = (index: number) => {
    setHover(true);
    setId(index);
  };

  const handleUnHover = () => {
    setHover(false);
    setId(null);
  };

  const handleClick = (item: string) => {
    const text = item.toLowerCase();
    const arr: string[] = [];
    arr.push(text);
    SetGenres(arr);
    router.push(`/genres/${text}`);
  };

  return (
    <Stack gap={2} display={"grid"} gridTemplateColumns={"repeat(5, 1fr)"}>
      {genres.map((item, index) => {
        return (
          <Stack
            key={index}
            borderRadius={"8px"}
            position={"relative"}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={handleUnHover}
            width={"100%"}
            height={"100%"}
            onClick={() => handleClick(item)}
          >
            <Image
              src={img}
              alt={`img-${img}`}
              size="100%"
              aspectRatio={7 / 4}
              sizes="960px"
              containerProps={{
                sx: {
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: "16px",
                  border: "1px",
                  "& img": {
                    objectFit: "cover",
                    objectPosition: "center",
                  },
                  opacity: hover && id === index ? 1 : 0.6,
                  cursor: hover && id === index ? "pointer" : undefined,
                  transition: "all 0.5s ease-in-out",
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                background:
                  "linear-gradient(180deg,rgba(33, 43, 56, 0) 0%, rgba(33, 43, 56, 1) 97%, rgba(33, 43, 56, 1) 100%) !important",
                width: "100%",
                height: "100%",
                bottom: 0,
                opacity: 0.2,
                display: hover && id === index ? "block" : "none",
                transition: "all 0.5s ease-in-out",
              }}
            />
            <Text
              sx={{
                position: "absolute",
                left: "50%",
                bottom: 0,
                translate: "-50% -50%",
                fontWeight: 700,
              }}
            >
              {item}
            </Text>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default LayoutGenres;
