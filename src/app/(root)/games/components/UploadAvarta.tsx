import { Button } from "@components/shared";
import { styled } from "@mui/material";
import React, { memo } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadAvarta = () => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      sx={{
        position: "absolute",
        borderRadius: "1000px",
        p: 10,
        width: 300,
        height: 300,
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
      }}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
        multiple
      />
    </Button>
  );
};

export default memo(UploadAvarta);
