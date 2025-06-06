"use client";

import { Dialog, Stack } from "@mui/material";
import React, { memo, useState } from "react";
import { Snackbared, Text } from "@components/shared";
import { palette } from "public/material";
import { DOMAIN } from "@constant";
import CheckedIcon from "@icons/common/CheckedIcon";
import CopyIcon from "@icons/common/CopyIcon";

interface DialogShareProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pathname: string;
}

const DialogShare = ({ open, setOpen, pathname }: DialogShareProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${DOMAIN}${pathname}`);
      setIsCopied(true);
      setOpenSnackbar(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      sx={{
        "& .mui-6z1qq0-MuiPaper-root-MuiDialog-paper": {
          backgroundColor: "inherit !important",
          backgroundImage: "inherit !important",
          boxShadow: "none !important",
        },
        "& .mui-19do60a-MuiDialog-container": {
          backdropFilter: "blur(15px)",
        },
      }}
    >
      <Stack alignItems={"center"} gap={2} p={"8px 16px"}>
        <Text color={"white"} fontSize={"32px"} fontWeight={700}>
          Share it with your friends
        </Text>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          bgcolor={palette.colorModalShare?.bgCopy}
          padding={"15px 20px"}
          borderRadius={"4px"}
        >
          <Stack alignItems={"start"}>
            <Text color={palette.colorReview?.textCopy} fontSize={"16px"}>
              Or copy Link
            </Text>
            <Text fontSize={"18px"} fontWeight={400} color={"white"}>
              {`${DOMAIN}${pathname}`}
            </Text>
          </Stack>
          {isCopied ? (
            <CheckedIcon />
          ) : (
            <CopyIcon
              sx={{
                fontSize: 24,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={handleCopy}
            />
          )}
        </Stack>
      </Stack>

      <Snackbared
        message="Copied."
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        status="success"
      />
    </Dialog>
  );
};

export default memo(DialogShare);
