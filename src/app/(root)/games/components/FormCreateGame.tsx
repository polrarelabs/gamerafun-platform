"use client";

import Link from "@components/Link";
import { Button } from "@components/shared";
import { CREATE_GAME_PATH } from "@constant/paths";
import { Box } from "@mui/material";
import React, { memo, useState } from "react";

const FormCreateGame = () => {
  return (
    <Box>
      <Button
        component={Link}
        href={CREATE_GAME_PATH}
        variant="contained"
        // onClick={() => handleCreate()}
      >
        Create Game
      </Button>
      {/* <ModalCreateGame open={open} setOpen={setOpen} /> */}
    </Box>
  );
};

export default memo(FormCreateGame);
