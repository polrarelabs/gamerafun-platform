"use client";

import { Image, Text } from "@components/shared";
import useBreakpoint from "@hooks/useBreakpoint";
import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { palette } from "public/material";
import { useEffect, useRef, useState } from "react";
import ThumbNail from "./ThumbNail";
import { DATA } from "./helper";

const Banner = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { isMdSmaller } = useBreakpoint();

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <Stack
      component={motion.section}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      whileHover="hover"
      ref={ref}
      maxWidth="100vw"
      width={"100%"}
      overflow="hidden"
      position="relative"
      sx={{
        aspectRatio: ASPECT_RATIO,
      }}
    >
      <Box position="absolute" width="100%" height="100%" top={0} left={0}>
        <Image
          src={DATA[currentIndex].img}
          alt={`${DATA[currentIndex].img}+${DATA[currentIndex].title}`}
          size="1920px"
          aspectRatio={ASPECT_RATIO}
          containerProps={{
            sx: {
              "& img": {
                objectFit: "cover",
                objectPosition: "center",
              },
            },
            component: motion.div,
            key: currentIndex,
            initial: { x: "100%" },
            animate: { x: 0, transition: { duration: 0.5 } },
          }}
        />
        {isLoaded && (
          <Stack
            position={"absolute"}
            bottom={0}
            component={motion.div}
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration: 0.5 } }}
            key={currentIndex}
            gap={2}
            my={16}
            mx={8}
          >
            <Text color="white" fontWeight={700} fontSize={"36px"}>
              {DATA[currentIndex].title}
            </Text>
            <Text
              color={palette.colorBanner?.bgColorWhite}
              fontWeight={400}
              fontSize={"16px"}
            >
              {DATA[currentIndex].title}
            </Text>
            {/* <ButtonBanner /> */}
          </Stack>
        )}
      </Box>

      {isLoaded && !isMdSmaller && (
        <ThumbNail
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </Stack>
  );
};

export default Banner;

const ASPECT_RATIO = { xs: 4 / 2, md: 1000 / 600, lg: 1920 / 800 };
