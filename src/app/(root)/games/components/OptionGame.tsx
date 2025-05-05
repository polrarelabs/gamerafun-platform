"use client";

import { Text, Tooltip } from "@components/shared";
import SearchIcon from "@icons/SearchIcon";
import { InputBase, Slider, Stack } from "@mui/material";
import { useGameCount, useGameReducers } from "@store/game";
import React, { memo, useEffect, useMemo, useState } from "react";
import { BsFillHexagonFill } from "react-icons/bs";
import { GetColor } from "./GetColor";

const OptionGame = () => {
  const { setEditorRating, setUserRating, valueEditorRating, valueUserRating } =
    useGameReducers();

  const { data } = useGameCount();

  const [arrKeys, setArrKeys] = useState<string[]>([]);
  const [arrValues, setArrValues] = useState<number[]>([]);

  const thumbColorEditorRating = useMemo(() => {
    if (typeof valueEditorRating !== "number" || valueEditorRating === 0)
      return "#9CA3AF";

    const color = GetColor(valueEditorRating);
    return color;
  }, [valueEditorRating]);

  const thumbColorUserRating = useMemo(() => {
    if (typeof valueUserRating !== "number" || valueUserRating === 0)
      return "#9CA3AF";
    const color = GetColor(valueEditorRating);
    return color;
  }, [valueUserRating]);

  useEffect(() => {
    const arrKeys: string[] =
      data && data.platform ? Object.keys(data.platform) : [];
    const arrValues: number[] =
      data && data.platform ? Object.values(data.platform) : [];
    setArrKeys(arrKeys);
    setArrValues(arrValues);
  }, [data]);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setEditorRating(newValue as number);
  };
  const handleSliderChangeUserRating = (
    _event: Event,
    newValue: number | number[],
  ) => {
    setUserRating(newValue as number);
  };

  return (
    <Stack direction={"column"} gap={2} flex={1}>
      <InputBase
        placeholder="Please enter text"
        startAdornment={
          <SearchIcon
            sx={{
              height: 20,
              width: 20,
              mr: 1,
            }}
          />
        }
        sx={{
          border: "none !important",
          backgroundColor: "#1f2937",
          padding: "8px 16px",
          borderRadius: "6px",
        }}
      />
      <Stack direction={"column"} gap={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text color="white" fontSize={"16px"} fontWeight={500}>
            Platform
          </Text>
          {/* <Text
                        color="#33F57A"
                        fontSize={"16px"}
                        fontWeight={500}
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Show More
                    </Text> */}
        </Stack>
        <Stack direction={"column"} gap={2}>
          {arrKeys.map((_, index) => {
            return (
              <Stack
                key={index}
                direction={"row"}
                alignItems={"center"}
                gap={2}
              >
                <Text color="#9CA3AF" fontSize={"14px"}>
                  {arrKeys[index]}
                </Text>
                <Text color="#9CA3AF" fontSize={"14px"}>
                  {arrValues[index]}
                </Text>
              </Stack>
            );
          })}
        </Stack>
        <Stack direction={"column"} gap={2}>
          <Text color="white" fontSize={"16px"} fontWeight={500}>
            Min Rating
          </Text>
          <Stack direction={"column"} gap={1}>
            <Text color="#9CA3AF" fontSize={"12px"}>
              {`Editor's Rating`}
            </Text>
            <Stack gap={1} display={"flex"} direction={"row"} pl={1}>
              <Stack flex={5} direction={"row"} alignItems={"center"}>
                <Slider
                  max={10}
                  min={0}
                  step={0.1}
                  value={
                    typeof valueEditorRating === "number"
                      ? valueEditorRating
                      : 0
                  }
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  sx={{
                    height: "0.25rem",
                    width: "100%",
                    "& .MuiSlider-track": {
                      border: "none",
                      backgroundColor: "#111827",
                    },
                    "& .MuiSlider-rail": {
                      background:
                        valueEditorRating === 0
                          ? "#111827"
                          : "linear-gradient(90deg,rgba(184, 84, 85, 1) 1%, rgba(229, 155, 44, 1) 50%, rgba(1, 183, 98, 1) 100%)",
                      opacity: 1,
                    },
                    "& .MuiSlider-thumb": {
                      height: 16,
                      width: 16,
                      backgroundColor: thumbColorEditorRating?.toString(),
                      border: "none",
                      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                        boxShadow: "inherit",
                      },
                      "&::before": {
                        display: "none",
                      },
                    },
                  }}
                />
              </Stack>
              <Tooltip
                title={`This game have a rating of ${valueEditorRating}/10`}
                placement="top"
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#9CA3AF",
                }}
              >
                <Stack
                  flex={1}
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  position={"relative"}
                >
                  <BsFillHexagonFill
                    size={40}
                    style={{
                      color:
                        valueEditorRating === 0
                          ? "#242C3D"
                          : thumbColorEditorRating?.toString(),
                    }}
                  />
                  <Text
                    fontSize={"16px"}
                    fontWeight={700}
                    sx={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      translate: "-50% -50%",
                      color: valueEditorRating === 0 ? "#9CA3AF" : "black",
                    }}
                  >
                    {valueEditorRating === 0 ? "-" : valueEditorRating}
                  </Text>
                </Stack>
              </Tooltip>
            </Stack>
          </Stack>
          <Stack direction={"column"} gap={1}>
            <Text color="#9CA3AF" fontSize={"12px"}>
              {`User Rating`}
            </Text>
            <Stack gap={1} display={"flex"} direction={"row"} pl={1}>
              <Stack flex={5} direction={"row"} alignItems={"center"}>
                <Slider
                  max={10}
                  min={0}
                  step={0.1}
                  value={
                    typeof valueUserRating === "number" ? valueUserRating : 0
                  }
                  onChange={handleSliderChangeUserRating}
                  aria-labelledby="input-slider"
                  sx={{
                    height: "0.25rem",
                    width: "100%",
                    "& .MuiSlider-track": {
                      border: "none",
                      backgroundColor: "#111827",
                    },
                    "& .MuiSlider-rail": {
                      background:
                        valueUserRating === 0
                          ? "#111827"
                          : "linear-gradient(90deg,rgba(184, 84, 85, 1) 1%, rgba(229, 155, 44, 1) 50%, rgba(1, 183, 98, 1) 100%)",
                      opacity: 1,
                    },
                    "& .MuiSlider-thumb": {
                      height: 16,
                      width: 16,
                      backgroundColor: thumbColorUserRating?.toString(),
                      border: "none",
                      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                        boxShadow: "inherit",
                      },
                      "&::before": {
                        display: "none",
                      },
                    },
                  }}
                />
              </Stack>
              <Tooltip
                title={`This game have a rating of ${valueUserRating}/10`}
                placement="top"
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#9CA3AF",
                }}
              >
                <Stack
                  flex={1}
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  position={"relative"}
                >
                  <BsFillHexagonFill
                    size={40}
                    style={{
                      color:
                        valueUserRating === 0
                          ? "#242C3D"
                          : thumbColorUserRating?.toString(),
                    }}
                  />
                  <Text
                    fontSize={"16px"}
                    fontWeight={700}
                    sx={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      translate: "-50% -50%",
                      color: valueUserRating === 0 ? "#9CA3AF" : "black",
                    }}
                  >
                    {valueUserRating === 0 ? "-" : valueUserRating}
                  </Text>
                </Stack>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(OptionGame);
