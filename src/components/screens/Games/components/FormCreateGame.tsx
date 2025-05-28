"use client";

import Link from "@components/Link";
import { Button } from "@components/shared";
import {
  CREATE_GAME_PATH,
  CREATE_GENRES_PATH,
  UPDATE_GAME_PATH,
} from "@constant/paths";
import { Box, Stack } from "@mui/material";
import React, { memo } from "react";

const FormCreateGame = () => {
  return (
    <Stack direction={"row"} gap={2}>
      <Button
        component={Link}
        href={CREATE_GAME_PATH}
        variant="contained"
        // onClick={() => handleCreate()}
      >
        Create Game
      </Button>
      <Button
        component={Link}
        href={UPDATE_GAME_PATH}
        variant="contained"
        // onClick={() => handleCreate()}
      >
        Update Game
      </Button>
      <Button
        component={Link}
        href={CREATE_GENRES_PATH}
        variant="contained"
        // onClick={() => handleCreate()}
      >
        Create Genres
      </Button>
      {/* <ModalCreateGame open={open} setOpen={setOpen} /> */}
    </Stack>
  );
};

export default memo(FormCreateGame);
