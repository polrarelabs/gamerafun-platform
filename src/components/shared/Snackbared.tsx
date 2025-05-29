"use client";

import { Snackbar, SnackbarCloseReason } from "@mui/material";
import React, { memo } from "react";

interface SnackBarProps {
  message: string;
  autoHideDuration?: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vertical?: "bottom" | "top";
  horizontal?: "right" | "left" | "center";
}

const Snackbared = ({
  message,
  autoHideDuration = 3000,
  open,
  setOpen,
  vertical = "bottom",
  horizontal = "right",
}: SnackBarProps) => {
  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleCloseSnackbar}
      message={message}
    />
  );
};

export default memo(Snackbared);
