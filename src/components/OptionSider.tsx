"use client";

import { Search, SliderCustom, Text } from "@components/shared";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { memo, useEffect, useState } from "react";
import FormDateAdded from "./FormDateAdded";
import FormOption from "./shared/FormOption";
import { Platform, ScheduleStatus } from "@constant/enum";
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
    genreItems,
  } = useGame();

  const [listGenres, setListGenres] = useState<string[]>([]);

  useEffect(() => {
    if (genreItems) {
      const arr: string[] = [];
      for (const item of genreItems) {
        arr.push(item.name);
      }
      setListGenres(arr);
    }
  }, [genreItems]);

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
    <Stack
      direction={"column"}
      gap={2}
      flex={{
        lg: 1,
        xs: 2,
      }}
      mb={4}
    >
      <Search setSearch={setSearch} placeholder="Search for games" />
      <Stack direction={"column"} gap={2}>
        <FormOption
          title={"Platform"}
          data={gameCount.platform!}
          setArray={SetPlatforms}
          arrayKey={platforms}
          label={Object.keys(Platform)}
        />
        <Stack direction={"column"} gap={2} pl={2}>
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

        <FormOption
          title={"Genres"}
          data={gameCount.genre!}
          setArray={SetGenres}
          arrayKey={genres}
          label={listGenres}
        />

        <FormOption
          title={"Status"}
          data={gameCount.status!}
          setArray={SetStatusGame}
          arrayKey={statusGame}
          label={Object.keys(ScheduleStatus)}
        />

        <FormDateAdded />
      </Stack>
    </Stack>
  );
};

export default memo(OptionSider);
