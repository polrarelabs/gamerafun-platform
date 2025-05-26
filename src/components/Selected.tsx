"use client";

import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import React, { memo } from "react";
import { BoxSelected } from "./shared";

const Selected = () => {
  const {
    setMinRating,
    setMaxRating,
    minRating,
    maxRating,
    playNow,
    freeToPlay,
    awardWinners,
    favorites,
    platforms,
    SetPlayNow,
    SetFreeToPlay,
    SetAwardWinners,
    SetFavorites,
    SetPlatforms,
    genres,
    SetGenres,
  } = useGame();

  const { tags, setTags } = useBlog();

  return (
    <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
      {playNow && (
        <BoxSelected
          name={"play now"}
          value={playNow}
          onClose={() => SetPlayNow(false)}
        />
      )}
      {freeToPlay && (
        <BoxSelected
          name={"free-to-play"}
          value={freeToPlay}
          onClose={() => SetFreeToPlay(false)}
        />
      )}
      {favorites && (
        <BoxSelected
          name={"favorites"}
          value={favorites}
          onClose={() => SetFavorites(false)}
        />
      )}
      {awardWinners && (
        <BoxSelected
          name={"award winners"}
          value={awardWinners}
          onClose={() => SetAwardWinners(false)}
        />
      )}
      {platforms.length > 0 && (
        <BoxSelected
          name={"platforms"}
          value={platforms}
          onClose={() => SetPlatforms([])}
        />
      )}

      {minRating !== 0 && (
        <BoxSelected
          name={"min rating"}
          value={minRating}
          onClose={() => setMinRating(0)}
        />
      )}
      {maxRating !== 0 && (
        <BoxSelected
          name={"max rating"}
          value={maxRating}
          onClose={() => setMaxRating(0)}
        />
      )}
      {genres.length > 0 && (
        <BoxSelected
          name={"genres"}
          value={genres}
          onClose={() => SetGenres([])}
        />
      )}
      {tags.length > 0 && (
        <BoxSelected name={"tags"} value={tags} onClose={() => setTags([])} />
      )}
    </Stack>
  );
};

export default memo(Selected);
