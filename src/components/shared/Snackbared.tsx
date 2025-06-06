"use client";

import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { useRouter } from "next/navigation";
import React, { memo } from "react";

interface SnackBarProps {
  message: string;
  autoHideDuration?: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vertical?: "bottom" | "top";
  horizontal?: "right" | "left" | "center";
  path?: string | null;
  status?: "error" | "info" | "success" | "warning" | undefined;
  handleClose?: () => void;
}

const Snackbared = ({
  message,
  autoHideDuration = 3000,
  open,
  setOpen,
  vertical = "bottom",
  horizontal = "right",
  path = null,
  status = undefined,
  handleClose,
}: SnackBarProps) => {
  const router = useRouter();

  const { setStatusAPI: statusGame } = useGame();
  const { setStatusAPI: statusBlog } = useBlog();

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    if (path !== null) {
      if (reason === "timeout" && status === "success") {
        router.push(path);
      }
    }
    setOpen(false);
    statusGame();
    statusBlog();
    if (reason === "timeout") {
      handleClose && handleClose();
    }
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleCloseSnackbar}
      sx={{
        zIndex: 9999999,
      }}
      // message={message}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={status}
        variant="filled"
        sx={{
          width: "100%",
          zIndex: 99999999,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default memo(Snackbared);
