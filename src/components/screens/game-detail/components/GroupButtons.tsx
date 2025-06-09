"use client";

import { Button } from "@components/shared";
import { Stack } from "@mui/material";
import { memo, useState } from "react";
import ModalRate from "./ModalRate";

const GroupButtons = () => {
  const [open, setOpen] = useState<boolean>(false);
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

      <ModalRate open={open} setOpen={setOpen} />
    </Stack>
  );
};

export default memo(GroupButtons);
