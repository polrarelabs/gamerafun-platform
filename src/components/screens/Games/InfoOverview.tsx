/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Button,
  DialogShare,
  Snackbared,
  Text,
  TextField,
} from "@components/shared";
import { Dialog, DialogContent, Stack } from "@mui/material";
import { useGame } from "@store/game";
import { palette } from "public/material";
import React, { memo, useEffect, useState } from "react";
import { GetIcon } from "./components";
import { thumbColor } from "@components/shared/helper";
import { useParams, usePathname } from "next/navigation";

const InfoOverview = () => {
  const params = useParams();

  const pathname = usePathname();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { gameById, createRate, loading, error } = useGame();

  const option = [
    {
      title: "Developer",
      value: gameById.developer,
    },
    {
      title: "Status",
      value: gameById.statusGame,
    },
    {
      title: "Platforms",
      value: gameById.platformLink,
    },
  ];
  const getPlatform = (data: any[]) => {
    const arr: string[] = [];
    if (data && data.length > 0) {
      data.forEach((item) => arr.push(Object.keys(item)[0]));
    }
    return arr;
  };

  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState<string>("");

  const [rate, setRate] = useState<number>(0);

  const handleSubmit = () => {
    createRate({
      gameId: Number(params.slug),
      review: value,
      score: rate,
    });
  };
  const [openSnack, setOpenSnack] = useState<boolean>(false);

  useEffect(() => {
    if (loading === false && error === "") {
      setOpenSnack(true);
    }
  }, [loading, error]);

  return (
    <Stack direction={"column"} gap={4} position={"sticky"} top={0}>
      <Stack direction={"row"} gap={2}>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            height: "53px !important",
            fontWeight: "700 !important",
            fontSize: "18px !important",
            borderRadius: "4px !important",
          }}
        >
          Play Now
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            height: "53px !important",
            background: "white !important",
            fontWeight: "700 !important",
            fontSize: "18px !important",
            borderRadius: "4px !important",
          }}
          onClick={() => setOpen(true)}
        >
          Write a Review
        </Button>
      </Stack>
      <Stack
        direction={"column"}
        p={"24px"}
        gap={4}
        bgcolor={palette.colorRelate?.colorBtn}
      >
        <Text color={palette.textWhite} fontSize={"16px"}>
          {gameById.description}
        </Text>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          {gameById &&
            gameById.genreName &&
            gameById.genreName.length > 0 &&
            gameById.genreName.map((item, index) => {
              return (
                <Text
                  key={index}
                  color={palette.greenColorText}
                  fontSize={"12px"}
                  fontWeight={600}
                  textTransform={"uppercase"}
                  sx={{
                    backgroundColor: palette.greenColorButton,
                    padding: "4px 8px",
                    borderRadius: "4px",
                    width: "max-content",
                    border: `1px solid ${palette.colorBorderTag}`,
                  }}
                >
                  {item}
                </Text>
              );
            })}
        </Stack>
        <Stack direction={"column"} gap={2}>
          {option.map((item, index) => {
            return (
              <Stack key={index} direction={"row"} gap={1} alignItems={"end"}>
                <Text color={palette.colorTextGray} fontSize={"16px"}>
                  {item.title}
                </Text>
                <hr
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: `1px dashed ${palette.colorRelate?.borderColor}`,
                    marginBottom: 6,
                  }}
                />

                {index === 2 ? (
                  <GetIcon array={getPlatform(item.value as any[])} />
                ) : (
                  <Text color={"white"} fontSize={"16px"}>
                    {item.value as string}
                  </Text>
                )}
              </Stack>
            );
          })}
        </Stack>

        <Stack>
          <Button
            variant="contained"
            sx={{
              borderRadius: "8px !important",
              fontWeight: "700 !important",
              fontSize: "18px !important",
            }}
            onClick={() => setOpenDialog(true)}
          >
            Share
          </Button>
        </Stack>
      </Stack>
      <DialogShare
        open={openDialog}
        setOpen={setOpenDialog}
        pathname={pathname}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={"sm"}
        sx={{
          "& .mui-1hp2eyy-MuiPaper-root-MuiDialog-paper": {
            backgroundImage: "inherit !important",
          },
        }}
      >
        <DialogContent>
          <Stack direction={"column"} gap={4}>
            <Text color={"white"} fontSize={"31.2px"} fontWeight={700}>
              Write a review for War of Nova
            </Text>
            <Text color={palette.colorTextGray} fontSize={"16px"}>
              Please describe what you liked or disliked about this game and
              whether you recommend it to others. Please remember to be polite
              and follow the Rules and Guidelines.
            </Text>
            <Stack direction={"column"} gap={1}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Text>Your Review</Text>
                <Text fontSize={"14px"}>{value.length} / 500 characters</Text>
              </Stack>
              <TextField
                multiline
                rows={4}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text fontSize={"14px"}>Choose a rating:</Text>
              <Stack direction={"row"} alignItems={"center"} gap={0.5}>
                {Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <Stack
                      key={index}
                      height={36}
                      width={36}
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={"4px"}
                      onClick={() => setRate(index + 1)}
                      sx={{
                        border: `1px solid ${rate === index + 1 ? thumbColor(rate, 0.2) : palette.bgMenuHover}`,
                        background:
                          rate === index + 1 ? thumbColor(rate) : undefined,
                        "&:hover": {
                          cursor: "pointer",
                          background: thumbColor(index + 1),
                        },
                      }}
                    >
                      <Text fontSize={"14px"}>{index + 1}</Text>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
            <Stack width={"100%"}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "8px !important",
                }}
                onClick={handleSubmit}
              >
                Submit your review
              </Button>
            </Stack>
          </Stack>
          <Snackbared
            open={openSnack}
            setOpen={setOpenSnack}
            message={(error ?? "").length > 0 ? "Error" : "Success"}
            status={(error ?? "").length > 0 ? "error" : "success"}
            handleClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default memo(InfoOverview);
