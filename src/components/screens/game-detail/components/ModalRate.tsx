"use client";

import DialogLayout from "@components/DialogLayout";
import { Button, Snackbared, Text, TextField } from "@components/shared";
import { thumbColor } from "@components/shared/helper";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useParams } from "next/navigation";
import { palette } from "public/material";
import { memo, useEffect, useState } from "react";

interface ModalRateProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalRate = ({ open, setOpen }: ModalRateProps) => {
  const { createRate, loading, error } = useGame();
  const params = useParams();
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    if (loading === false && error === "") {
      setOpenSnack(true);
    }
  }, [loading, error]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    createRate({
      gameId: Number(params.slug),
      review: value,
      score: rate,
    });
  };

  return (
    <DialogLayout open={open} onClose={handleClose} fullWidth widthDialog={700}>
      <Stack direction={"column"} gap={4}>
        <Text color={"white"} fontSize={"31.2px"} fontWeight={700}>
          Write a review for War of Nova
        </Text>
        <Text color={palette.colorTextGray} fontSize={"16px"}>
          Please describe what you liked or disliked about this game and whether
          you recommend it to others. Please remember to be polite and follow
          the Rules and Guidelines.
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
          direction={{ md: "row", xs: "column" }}
          alignItems={{ md: "center", xs: "start" }}
          justifyContent={"space-between"}
          gap={2}
        >
          <Text fontSize={"14px"}>Choose a rating:</Text>
          <Stack
            display={"grid"}
            gridTemplateColumns={{ sm: "repeat(10,1fr)", xs: "repeat(8, 1fr)" }}
            alignItems={"center"}
            gap={0.5}
            justifyContent={"center"}
          >
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
    </DialogLayout>
  );
};

export default memo(ModalRate);
