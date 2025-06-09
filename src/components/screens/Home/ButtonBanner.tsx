"use client";

import { Button, Text } from "@components/shared";
import { Stack } from "@mui/material";
import { palette } from "public/material";
import React, { memo } from "react";

const ButtonBanner = () => {
  return (
    <Stack direction={"row"} gap={2}>
      <Button
        variant="contained"
        sx={{
          background: "white !important",
          borderRadius: "0.75rem !important",
          padding: "8px 16px !important",
          "&:hover": {
            background: `${palette.colorGray} !important`,
          },
        }}
      >
        <Text color="black" fontSize={"16px"} fontWeight={400}>
          View Game
        </Text>
      </Button>
      <Button
        variant="contained"
        sx={{
          background: `${palette.colorBanner?.bgColor} !important`,
          borderRadius: "0.75rem !important",
          padding: "8px 16px !important",
          "&:hover": {
            background: `${palette.colorBanner?.bgColorHover} !important`,
          },
        }}
      >
        <Text color="white" fontSize={"16px"} fontWeight={400}>
          Add to favorites
        </Text>
      </Button>
    </Stack>
  );
};

export default memo(ButtonBanner);
