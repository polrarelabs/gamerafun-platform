"use client";

import { MobileStepper, SxProps } from "@mui/material";
import { palette } from "public/material";
import React, { memo } from "react";

interface MobileSteppers {
  activeStep: number;
  steps: number;
  sx?: SxProps;
}

const MobileSteppered = ({ steps, activeStep, sx }: MobileSteppers) => {
  return (
    <MobileStepper
      variant="progress"
      steps={steps}
      position="static"
      activeStep={activeStep}
      sx={{
        flexGrow: 1,
        padding: 0,
        "& .MuiLinearProgress-root": {
          backgroundColor: `${palette.colorModalShare?.bgStep} !important`,
          width: "100% !important",
        },
        "& .MuiLinearProgress-bar": {
          backgroundColor: `${palette.colorQuests?.main} !important`,
        },
        ...sx,
      }}
      backButton={<div />}
      nextButton={<div />}
    />
  );
};

export default memo(MobileSteppered);
