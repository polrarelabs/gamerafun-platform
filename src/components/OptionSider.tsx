"use client";

import FormListOption from "@components/screens/Genres/components/FormListOption";
import { Search, SliderCustom, Text } from "@components/shared";
import SearchIcon from "@icons/common/SearchIcon";
import { InputBase, Stack } from "@mui/material";
import { useGame } from "@store/game";
import { palette } from "public/material";
import { memo } from "react";
import FormDateAdded from "./FormDateAdded";
const OptionSider = () => {
  const {
    setMinRating,
    setMaxRating,
    minRating,
    maxRating,
    platforms,
    SetPlatforms,
    genres,
    SetGenres,
    dataGameCount: data,
    setSearch,
  } = useGame();

  const handleChangeMinRating = (
    _event: Event,
    newValue: number | number[],
  ) => {
    setMinRating(newValue as number);
  };
  const handleChangeMaxRating = (
    _event: Event,
    newValue: number | number[],
  ) => {
    setMaxRating(newValue as number);
  };

  return (
    <Stack direction={"column"} gap={2} flex={{ lg: 1, xs: 2 }}>
      <Search setSearch={setSearch} placeholder="Search for games" />
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
            title={`Min Rating`}
            value={minRating}
            handleChange={handleChangeMinRating}
          />
          <SliderCustom
            title={`Max Rating`}
            value={maxRating}
            handleChange={handleChangeMaxRating}
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
