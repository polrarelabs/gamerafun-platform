"use client";

import { Image, Text } from "@components/shared";
import { Stack } from "@mui/material";
import React, { memo, useRef } from "react";
import img from "public/images/img-local.png";
import { getImageSrc } from "@components/helper";
import { palette } from "public/material";
import { useMotionValue, useTransform, motion } from "framer-motion";

const CardRewards = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-1, 1], [15, -15]);
  const rotateY = useTransform(x, [-1, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const offsetX = (px - centerX) / centerX;
    const offsetY = (py - centerY) / centerY;

    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <Stack
        p={"4px"}
        border={`1px solid ${palette.colorItemGame?.border}`}
        borderRadius={"12px"}
        sx={{
          transition: "transform 0.2s ease-in-out",
          willChange: "transform",
        }}
      >
        <Stack>
          <Image
            src={getImageSrc("1", img)}
            alt={`img-${img}`}
            size={"100%"}
            aspectRatio={2 / 2}
            sizes={"414px"}
            draggable={false}
            containerProps={{
              sx: {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "12px",
                border: "1px",
                borderColor: palette.borderColorLinear,
                "& img": {
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "all 0.3s ease-in-out",
                },
              },
            }}
          />
        </Stack>
        <Stack alignItems={"center"} justifyContent={"center"} py={2}>
          <Text
            color={palette.textWhite}
            fontSize={"16px"}
            textAlign={"center"}
            fontWeight={700}
          >
            1.000 XP
          </Text>
          <Text
            color={palette.colorGray}
            fontSize={"12px"}
            textTransform={"uppercase"}
            textAlign={"center"}
            fontWeight={700}
          >
            platform points
          </Text>
        </Stack>
      </Stack>
    </motion.div>
  );
};

export default memo(CardRewards);
