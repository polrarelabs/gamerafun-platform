/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Image, Text } from "@components/shared";
import useWindowSize from "@hooks/useWindowSize";
import { Stack } from "@mui/material";
import { useGame, useGameReducers, useGetGameId } from "@store/game";
import React, { memo, useEffect, useRef, useState } from "react";
import GetIcon from "./GetIcon";
import { useGallery } from "@store/media";

interface Props {
  img: any | null;
  hover: boolean;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  id: number | null;
}

const ItemGameRow = ({ img, hover, setHover, setId, id }: Props) => {
  const [dataSupportOs, setDataSupportOs] = useState<string[]>([]);

  // useEffect(() => {
  //   const arr = getIcon(item.support_os) ?? [];
  //   setDataSupportOs(arr);
  // }, [item]);  const { data, fetchGetGame } = useGame();
  const { isGetGameId, setGetGameId } = useGameReducers();
  const [open, setOpen] = useState<boolean>(false);
  const { resetGallery } = useGallery();
  const onClose = () => {
    setOpen(false);
    resetGallery();
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useWindowSize();
  const [height, setHeight] = useState<number | undefined>(undefined);
  const { getGameId, status, setStatusGet } = useGetGameId();
  const { data, fetchGetGame } = useGame();

  useEffect(() => {
    if (!containerRef.current) return;
    setHeight(
      containerRef.current?.offsetHeight
        ? containerRef.current?.offsetHeight * 1.5
        : undefined,
    );
  }, [width]);

  const handleClick = (value: number) => {
    getGameId(value);
    // setOpen(true);
  };
  useEffect(() => {
    if (status) {
      setOpen(true);
    }
    console.log("status of status", status);
  }, [status]);

  return (
    <>
      {data.map((item, index) => {
        return (
          <Stack
            key={index}
            position={"relative"}
            borderRadius={"16px"}
            bgcolor={"#2456"}
            gap={2}
            border={"1px solid rgba(156, 163, 175, 0.39)"}
            sx={{
              transition: "translate 0.2s ease-in-out",
              "&:hover": {
                translate: "0 -6px",
                cursor: "pointer",
              },
            }}
            direction={"row"}
            alignItems={"center"}
            // justifyContent={"space-between"}
            onMouseEnter={() => {
              setHover(true);
              setId(index);
            }}
            onMouseLeave={() => {
              setHover(false);
              setId(null);
            }}
          >
            <Stack height={"100%"} ref={containerRef} p={"6px"}>
              <Image
                src={img}
                alt={`img-${img}`}
                size="100%"
                aspectRatio={7 / 4}
                sizes={`${height}px`}
                containerProps={{
                  sx: {
                    width: `${height}px`,
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "16px",

                    border: "1px",
                    borderColor:
                      "linear-gradient(180deg,rgba(189, 189, 189, 1) 0%, rgba(87, 87, 87, 0.5) 100%)",
                    "& img": {
                      // objectFit: hover && id === index ? "cover" : "fill",
                      objectFit: "cover",
                      objectPosition: "center",
                      transition: "all 0.5s ease-in-out",
                    },
                  },
                }}
              />
            </Stack>
            <Stack gap={1} width={"100%"}>
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
              <Text color="#9CA3AF" fontSize={"12px"} textAlign={"center"}>
                {item.description ? item.description : "description"}
              </Text>
              <GetIcon array={item.support_os} />
              <Stack
                py="2px"
                sx={{
                  borderBottomRightRadius: "12px",
                  background:
                    "linear-gradient(90deg,rgba(24, 37, 44, 1) 0%,rgba(24, 37, 44, 1) 10%, rgba(75, 85, 99, 0.68) 100%)",
                }}
              >
                <Text color="#D1D5D8" fontSize={"12px"} textAlign={"center"}>
                  Title
                </Text>
              </Stack>
            </Stack>
          </Stack>
        );
      })}
    </>
  );
};

export default memo(ItemGameRow);
