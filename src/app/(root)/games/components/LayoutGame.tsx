/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Stack } from "@mui/material";
import React, { memo, useEffect } from "react";
import PopularGenres from "./PopularGenres";
import LayoutBrowserGame from "./LayoutBrowserGame";
import { useGameCount } from "@store/game";
import axios from "axios";
import { setToken } from "@api/helpers";

const LayoutGame = () => {
  const { fetchGameCount } = useGameCount();
  const handleUpdate = async () => {
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
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    handleUpdate();
    fetchGameCount();
  }, []);

  return (
    <Stack direction={"column"} gap={8}>
      <PopularGenres />
      <LayoutBrowserGame />
    </Stack>
  );
};

export default memo(LayoutGame);
