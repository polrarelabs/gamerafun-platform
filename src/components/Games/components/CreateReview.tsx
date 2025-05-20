"use client";

import { Button } from "@mui/material";
import { memo, useState } from "react";
import ModalReview from "./ModalReview";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const CreateReview = () => {
  const [open, setOpen] = useState<boolean>(false);
  const route = useRouter();
  const handleCreate = () => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      route.push("/login");
      return;
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      <Button
        size={"large"}
        fullWidth
        sx={{
          color: "black !important",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "grey[200]",
            color: "black",
          },
        }}
        onClick={() => handleCreate()}
      >
        Write a Review
      </Button>
      <ModalReview open={open} setOpen={setOpen} />
    </>
  );
};

export default memo(CreateReview);
