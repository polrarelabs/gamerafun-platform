"use client";

import { Box, Stack } from "@mui/material";
import { palette } from "public/material";
import React, { memo } from "react";
import Image from "./Image";
import img from "public/images/img-local.webp";
import { getImageSrc } from "@components/helper";
import { StaticImageData } from "next/image";

interface BackgroundImageProps {
  url: string | StaticImageData;
}

const BackgroundImage = ({ url }: BackgroundImageProps) => {
  return (
    <Stack zIndex={2}>
      <Stack
        position={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        zIndex={2}
        sx={{
          background: palette.colorGame?.bgLinear,
          opacity: 1,
        }}
      />
      <Stack
        position={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        zIndex={1}
      >
        <Image
          src={typeof url === "string" ? getImageSrc(url, img) : url}
          alt={`img-`}
          size="100%"
          aspectRatio={3 / 2}
          sizes={`1920px`}
          containerProps={{
            sx: {
              width: `100%`,
              height: "100%",
              overflow: "hidden",
              opacity: 0.2,
              border: "1px",
              borderColor: palette.borderColorLinear,
              "& img": {
                objectFit: "cover",
                objectPosition: "center",
              },
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            background: palette.colorGame?.colorBgLineaer1,
            zIndex: 2,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default memo(BackgroundImage);
