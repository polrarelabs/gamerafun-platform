"use client";

import { Checkbox, Stack } from "@mui/material";
import React, { memo, useState } from "react";
import { Button, Text } from "./shared";
import { palette } from "public/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LensIcon from "@mui/icons-material/Lens";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useGame } from "@store/game";

const FormDateAdded = () => {
  const { setEditorRating, setUserRating, SetPlatforms, SetGenres } = useGame();
  const [checked, setChecked] = useState<string>("all");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleClear = () => {
    setChecked("all");
    SetPlatforms([]);
    setUserRating(0);
    setEditorRating(0);
    SetGenres([]);
  };
  return (
    <Stack direction={"column"} gap={2}>
      <Stack>
        <Text color="white" fontSize={"16px"} fontWeight={500}>
          Data Added
        </Text>
      </Stack>
      <Stack direction={"column"}>
        {DATE_ADDED.map((item, index) => {
          return (
            <Stack
              key={index}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              onClick={() => setChecked(item.key)}
              sx={{
                backgroundColor:
                  item.key === checked ? palette.colorGame?.bgColor : undefined,
                "&:hover": {
                  backgroundColor:
                    item.key === checked
                      ? palette.colorGame?.bgColor
                      : palette.colorGame?.bgColorHover,
                },
                borderRadius: "8px",
              }}
            >
              <Stack direction={"row"} alignItems={"center"} pl={1} gap={2}>
                <CalendarMonthIcon
                  sx={{
                    color: palette.colorGray,
                    fontSize: 18,
                  }}
                />
                <Text
                  color={item.key === checked ? "white" : palette.colorGray}
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
                      color: palette.bgMenuHover,
                    }}
                  />
                }
                checkedIcon={
                  <RadioButtonCheckedIcon
                    sx={{
                      color: palette.greenColor,
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
              color: `${palette.textWhite} !important`,
              background: `${palette.colorGame?.bgColor1} !important`,
              border: `1px solid ${palette.colorGame?.borderColor} !important`,
              mt: 2,
            }}
            onClick={() => handleClear()}
          >
            Clear All
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(FormDateAdded);

const DATE_ADDED = [
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
