"use client";

import { Button, Image, Text } from "@components/shared";
import useBreakpoint from "@hooks/useBreakpoint";
import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { palette } from "public/material";
import { useEffect, useRef, useState } from "react";
import image1 from "public/images/img-login.webp";
import image2 from "public/images/img-local.webp";

const DATA = [
  {
    img: image1,
    title: "banner 1",
  },
  {
    img: image2,
    title: "banner 2",
  },
  {
    img: image1,
    title: "banner 3",
  },
  {
    img: image2,
    title: "banner 4",
  },
  {
    img: image1,
    title: "banner 5",
  },
];

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

  const slider = useRef<NodeJS.Timeout | null>(null);

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
            {/* <Stack direction={"row"} gap={2}>
              <Button
                variant="contained"
                sx={{
                  background: "white !important",
                  borderRadius: "0.75rem !important",
                  padding: "8px 16px !important",
                  "&:hover": {
                    background: `${palette.colorGray} !important`,
                  },
                }}
              >
                <Text color="black" fontSize={"16px"} fontWeight={400}>
                  View Game
                </Text>
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: `${palette.colorBanner?.bgColor} !important`,
                  borderRadius: "0.75rem !important",
                  padding: "8px 16px !important",
                  "&:hover": {
                    background: `${palette.colorBanner?.bgColorHover} !important`,
                  },
                }}
              >
                <Text color="white" fontSize={"16px"} fontWeight={400}>
                  Add to favorites
                </Text>
              </Button>
            </Stack> */}
          </Stack>
        )}
      </Box>

      {isLoaded && (
        <>
          {!isMdSmaller && (
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
          )}
        </>
      )}
    </Stack>
  );
};

export default Banner;

const ASPECT_RATIO = { xs: 4 / 2, md: 1000 / 600, lg: 1920 / 800 };
