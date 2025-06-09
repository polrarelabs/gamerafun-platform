/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Image, Text } from "@components/shared";
import { Box, Stack } from "@mui/material";
import { useGame } from "@store/game";
import { GenresCProps } from "@store/game/type";
import { useRouter } from "next/navigation";
import img from "public/images/img-local.webp";
import { memo, useEffect, useState } from "react";
import { getImageSrc } from "./helper";
import { encode } from "./shared/helper";

interface ListGenresProps {
  xs?: number;
  sm?: number;
  md?: number;
  xl?: number;
  lg?: number;
}

const ListGenres = ({ xs, md, sm, lg, xl }: ListGenresProps) => {
  const router = useRouter();

  const { SetGenres, getGenres, genreItems } = useGame();

  useEffect(() => {
    getGenres({});
  }, []);

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

  const handleClick = (item: GenresCProps) => {
    SetGenres([item.name.toUpperCase()]);
    const text = encode(item.name);
    router.push(`/genres/${text}`);
  };

  return (
    <Stack
      gap={2}
      display={"grid"}
      gridTemplateColumns={{
        md: `repeat(${md}, 1fr)`,
        sm: `repeat(${sm}, 1fr)`,
        xs: `repeat(${xs}, 1fr)`,
        lg: `repeat(${lg}, 1fr)`,
        xl: `repeat(${xl}, 1fr)`,
      }}
    >
      {genreItems.map((item, index) => {
        return (
          <Stack
            key={index}
            borderRadius={"5px"}
            position={"relative"}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={handleUnHover}
            width={"100%"}
            height={"100%"}
            onClick={() => handleClick(item)}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Image
              src={getImageSrc(item.media, img)}
              alt={`img-${getImageSrc(item.media, img)}`}
              size="100%"
              aspectRatio={7 / 4}
              sizes="960px"
              containerProps={{
                sx: {
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: "5spx",
                  border: "1px",
                  "& img": {
                    objectFit: "cover",
                    objectPosition: "center",
                  },
                  opacity: hover && id === index ? 1 : 0.6,
                  cursor: hover && id === index ? "pointer" : undefined,
                  transition: "all 0.2s ease-in-out",
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
                transition: "all 0.2s ease-in-out",
              }}
            />
            <Text
              sx={{
                position: "absolute",
                left: "50%",
                bottom: 0,
                translate: "-50% -50%",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {item.name}
            </Text>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default memo(ListGenres);
