"use client";

import { Box, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import bgSlider from "public/images/Riftstorm_banner1_b0eb3c12c2.webp";
import { Button, Image, Text } from "@components/shared";
import { motion } from "framer-motion";
import useBreakpoint from "@hooks/useBreakpoint";

const DATA = [
  {
    img: bgSlider,
    title: "banner 1",
  },
  {
    img: bgSlider,
    title: "banner 2",
  },
  {
    img: bgSlider,
    title: "banner 3",
  },
  {
    img: bgSlider,
    title: "banner 4",
  },
  {
    img: bgSlider,
    title: "banner 5",
  },
];

const Carousel = () => {
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

  //   useEffect(() => {
  //     slider.current = setInterval(onChangeSlideIndex("next"), 5000);
  //     return () => {
  //       if (slider.current) {
  //         clearInterval(slider.current);
  //       }
  //     };
  //   }, []);

  const handleClickImage = (index: number) => {
    setCurrentIndex(index);
    if (slider.current) {
      clearInterval(slider.current);
      slider.current = setInterval(onChangeSlideIndex("next"), 5000);
    }
  };

  const handleClickPrev = (index: number) => {
    setCurrentIndex((index) => (index === 0 ? DATA.length - 1 : index - 1));
  };

  const handleClickNext = (index: number) => {
    setCurrentIndex((index) => (index === DATA.length - 1 ? 0 : index + 1));
  };

  return (
    <>
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
        <Box position={"absolute"} width="100%" height="100%" top={0} left={0}>
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
              my={30}
              mx={4}
              direction="row"
              width={"90%"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                size={"large"}
                onClick={() => handleClickPrev(currentIndex)}
              >
                {"<"}
              </Button>
              <Button
                size={"large"}
                onClick={() => handleClickNext(currentIndex)}
              >
                {">"}
              </Button>
              {/* <Text color="white" fontWeight={700} fontSize={"36px"}>
              {DATA[currentIndex].title}
            </Text>
            <Text color="#FFFFFFB2" fontWeight={400} fontSize={"16px"}>
              {DATA[currentIndex].title}
            </Text> */}
              {/* <Stack direction={"row"} gap={2}>
              <Button
                variant="contained"
                sx={{
                  background: "white !important",
                  borderRadius: "0.75rem !important",
                  padding: "8px 16px !important",
                }}
              >
                <Text color="black" fontSize={"16px"} fontWeight={400}>
                  View Game
                </Text>
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "#374151F2 !important",
                  borderRadius: "0.75rem !important",
                  padding: "8px 16px !important",
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
      </Stack>
      {isLoaded && (
        <>
          {!isMdSmaller && (
            <Stack
              //   position={"absolute"}
              //   bottom={0}
              //   right={0}
              //   width={"100%"}
              direction={"row"}
              gap={2}
              m={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
              // py={2}
            >
              {DATA.map((item, index) => {
                return (
                  <Stack
                    key={index}
                    width={"18%"}
                    height={"auto"}
                    borderRadius={"6px"}
                    border={"1px solid white"}
                    // position={"relative"}
                    onClick={() => handleClickImage(index)}
                    sx={{
                      boxShadow:
                        index === currentIndex
                          ? "0 0 0 3px #f9fafb , 0 0 18px 4px #f9fafb"
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
                          //   position: "absolute",
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
    </>
  );
};

export default Carousel;

const ASPECT_RATIO = { xs: 4 / 2, md: 1000 / 600, lg: 1920 / 800 };

/* box-shadow: 0 0 0 3px  #f9fafb, 0 0 18px 4px  #f9fafb; */
