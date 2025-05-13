import { Button } from "@mui/material";
import { useState } from "react";
import ModalReview from "./ModalReview";
import { setToken } from "@api/helpers";
import { useRouter } from "next/navigation";

const LayoutModalReview = () => {
  const [open, setOpen] = useState<boolean>(false);
  const route = useRouter();
  const handleCreate = () => {
    if (setToken === null) {
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

export default LayoutModalReview;
