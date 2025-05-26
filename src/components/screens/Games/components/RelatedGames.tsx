"use client";

import { IconButton, Stack } from "@mui/material";
import { useGame } from "@store/game";
import GetIcon from "./GetIcon";
import { Image, Text } from "@components/shared";
import { motion, useMotionValue, animate } from "framer-motion";
import img from "public/images/img-logo.png";
import { memo, useEffect, useRef } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { palette } from "public/material";

const RelatedGames = () => {
  const { dataListGame: data, fetchGetGame, dataGetGameId } = useGame();
  // const [hover, setHover] = useState<boolean>(false);
  // useEffect(() => {
  //   if (dataGetGameId?.genre && dataGetGameId.genre.length > 0) {
  //     fetchGetGame({ genre: dataGetGameId.genre });
  //   }
  // }, []);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  const ITEM_WIDTH = 220;
  const STEP = ITEM_WIDTH + 16;

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
    <Stack direction={"row"} alignItems={"center"} gap={2}>
      <Stack
        direction="row"
        overflow="hidden"
        flex={1}
        ref={containerRef}
        sx={{ position: "relative" }}
      >
        <IconButton
          onClick={() => handleScroll("left")}
          sx={{
            position: "absolute",
            top: "50%",
            left: 25,
            translate: "-50% -50%",
            zIndex: 1,
            color: palette.colorGray,
            "&:hover": {
              color: "white",
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={() => handleScroll("right")}
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            translate: "0 -50%",
            zIndex: 1,
            color: palette.colorGray,
            transform: "rotate(180deg)",
            "&:hover": {
              color: "white",
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <motion.div
          ref={trackRef}
          style={{ x, display: "flex", gap: `16px` }}
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
                width={`${ITEM_WIDTH}px`}
                position={"relative"}
                p={"6px"}
                borderRadius={"16px"}
                bgcolor={palette.colorRelate?.bgColor}
                gap={2}
                border={`1px solid ${palette.colorGray}`}
                sx={{
                  transition: "translate 0.2s ease-in-out",
                  "&:hover": {
                    translate: "0 -6px",
                    cursor: "pointer",
                  },
                }}
                direction={"column"}
                justifyContent={"space-between"}
                // onMouseEnter={() => {
                //   setHover(true);
                // }}
                // onMouseLeave={() => {
                //   setHover(false);
                // }}
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
                        WebkitLineClamp: 1,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      color={palette.colorGray}
                      fontSize={"12px"}
                      textAlign={"center"}
                    >
                      {item.description ? item.description : "description"}
                    </Text>
                    <GetIcon array={item.support_os} />
                  </Stack>
                </Stack>

                <Stack
                  bgcolor={palette.colorItemGame?.borderTitle}
                  py="2px"
                  sx={{
                    borderBottomLeftRadius: "12px",
                    borderBottomRightRadius: "12px",
                  }}
                >
                  <Text
                    color={palette.colorItemGame?.colorText}
                    fontSize={"12px"}
                    textAlign={"center"}
                  >
                    Title
                  </Text>
                </Stack>
              </Stack>
            );
          })}
        </motion.div>
      </Stack>
    </Stack>
  );
};

export default memo(RelatedGames);
