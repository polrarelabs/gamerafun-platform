"use client";

import { Checkbox, Stack } from "@mui/material";
import React, { memo, useState } from "react";
import { Button, Text } from "./shared";
import { palette } from "public/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LensIcon from "@mui/icons-material/Lens";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useGame } from "@store/game";
import { AddedDateSort, SortBy } from "@constant/enum";
import { useBlog } from "@store/new";
import { getDateSort } from "./helper";

const FormDateAdded = () => {
  const {
    setMinRating,
    setMaxRating,
    SetPlatforms,
    SetGenres,
    setSearch: searchGame,
    setSortBy: sortGame,
  } = useGame();
  const { checkDate, setCheckDate, setSearch, setSortBy, setTags } = useBlog();
  const handleClear = () => {
    setCheckDate(AddedDateSort.AllTime);
    SetPlatforms([]);
    setMaxRating(0);
    setMinRating(0);
    SetGenres([]);
    setTags([]);
    setSearch("");
    searchGame("");
    setSortBy(SortBy.Newest);
    sortGame(SortBy.Newest);
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Stack direction={"column"} gap={2}>
      <Stack>
        <Text color="white" fontSize={"16px"} fontWeight={500}>
          Data Added
        </Text>
      </Stack>
      <Stack direction={"column"}>
        {Object.keys(AddedDateSort).map((item, index) => {
          return (
            <Stack
              key={index}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              onClick={() => setCheckDate(AddedDateSort[item])}
              sx={{
                backgroundColor:
                  AddedDateSort[item] === checkDate
                    ? palette.colorGame?.bgColor
                    : undefined,
                "&:hover": {
                  backgroundColor:
                    AddedDateSort[item] === checkDate
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
                  color={
                    AddedDateSort[item] === checkDate
                      ? "white"
                      : palette.colorGray
                  }
                  fontSize={"14px"}
                  fontWeight={500}
                >
                  {getDateSort(AddedDateSort[item])}
                </Text>
              </Stack>
              <Checkbox
                checked={checkDate === AddedDateSort[item]}
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
                      color: "primary.main",
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
