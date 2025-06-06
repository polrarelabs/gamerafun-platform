"use client";

import { Button, Snackbared, Text, TextField } from "@components/shared";
import { thumbColor } from "@components/shared/helper";
import { Dialog, DialogContent, Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useParams } from "next/navigation";
import { palette } from "public/material";
import { memo, useEffect, useState } from "react";

const GroupButtons = () => {
  const { createRate, loading, error } = useGame();
  const params = useParams();

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
    <Stack direction={"row"} gap={2}>
      <Button
        variant="contained"
        sx={{
          height: "53px !important",
          fontWeight: "700 !important",
          fontSize: "18px !important",
          borderRadius: "5px !important",
        }}
        fullWidth
      >
        Play Now
      </Button>
      <Button
        variant="contained"
        sx={{
          height: "53px !important",
          background: "white !important",
          fontSize: "18px !important",
          fontWeight: "700 !important",
          borderRadius: "5px !important",
        }}
        onClick={() => setOpen(true)}
        fullWidth
      >
        Write a Review
      </Button>

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
                      borderRadius={"5px"}
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
                  borderRadius: "5px !important",
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

export default memo(GroupButtons);
