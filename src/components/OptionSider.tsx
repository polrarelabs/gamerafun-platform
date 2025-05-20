"use client";

import FormListOption from "@components/screens/Genres/components/FormListOption";
import { Button, SliderCustom, Text } from "@components/shared";
import SearchIcon from "@icons/SearchIcon";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LensIcon from "@mui/icons-material/Lens";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Checkbox, InputBase, Stack } from "@mui/material";
import { useGameCount, useGameReducers } from "@store/game";
import { palette } from "public/material";
import { memo, useState } from "react";
const OptionSider = () => {
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

  const handleSliderChangeEditorRating = (
    _event: Event,
    newValue: number | number[],
  ) => {
    setEditorRating(newValue as number);
  };
  const handleSliderChangeUserRating = (
    _event: Event,
    newValue: number | number[],
  ) => {
    setUserRating(newValue as number);
  };
  const handleClear = () => {
    setChecked("all");
    SetPlatforms([]);
    setUserRating(0);
    setEditorRating(0);
    SetGenres([]);
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
          backgroundColor: palette.bgMenuHover,
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
        <Stack direction={"column"} gap={2}>
          <Text color="white" fontSize={"16px"} fontWeight={500}>
            Min Rating
          </Text>
          <SliderCustom
            title={`Editor's Rating`}
            value={valueEditorRating}
            handleChange={handleSliderChangeEditorRating}
          />
          <SliderCustom
            title={`User Rating`}
            value={valueUserRating}
            handleChange={handleSliderChangeUserRating}
          />
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
                      item.key === checked
                        ? palette.colorGame?.bgColor
                        : undefined,
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
      </Stack>
    </Stack>
  );
};

export default memo(OptionSider);
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
