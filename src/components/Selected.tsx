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
  } = useGame();

  const { tags, setTags } = useBlog();

  return (
    <Stack direction={"row"} gap={2} flexWrap={"wrap"} mb={2} mt={1}>
      {playable && (
        <BoxSelected
          name={"playable"}
          value={playable}
          onClose={() => SetPlayable(false)}
        />
      )}
      {beta && (
        <BoxSelected
          name={"beta"}
          value={beta}
          onClose={() => SetBeta(false)}
        />
      )}
      {alpha && (
        <BoxSelected
          name={"alpha"}
          value={alpha}
          onClose={() => SetAlpha(false)}
        />
      )}
      {inDevelopment && (
        <BoxSelected
          name={"inDevelopment"}
          value={inDevelopment}
          onClose={() => SetInDevelopment(false)}
        />
      )}
      {discontinued && (
        <BoxSelected
          name={"discontinued"}
          value={discontinued}
          onClose={() => SetDiscontinued(false)}
        />
      )}
      {tba && (
        <BoxSelected name={"tba"} value={tba} onClose={() => SetTBA(false)} />
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
