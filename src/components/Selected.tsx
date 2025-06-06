"use client";

import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { memo } from "react";
import { BoxSelected } from "./shared";

const Selected = () => {
  const {
    setMinRating,
    setMaxRating,
    minRating,
    maxRating,
    playable,
    beta,
    inDevelopment,
    alpha,
    platforms,
    SetPlayable,
    SetBeta,
    SetInDevelopment,
    SetAlpha,
    SetPlatforms,
    genres,
    SetGenres,
    discontinued,
    SetDiscontinued,
    tba,
    SetTBA,
    SetStatusGame,
    statusGame,
  } = useGame();

  const { tags, setTags } = useBlog();

  const ListBoxSelected = [
    {
      name: "playable",
      value: playable,
      onClose: () => SetPlayable(false),
    },
    {
      name: "beta",
      value: beta,
      onClose: () => SetBeta(false),
    },
    {
      name: "alpha",
      value: alpha,
      onClose: () => SetAlpha(false),
    },
    {
      name: "inDevelopment",
      value: inDevelopment,
      onClose: () => SetInDevelopment(false),
    },
    {
      name: "discontinued",
      value: discontinued,
      onClose: () => SetDiscontinued(false),
    },
    {
      name: "tba",
      value: tba,
      onClose: () => SetTBA(false),
    },
    {
      name: "platforms",
      value: platforms,
      onClose: () => SetPlatforms([]),
    },
    {
      name: "min rating",
      value: minRating,
      onClose: () => setMinRating(0),
    },
    {
      name: "max rating",
      value: maxRating,
      onClose: () => setMaxRating(0),
    },
    {
      name: "genres",
      value: genres,
      onClose: () => SetGenres([]),
    },
    {
      name: "tags",
      value: tags,
      onClose: () => setTags([]),
    },
    {
      name: "status",
      value: statusGame,
      onClose: () => SetStatusGame([]),
    },
  ];

  if (
    !playable &&
    !beta &&
    !alpha &&
    !inDevelopment &&
    !discontinued &&
    !tba &&
    !platforms &&
    !minRating &&
    !maxRating &&
    !genres &&
    !tags &&
    !statusGame
  )
    return;

  return (
    <Stack direction={"row"} gap={2} flexWrap={"wrap"} mb={2} mt={1}>
      {ListBoxSelected.map((item, index) => {
        if (
          (Array.isArray(item.value) && item.value.length > 0) ||
          (typeof item.value === "number" && item.value !== 0) ||
          (typeof item.value === "boolean" && item.value)
        ) {
          return (
            <BoxSelected
              key={index}
              name={item.name}
              value={item.value}
              onClose={item.onClose}
            />
          );
        }
      })}
    </Stack>
  );
};

export default memo(Selected);
