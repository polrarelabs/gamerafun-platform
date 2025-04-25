"use client";

import { memo } from "react";
import {
  Tooltip as MuiTooltip,
  TooltipProps,
  Zoom,
  tooltipClasses,
} from "@mui/material";

const Tooltip = (props: TooltipProps) => {
  const { children, sx, ...rest } = props;

  return (
    <MuiTooltip
      placement="top"
      slotProps={{
        popper: {
          sx: {
            [`& .${tooltipClasses.tooltip}`]: {
              ...defaultSx.tooltip,
              ...sx,
            },
            [`& .${tooltipClasses.arrow}`]: {
              color: "background.paper",
            },
          },
        },
      }}
      slots={{
        transition: Zoom,
      }}
      {...rest}
    >
      {children}
    </MuiTooltip>
  );
};

export default memo(Tooltip);

const defaultSx = {
  tooltip: {
    backgroundColor: "background.paper",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.2,
    color: "text.primary",
    px: 1.5,
    py: 1,
    border: "1px solid",
    borderRadius: 2,
    borderColor: "grey.800",
    boxShadow: "0px 4px 32px 0px rgba(0, 16, 61, 0.16)",
  },
};
