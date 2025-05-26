"use client";

import { Button, Text } from "@components/shared";
import ButtonFillters from "@components/shared/ButtonFillters";
// import Snackbar from '@components/Snackbar'
import { ACCESSTOKEN_COOKIE, DOMAIN } from "@constant";
import CheckedIcon from "@icons/common/CheckedIcon";
import CopyIcon from "@icons/common/CopyIcon";
import {
  Dialog,
  DialogContent,
  Snackbar,
  SnackbarCloseReason,
  Stack,
} from "@mui/material";
import { useBlog } from "@store/new";
import { usePathname } from "next/navigation";
import { palette } from "public/material";
import React, { memo, useState } from "react";
import { PiShareFat } from "react-icons/pi";
import Cookies from "js-cookie";

const NewsDetail = () => {
  const { blogId } = useBlog();
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cookie = Cookies.get(ACCESSTOKEN_COOKIE);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState<boolean>(false);
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

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Stack direction={"row"} gap={3} alignItems={"start"}>
      <Stack flex={6} gap={2}>
        <Stack
          width="100%"
          id="news-detail-content"
          sx={{
            color: "white",
            overflowY: "auto",
            "& p": {
              my: 0,
            },
            "& h2, & h3, & h4": {
              my: 0,
            },
            "& a": {
              wordBreak: "break-all",
              "&:any-link": {
                textDecoration: "none",
              },
            },
            "& img": {
              height: "auto",
              maxWidth: "100%",
            },
            "& figure": {
              mx: "auto",
              "&.media": {
                width: "100%",
                height: "100%",
              },
            },
            "& blockquote": {
              borderLeft: `5px solid ${palette.colorReview?.color}`,
              fontStyle: "italic",
              mx: 0,
              px: 2.5,
            },
            "& table": {
              border: `1px double ${palette.colorReview?.borderColorTable}`,
              borderCollapse: "collapse",
              borderSpacing: 0,
              width: "100%",
              "& td": {
                border: `1px solid ${palette.colorReview?.borderTd}`,
                p: 0.75,
              },
            },
            "& pre": {
              background: palette.colorReview?.colorC7,
              border: `1px solid ${palette.colorReview?.colorC4}`,
              borderRadius: 0.5,
              p: 2,
            },
          }}
          dangerouslySetInnerHTML={{
            __html: blogId.content,
          }}
        />
        <Stack direction={"row"} justifyContent={"center"}>
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              borderRadius: "8px !important",
              height: "40px !important",
              color: `${palette.greenColorText} !important`,
              background: `${palette.greenColorButton} !important`,
              "&:hover": {
                color: "black !important",
                background: `${palette.greenColorText} !important`,
              },
            }}
            size={"small"}
            fullWidth
            onClick={handleClickOpen}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={0.5}
            >
              <Text color={hover ? "black !important" : palette.greenColorText}>
                Share this article
              </Text>
              <PiShareFat />
            </Stack>
          </Button>
        </Stack>
      </Stack>
      <Stack flex={2}></Stack>

      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        sx={{
          "&:.mui-o1er99-MuiPaper-root-MuiDialog-paper ": {
            backgroundColor: "transparent !important",
            backgroundImage: "none !important",
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
          >
            <Stack alignItems={"start"} gap={1}>
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

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message="Copied."
        />
      </Dialog>
    </Stack>
  );
};

export default memo(NewsDetail);
