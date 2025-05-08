"use client";

import { Button } from "@components/shared";
import { Box } from "@mui/material";
import React, { useState } from "react";
import ModalCreateGame from "./ModalCreateGame";
import axios from "axios";
import { setToken } from "@api/helpers";

const FormCreateGame = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "https://web3-common-service.polrare.co/api/auth/auth",
        {
          userName: "gamera_admin",
          password: "@12345",
        },
      );

      if (response) {
        const token = response.data.accessToken;
        setToken(token);
        setOpen(true);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => handleCreate()}>
        Create Game
      </Button>
      <ModalCreateGame open={open} setOpen={setOpen} />
    </Box>
  );
};

export default FormCreateGame;
