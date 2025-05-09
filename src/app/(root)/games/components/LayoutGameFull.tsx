/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Image, Text } from "@components/shared";
import { Stack } from "@mui/material";
import { ListGame, useGameReducers } from "@store/game";
import React, { memo, useEffect, useState } from "react";
import ModalUpdateGame from "./ModalUpdateGame";
import { setToken } from "@api/helpers";
import axios from "axios";

interface Props {
  index: number;
  img: any | null;
  hover: boolean;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  id: number | null;
  item: ListGame;
  getIcon: (array: string[]) => void;
}

const LayoutGameFull = ({
  index,
  img,
  hover,
  setHover,
  setId,
  id,
  item,
  getIcon,
}: Props) => {
  const [dataSupportOs, setDataSupportOs] = useState<string[]>([]);
  const { setGameID } = useGameReducers();
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);

  const handleUpdate = async () => {
    try {
      const response = await axios.post(
        "https://web3-common-service.polrare.co/api/auth/auth",
        {
          userName: "gamera_admin",
          password: "@12345",
        },
      );

      if (response) {
        const token = response.data.accessToken;
        setToken(token);
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    const arr = getIcon(item.support_os) ?? [];
    setDataSupportOs(arr);
  }, [item]);

  const handleClick = (value: number) => {
    setGameID(value);
    setOpenUpdate(true);
    handleUpdate();
  };

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
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={{ md: 2, xs: 1 }}
            justifyContent={"center"}
          >
            {dataSupportOs.map((icon, index) => {
              return (
                <Stack
                  key={index}
                  direction={"row"}
                  alignItems={"center"}
                  fontSize={16}
                  color={"#9CA3AF"}
                  justifyContent={"center"}
                >
                  {icon}
                </Stack>
              );
            })}
          </Stack>
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

      <ModalUpdateGame open={openUpdate} setOpen={setOpenUpdate} />
    </Stack>
  );
};

export default memo(LayoutGameFull);
