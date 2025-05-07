"use client";

import { Button } from "@components/shared";
import { Box } from "@mui/material";
import React, { useState } from "react";
import ModalCreateGame from "./ModalCreateGame";

const FormCreateGame = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create Game
      </Button>
      <ModalCreateGame open={open} setOpen={setOpen} />
    </Box>
  );
};

export default FormCreateGame;
