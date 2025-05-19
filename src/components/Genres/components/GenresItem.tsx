/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Image, Text } from "@components/shared";
import { Stack } from "@mui/material";
import { ListGame, useGame, useGameReducers, useGetGameId } from "@store/game";
import React, { memo, useEffect, useRef, useState } from "react";
import { setToken } from "@api/helpers";
import axios from "axios";
import { useRouter } from "next/navigation";
import GetIcon from "@components/Games/components/GetIcon";
import { useGallery } from "@store/media";
import useBreakpoint from "@hooks/useBreakpoint";
import useWindowSize from "@hooks/useWindowSize";
import { palette } from "public/material";

interface Props {
  img: any | null;
  hover: boolean;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  id: number | null;
}

const GenresFull = ({ img, hover, setHover, setId, id }: Props) => {
  const { data } = useGame();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useWindowSize();
  const [height, setHeight] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (!containerRef.current) return;
    setHeight(
      containerRef.current?.offsetHeight
        ? containerRef.current?.offsetHeight * 1.5
        : undefined,
    );
  }, [width]);
  const { isSmSmaller } = useBreakpoint();
  // useEffect(() => {
  //   const arr = getIcon(item.support_os) ?? [];
  //   setDataSupportOs(arr);
  // }, [item]);
  const route = useRouter();
  const handleClick = (value: number) => {
    // getGameId(value);
    // console.log(value);
    // route.push(`/games/${value}`);
    // setOpen(true);
  };
  // useEffect(() => {
  //   if (status) {
  //     setOpen(true);
  //   }
  //   console.log("status of status", status);
  // }, [status]);

  return (
    <>
      {data.map((item, index) => {
        return (
          <Stack
            key={index}
            position={"relative"}
            p={"6px"}
            borderRadius={"16px"}
            bgcolor={"#2456"}
            gap={2}
            border={`1px solid ${palette.colorItemGame?.border}`}
            sx={{
              transition: "translate 0.2s ease-in-out",
              "&:hover": {
                translate: "0 -6px",
                cursor: "pointer",
              },
            }}
            direction={isSmSmaller ? "row" : "column"}
            justifyContent={"space-between"}
            onMouseEnter={() => {
              setHover(true);
              setId(index);
            }}
            onMouseLeave={() => {
              setHover(false);
              setId(null);
            }}
            onClick={() => handleClick(item.id)}
          >
            <Stack
              height={isSmSmaller ? "100%" : undefined}
              ref={isSmSmaller ? containerRef : undefined}
              p={"6px"}
            >
              <Image
                src={item.media[0] ? item.media[0].url : img}
                alt={`img-${img}`}
                size="100%"
                aspectRatio={3 / 2}
                sizes={`${height}px`}
                containerProps={{
                  sx: {
                    width: `${height}px`,
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "16px",

                    border: "1px",
                    borderColor: palette.borderColorLinear,
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

            {isSmSmaller ? (
              <Stack justifyContent={"space-between"} width={"100%"}>
                <Stack py="0.5rem" gap={1} alignItems={"start"}>
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
                {/* footer */}
                <Stack
                  py="2px"
                  sx={{
                    borderBottomRightRadius: "12px",
                    background: palette.colorItemGame?.borderLinear,
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
            ) : (
              <>
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
              </>
            )}
          </Stack>
        );
      })}
    </>
  );
};

export default memo(GenresFull);
