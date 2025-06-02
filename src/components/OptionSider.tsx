"use client";

import { Search, SliderCustom, Text } from "@components/shared";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { memo } from "react";
import FormDateAdded from "./FormDateAdded";
import FormListOption from "./shared/FormListOption";
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
    gameCount,
    setSearch,
    SetStatusGame,
    statusGame,
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
          data={gameCount.platform!}
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
          data={gameCount.genre!}
          setArray={SetGenres}
          arrayKey={genres}
        />

        <FormListOption
          name={"Status"}
          data={gameCount.schedule_status!}
          setArray={SetStatusGame}
          arrayKey={statusGame}
        />

        <FormDateAdded />
      </Stack>
    </Stack>
  );
};

export default memo(OptionSider);
