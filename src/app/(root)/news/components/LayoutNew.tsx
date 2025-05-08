"use client";

import { Image, Text } from "@components/shared";
import { Stack, useMediaQuery } from "@mui/material";
import React, { memo, useRef } from "react";
import img from "public/images/cover-seo.jpg";
import { useTheme } from "@mui/material/styles";
import { animate, motion, useMotionValue } from "framer-motion";

const LayoutNew = () => {
  const theme = useTheme();
  const isLayoutMD = useMediaQuery(theme.breakpoints.up("md"));

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const ITEM_WIDTH = 400;
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
    <>
      {isLayoutMD ? (
        <Stack direction={"column"} gap={3}>
          <Stack direction={"row"} gap={3}>
            <Stack flex={2} position={"relative"}>
              <Image
                src={img}
                alt={`img-${img}`}
                size="100%"
                aspectRatio={7 / 3}
                sizes="960px"
                containerProps={{
                  sx: {
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "16px",
                    border: "1px",
                    borderColor:
                      "linear-gradient(180deg,rgba(189, 189, 189, 1) 0%, rgba(87, 87, 87, 0.5) 100%)",
                    "& img": {
                      objectFit: "cover",
                      objectPosition: "center",
                    },
                  },
                }}
              />
              <Stack
                position={"absolute"}
                bottom={0}
                p={4}
                direction={"column"}
              >
                <Text color="white" fontWeight={700} fontSize={"20px"}>
                  News
                </Text>
                <Text color="#9ca3af" fontWeight={400} fontSize={"14px"}>
                  Stay on top of the latest blockchain gaming news and enjoy
                  exclusive interviews and informative web3 gaming opinion
                  pieces.
                </Text>
              </Stack>
            </Stack>

            <Stack flex={1} position={"relative"}>
              <Image
                src={img}
                alt={`img-${img}`}
                size="100%"
                aspectRatio={7 / 3}
                sizes="960px"
                containerProps={{
                  sx: {
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "16px",
                    "& img": { objectFit: "cover", objectPosition: "center" },
                  },
                }}
              />
              <Stack
                position={"absolute"}
                bottom={0}
                p={4}
                direction={"column"}
              >
                <Text color="white" fontWeight={700} fontSize={"20px"}>
                  News
                </Text>
                <Text color="#9ca3af" fontWeight={400} fontSize={"14px"}>
                  Stay on top of the latest blockchain gaming news and enjoy
                  exclusive interviews and informative web3 gaming opinion
                  pieces.
                </Text>
              </Stack>
            </Stack>
          </Stack>

          <Stack direction={"row"} gap={3}>
            <Stack flex={1} position={"relative"} gap={2}>
              <Image
                src={img}
                alt={`img-${img}`}
                size="100%"
                aspectRatio={3 / 1.5}
                sizes="960px"
                containerProps={{
                  sx: {
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "16px",
                    "& img": { objectFit: "cover", objectPosition: "center" },
                  },
                }}
              />
              <Text color="white" fontWeight={700} fontSize={"20px"}>
                News
              </Text>
            </Stack>
            <Stack flex={1} position={"relative"} gap={2}>
              <Image
                src={img}
                alt={`img-${img}`}
                size="100%"
                aspectRatio={3 / 1.5}
                sizes="960px"
                containerProps={{
                  sx: {
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "16px",
                    "& img": { objectFit: "cover", objectPosition: "center" },
                  },
                }}
              />
              <Text color="white" fontWeight={700} fontSize={"20px"}>
                News
              </Text>
            </Stack>
            <Stack flex={1} position={"relative"} gap={2}>
              <Image
                src={img}
                alt={`img-${img}`}
                size="100%"
                aspectRatio={3 / 1.5}
                sizes="960px"
                containerProps={{
                  sx: {
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "16px",
                    "& img": { objectFit: "cover", objectPosition: "center" },
                  },
                }}
              />
              <Text color="white" fontWeight={700} fontSize={"20px"}>
                News
              </Text>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" gap={1}>
          <Stack
            direction="row"
            overflow="hidden"
            flex={1}
            ref={containerRef}
            sx={{ position: "relative" }}
          >
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
              {arrKeys.map((item, index) => (
                <Stack
                  key={index}
                  width={`${ITEM_WIDTH}px`}
                  position="relative"
                  flexShrink={0}
                  sx={{
                    borderRadius: "6px",
                    opacity: 0.7,
                    "&:hover": {
                      opacity: 1,
                      cursor: "pointer",
                    },
                  }}
                >
                  <Image
                    src={img}
                    alt={`img-${img}`}
                    size="100%"
                    aspectRatio={7 / 4}
                    sizes="960px"
                    containerProps={{
                      sx: {
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        borderRadius: "16px",
                        "& img": {
                          objectFit: "cover",
                          objectPosition: "center",
                        },
                        pointerEvents: "none",
                      },
                    }}
                  />
                  <Text color="white" fontWeight={700} fontSize={"20px"}>
                    {item.name}
                  </Text>
                </Stack>
              ))}
            </motion.div>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default memo(LayoutNew);

const arrKeys = [
  {
    imgs: img,
    name: "News",
    description:
      "Stay on top of the latest blockchain gaming news and enjoy exclusive interviews and informative web3 gaming opinion pieces.",
  },
  {
    imgs: img,
    name: "News",
    description:
      "Stay on top of the latest blockchain gaming news and enjoy exclusive interviews and informative web3 gaming opinion pieces.",
  },
  {
    imgs: img,
    name: "News",
    description:
      "Stay on top of the latest blockchain gaming news and enjoy exclusive interviews and informative web3 gaming opinion pieces.",
  },
  {
    imgs: img,
    name: "News",
    description:
      "Stay on top of the latest blockchain gaming news and enjoy exclusive interviews and informative web3 gaming opinion pieces.",
  },
  {
    imgs: img,
    name: "News",
    description:
      "Stay on top of the latest blockchain gaming news and enjoy exclusive interviews and informative web3 gaming opinion pieces.",
  },
];
