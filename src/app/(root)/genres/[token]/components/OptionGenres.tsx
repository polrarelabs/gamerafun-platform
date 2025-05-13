"use client";

import { GetColor } from "@app/(root)/games/components/GetColor";
import { Button, Text, Tooltip } from "@components/shared";
import CircleCheckIcon from "@icons/CircleCheckIcon";
import SearchIcon from "@icons/SearchIcon";
import { Checkbox, InputBase, Slider, Stack } from "@mui/material";
import { useGameCount, useGameReducers } from "@store/game";
import React, { memo, useEffect, useMemo, useState } from "react";
import { BsFillHexagonFill } from "react-icons/bs";
import { HandleClickOption } from "./HandleClickOption";
import FormListOption from "./FormListOption";
import LensIcon from "@mui/icons-material/Lens";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const OptionGenres = () => {
  const {
    setEditorRating,
    setUserRating,
    valueEditorRating,
    valueUserRating,
    platforms,
    SetPlatforms,
    genres,
    SetGenres,
  } = useGameReducers();

  const { data } = useGameCount();
  const [checked, setChecked] = useState<string>("all");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

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

  const handleClear = () => {
    setChecked("all");
    SetPlatforms([]);
    setUserRating(0);
    setEditorRating(0);
    SetGenres([]);
  };

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
    <Stack direction={"column"} gap={2} flex={{ lg: 1, xs: 2 }}>
      <InputBase
        placeholder="Search for games"
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
        <FormListOption
          name={"Platform"}
          data={data.platform!}
          setArray={SetPlatforms}
          arrayKey={platforms}
        />

        {/* 2 thanh slider */}
        <Stack direction={"column"} gap={2} px={2}>
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

        <FormListOption
          name={"Genres"}
          data={data.genre!}
          setArray={SetGenres}
          arrayKey={genres}
        />
        <Stack direction={"column"} gap={2}>
          <Stack>
            <Text color="white" fontSize={"16px"} fontWeight={500}>
              Data Added
            </Text>
          </Stack>
          <Stack direction={"column"}>
            {DATAADDED.map((item, index) => {
              return (
                <Stack
                  key={index}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  onClick={() => setChecked(item.key)}
                  sx={{
                    backgroundColor:
                      item.key === checked ? "#171F2C" : undefined,
                    "&:hover": {
                      backgroundColor:
                        item.key === checked ? "#171F2C" : "#171f2cb5",
                    },
                    borderRadius: "8px",
                  }}
                >
                  <Stack direction={"row"} alignItems={"center"} pl={1} gap={2}>
                    <CalendarMonthIcon
                      sx={{
                        color: "#9CA3AF",
                        fontSize: 18,
                      }}
                    />
                    <Text
                      color={item.key === checked ? "white" : "#9CA3AF"}
                      fontSize={"14px"}
                      fontWeight={500}
                    >
                      {item.title}
                    </Text>
                  </Stack>
                  <Checkbox
                    checked={checked === item.key}
                    {...label}
                    icon={
                      <LensIcon
                        sx={{
                          color: "#1F2937",
                        }}
                      />
                    }
                    checkedIcon={
                      <RadioButtonCheckedIcon
                        sx={{
                          color: "#33F57A",
                        }}
                      />
                    }
                  />
                </Stack>
              );
            })}
            <Stack>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "8px !important",
                  color: "#F9FAFB !important",
                  background: "#6b728026 !important",
                  border: "1px solid #4b556333 !important",
                  mt: 2,
                }}
                onClick={() => handleClear()}
              >
                Clear All
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(OptionGenres);

const DATAADDED = [
  {
    key: "all",
    title: "All Time",
  },
  {
    key: "7days",
    title: "Last 7 days",
  },
  {
    key: "30days",
    title: "Last 30 days",
  },
  {
    key: "6months",
    title: "Last 6 months",
  },
  {
    key: "12months",
    title: "Last 12 months",
  },
];
