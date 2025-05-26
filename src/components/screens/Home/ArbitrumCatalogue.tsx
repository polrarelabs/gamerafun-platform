"use client";

import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import img from "public/images/banner.webp";
import { Image, Text } from "@components/shared";

const DATA = [
  {
    label: "Outlast, Outsmart, Outplay",
    description: "Prove your skills",
    image: img,
  },
  {
    label: "Craft NFT Weapons",
    description: "Design and build",
    image: img,
  },
  {
    label: "Survive the Arena",
    description: "Only the strongest",
    image: img,
  },
  {
    label: "Upgrade & Customize",
    description: "Personalize your",
    image: img,
  },
  {
    label: "Craft NFT Weapons",
    description: "Design and build",
    image: img,
  },
  {
    label: "Upgrade & Customize",
    description: "Personalize your",
    image: img,
  },
  {
    label: "Craft NFT Weapons",
    description: "Design and build",
    image: img,
  },
];

const ArbitrumCatalogue = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [slideIndex, setSlideIndex] = useState<number>(0);

  const maxIndex = DATA.length;

  const onChangeSlideIndex = (type: "prev" | "next") => () => {
    setSlideIndex((prev) => {
      if (type === "prev") return (prev - 1 + maxIndex) % maxIndex;
      return (prev + 1) % maxIndex;
    });
  };

  return (
    <Stack
      component={motion.section}
      direction="row"
      alignItems="center"
      ref={ref}
      maxWidth="100vw"
      width={"100%"}
      overflow="hidden"
      position="relative"
      gap={3}
      px="20px"
      justifyContent={"center"}
    >
      {DATA.map((item, index) => {
        return (
          <Stack
            key={index}
            height={"309px"}
            sx={{
              aspectRatio: 3 / 4,
              backgroundColor: "#111827",
              borderRadius: "15px",
              border: "1px solid rgba(229, 231, 235, 0.39)",
            }}
            direction={"column"}
            gap={4}
          >
            <Stack>
              <Image
                src={item.image}
                alt={`${item.image}+${item.label}`}
                aspectRatio={3 / 4}
                containerProps={{
                  sx: {
                    "& img": {
                      objectFit: "cover",
                      objectPosition: "center",
                    },
                  },
                }}
              />
            </Stack>
            <Stack>
              <Text color="white" fontWeight={700} fontSize={"1.1rem"}>
                {item.label}
              </Text>
              <Text color="#9CA3AF" fontWeight={400} fontSize={"1.1rem"}>
                {item.description}
              </Text>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default ArbitrumCatalogue;
