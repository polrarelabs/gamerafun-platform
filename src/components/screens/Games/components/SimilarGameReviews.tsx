"use client";

import { Box, IconButton, Stack } from "@mui/material";
import { useGame } from "@store/game";
import { animate, useMotionValue, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Image, Text } from "@components/shared";
import img from "/public/images/img-logo.png";
import { palette } from "public/material";
const SimilarGameReviews = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const IMG_WIDTH = 330;
  const STEP = IMG_WIDTH + 16;
  const { dataListGame: data, fetchGetGame, dataGetGameId } = useGame();
  const [hover, setHover] = useState<boolean>(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  useEffect(() => {
    if (dataGetGameId?.genre && dataGetGameId.genre.length > 0) {
      fetchGetGame({ genre: [dataGetGameId.genre[0]] });
    }
  }, []);
  const handleScroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const step = direction === "left" ? STEP : -STEP;
    const newX = x.get() + step;

    const maxScroll = -(track.scrollWidth - container.offsetWidth);
    const clampedX = Math.max(Math.min(newX, 0), maxScroll);

    animate(x, clampedX, {
      type: "tween",
      duration: 0.35,
      ease: "easeInOut",
    });
  };
  return (
    <>
      <Text variant={"h3"}>Similar Game Reviews</Text>
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={2}
        width={"90%"}
        mx={"auto"}
      >
        <Stack
          direction="row"
          overflow="hidden"
          flex={1}
          ref={containerRef}
          sx={{ position: "relative" }}
        >
          <Box
            width={"56px"}
            height={"56px"}
            sx={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => handleScroll("left")}
              sx={{
                position: "absolute",
                top: "50%",
                left: 25,
                translate: "-50% -50%",
                zIndex: 1,
                color: "black",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Box>
          <Box
            width={"56px"}
            height={"56px"}
            sx={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => handleScroll("right")}
              sx={{
                position: "absolute",
                top: "50%",
                right: 0,
                translate: "0% -50%",
                zIndex: 1,
                color: "black",
                transform: "rotate(180deg)",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Box>
          <motion.div
            ref={trackRef}
            style={{ x, display: "flex", gap: "16px" }}
            drag="x"
            dragConstraints={false}
            onDragEnd={(_event, info) => {
              if (info.offset.x > 50) {
                handleScroll("left");
              } else if (info.offset.x < -50) {
                handleScroll("right");
              }
            }}
          >
            {data?.map((item, index) => {
              return (
                <Stack
                  key={index}
                  width={`${IMG_WIDTH}px`}
                  position={"relative"}
                  p={"6px"}
                  borderRadius={"16px"}
                  gap={"16px"}
                  border={`1px solid ${palette.colorGray}`}
                  sx={{
                    borderColor: palette.bgColorLinearOrigin,
                    transition: "translate 0.2s ease-in-out",
                    "&:hover": {
                      translate: "0 -6px",
                      cursor: "pointer",
                    },
                  }}
                  direction={"column"}
                  justifyContent={"space-between"}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                >
                  <Stack direction={"column"} gap={2}>
                    <Stack>
                      <Image
                        src={item.media[0] ? item.media[0].url : img}
                        alt={`img-${img}`}
                        size="100%"
                        aspectRatio={3 / 2}
                        sizes="960px"
                        containerProps={{
                          sx: {
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                            borderRadius: "16px",

                            border: "1px",
                            borderColor: palette.borderColorLinear,
                            "& img": {
                              objectFit: "cover",
                              objectPosition: "center",
                              transition: "all 0.5s ease-in-out",
                            },
                          },
                        }}
                      />
                    </Stack>
                    <Stack py="0.5rem" gap={1}>
                      <Text
                        fontSize={"18px"}
                        color="white"
                        textAlign={"center"}
                        fontWeight={700}
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 3,
                        }}
                      >
                        {item.name + "Review"}
                      </Text>
                      <Text
                        color={palette.colorGray}
                        fontSize={"12px"}
                        textAlign={"center"}
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 3,
                        }}
                      >
                        {item.description ? item.description : "description"}
                      </Text>
                    </Stack>
                  </Stack>
                  <Box></Box>
                </Stack>
              );
            })}
          </motion.div>
        </Stack>
      </Stack>
    </>
  );
};

export default SimilarGameReviews;
