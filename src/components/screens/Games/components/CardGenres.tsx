"use client";

import { getImageSrc } from "@components/helper";
import { Image, Text } from "@components/shared";
import { Box, Stack } from "@mui/material";
import React, { memo, useState } from "react";
import img from "public/images/img-local.png";
import { GenresItems } from "@store/game/type";

interface CardGenresProps {
  index: number;
  data: GenresItems;
}

const CardGenres = ({ index, data }: CardGenresProps) => {
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

  return (
    <Stack
      borderRadius={"8px"}
      position={"relative"}
      onMouseEnter={() => handleHover(index)}
      onMouseLeave={handleUnHover}
      width={`208px`}
      height="108px"
      // onClick={() => handleClick(item)}
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Image
        src={getImageSrc(data.media, img)}
        alt={`img-${data.media}`}
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
        }}
      >
        {data.name}
      </Text>
    </Stack>
  );
};

export default memo(CardGenres);
