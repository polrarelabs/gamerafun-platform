import React, { memo } from "react";
import Button from "./Button";
import { palette } from "public/material";

interface ButtonFilltersProps {
  handleOpen: () => void;
}

const ButtonFillters = ({ handleOpen }: ButtonFilltersProps) => {
  return (
    <Button
      variant="contained"
      onClick={handleOpen}
      sx={{
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
    >
      Fillters
    </Button>
  );
};

export default memo(ButtonFillters);
