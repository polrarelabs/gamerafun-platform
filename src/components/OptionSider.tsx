"use client";

import FormListOption from "@components/screens/Genres/components/FormListOption";
import { SliderCustom, Text } from "@components/shared";
import SearchIcon from "@icons/SearchIcon";
import { InputBase, Stack } from "@mui/material";
import { useGame } from "@store/game";
import { palette } from "public/material";
import { memo } from "react";
import FormDateAdded from "./FormDateAdded";
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
    dataGameCount: data,
  } = useGame();

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

        <FormDateAdded />
      </Stack>
    </Stack>
  );
};

export default memo(OptionSider);
