/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { memo, useEffect } from "react";
import { Text } from "@components/shared";
import { Skeleton, Stack } from "@mui/material";
import { useGame, useGameReducers } from "@store/game";
import CloseIcon from "@icons/CloseIcon";
import WindowsIcon from "@icons/WindowsIcon";
import MacIcon from "@icons/MacIcon";
import WebsiteIcon from "@icons/WebsiteIcon";
import AndroidIcon from "@icons/AndroidIcon";
import IosIcon from "@icons/IosIcon";
import GameIcon from "@icons/GameIcon";

const BrowserGame = () => {
  const { setEditorRating, setUserRating, valueEditorRating, valueUserRating } =
    useGameReducers();

  const { error, loading, data, fetchGetGame } = useGame();

  useEffect(() => {
    fetchGetGame();
  }, []);

  const getIcon = (array: string[]) => {
    const arrayNew: any[] = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "WINDOWS") arrayNew.push(<WindowsIcon />);
      else if (array[i] === "MAC") arrayNew.push(<MacIcon />);
      else if (array[i] === "WEB") arrayNew.push(<WebsiteIcon />);
      else if (array[i] === "ANDROID") arrayNew.push(<AndroidIcon />);
      else if (array[i] === "IOS") arrayNew.push(<IosIcon />);
    }
    return arrayNew;
  };

  return (
    <>
      {loading ? (
        <Stack display={"grid"} gridTemplateColumns={"repeat(6, 1fr)"} gap={2}>
          {Array.from({ length: 12 }).map((_, index) => {
            return (
              <Stack
                key={index}
                p={"6px"}
                borderRadius={"16px"}
                bgcolor={"#2456"}
                gap={2}
                border={"1px solid rgba(156, 163, 175, 0.39)"}
              >
                <Skeleton
                  variant="rounded"
                  width={215}
                  height={215}
                  sx={{ zIndex: 12 }}
                />
                <Stack py="0.5rem">
                  <Text
                    fontSize={"18px"}
                    color="white"
                    textAlign={"center"}
                    fontWeight={700}
                  >
                    Title
                  </Text>
                  <Text color="#9CA3AF" fontSize={"12px"} textAlign={"center"}>
                    Title
                  </Text>
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
        </Stack>
      ) : (
        <Stack direction={"column"} gap={2} flex={5}>
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <GameIcon sx={{ color: "#9CA3AF" }} />
            <Stack direction={"row"} alignItems={"end"} gap={2}>
              <Text color="white" fontSize={"20px"} fontWeight={700}>
                Browse Games
              </Text>
              <Text color="#9CA3AF" fontSize={"14px"} fontWeight={400}>
                {data.length} results
              </Text>
            </Stack>
          </Stack>
          <Stack direction={"row"} gap={2}>
            {valueEditorRating !== 0 && (
              <Stack
                direction={"row"}
                gap={1}
                alignItems={"center"}
                border={"1px solid #1f2937"}
                p={"4px 8px"}
                borderRadius={"4px"}
              >
                <Text
                  textTransform={"uppercase"}
                  color="#9CA3AF"
                  fontSize={"12px"}
                  fontWeight={600}
                >
                  Editor rating
                </Text>
                <Text
                  color="#33F57A"
                  fontSize={"12px"}
                  fontWeight={600}
                  textTransform={"uppercase"}
                  sx={{
                    backgroundColor:
                      "color-mix(in srgb, #33F57A, transparent 85%)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  above {valueEditorRating}
                </Text>
                <Stack
                  fontSize={"8px"}
                  borderRadius={"1000px"}
                  bgcolor={"#9ca3af"}
                  color={"#111111"}
                  p={"3px"}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#6b7280",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => setEditorRating(0)}
                >
                  <CloseIcon />
                </Stack>
              </Stack>
            )}
            {valueUserRating !== 0 && (
              <Stack
                direction={"row"}
                gap={1}
                alignItems={"center"}
                border={"1px solid #1f2937"}
                p={"4px 8px"}
                borderRadius={"4px"}
              >
                <Text
                  textTransform={"uppercase"}
                  color="#9CA3AF"
                  fontSize={"12px"}
                  fontWeight={600}
                >
                  User rating
                </Text>
                <Text
                  color="#33F57A"
                  fontSize={"12px"}
                  fontWeight={600}
                  textTransform={"uppercase"}
                  sx={{
                    backgroundColor:
                      "color-mix(in srgb, #33F57A, transparent 85%)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  above {valueUserRating}
                </Text>
                <Stack
                  fontSize={"8px"}
                  borderRadius={"1000px"}
                  bgcolor={"#9ca3af"}
                  color={"#111111"}
                  p={"3px"}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#6b7280",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => setUserRating(0)}
                >
                  <CloseIcon />
                </Stack>
              </Stack>
            )}
          </Stack>
          <Stack
            display={"grid"}
            gridTemplateColumns={"repeat(6, 1fr)"}
            gap={2}
          >
            {data?.map((item, index) => {
              return (
                <Stack
                  key={index}
                  position={"relative"}
                  p={"6px"}
                  borderRadius={"16px"}
                  // width={'226px'}
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
                >
                  <Stack direction={"column"} gap={2}>
                    <Stack
                      sx={{
                        bgcolor: "#546744",
                        aspectRatio: 1,
                        width: "100%",
                        borderRadius: "12px",
                      }}
                    />
                    <Stack py="0.5rem" gap={1}>
                      <Text
                        fontSize={"18px"}
                        color="white"
                        textAlign={"center"}
                        fontWeight={700}
                      >
                        {item.name}
                      </Text>
                      <Text
                        color="#9CA3AF"
                        fontSize={"12px"}
                        textAlign={"center"}
                      >
                        {item.description ? item.description : "description"}
                      </Text>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={2}
                        justifyContent={"center"}
                      >
                        {getIcon(item.support_os).map((item, index) => {
                          return (
                            <Stack
                              key={index}
                              direction={"row"}
                              alignItems={"center"}
                              fontSize={16}
                              color={"#9CA3AF"}
                            >
                              {item}
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
                    <Text
                      color="#D1D5D8"
                      fontSize={"12px"}
                      textAlign={"center"}
                    >
                      Title
                    </Text>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default memo(BrowserGame);
