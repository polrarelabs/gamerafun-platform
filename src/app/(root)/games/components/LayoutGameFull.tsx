/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Image, Text } from "@components/shared";
import { Stack } from "@mui/material";
import {
  ListGame,
  useGallery,
  useGame,
  useGameReducers,
  useGetGameId,
} from "@store/game";
import React, { memo, useEffect, useState } from "react";
import ModalUpdateGame from "./ModalUpdateGame";
import { setToken } from "@api/helpers";
import axios from "axios";
import GetIcon from "./GetIcon";
import { useRouter } from "next/navigation";

interface Props {
  img: any | null;
  hover: boolean;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  id: number | null;
}

const LayoutGameFull = ({ img, hover, setHover, setId, id }: Props) => {
  const { data, fetchGetGame } = useGame();
  const { isGetGameId, setGetGameId } = useGameReducers();
  const [open, setOpen] = useState<boolean>(false);
  const { resetGallery } = useGallery();
  const onClose = () => {
    setOpen(false);
    resetGallery();
  };

  const { getGameId, status, setStatusGet } = useGetGameId();

  // useEffect(() => {
  //   const arr = getIcon(item.support_os) ?? [];
  //   setDataSupportOs(arr);
  // }, [item]);
  const route = useRouter();
  const handleClick = (value: number) => {
    getGameId(value);
    console.log(value);
    route.push(`/games/${value}`);
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
            border={"1px solid rgba(156, 163, 175, 0.39)"}
            sx={{
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
              setId(index);
            }}
            onMouseLeave={() => {
              setHover(false);
              setId(null);
            }}
            onClick={() => handleClick(item.id)}
          >
            <Stack direction={"column"} gap={2}>
              <Stack>
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

                      border: "1px",
                      borderColor:
                        "linear-gradient(180deg,rgba(189, 189, 189, 1) 0%, rgba(87, 87, 87, 0.5) 100%)",
                      "& img": {
                        objectFit: hover && id === index ? "cover" : "fill",
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
                <Text color="#9CA3AF" fontSize={"12px"} textAlign={"center"}>
                  {item.description ? item.description : "description"}
                </Text>
                <GetIcon array={item.support_os} />
              </Stack>
            </Stack>

            <Stack
              bgcolor={"#4B556380"}
              py="2px"
              sx={{
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
              }}
            >
              <Text color="#D1D5D8" fontSize={"12px"} textAlign={"center"}>
                Title
              </Text>
            </Stack>
          </Stack>
        );
      })}
      {/* <ModalUpdateGame open={open} setOpen={setOpen} onClose={onClose} /> */}
    </>
  );
};

export default LayoutGameFull;
