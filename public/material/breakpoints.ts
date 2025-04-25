import { Breakpoint } from "@mui/material";

export default {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1280,
    elg: 1400,
    xl: 1700,
    xxl: 2500,
  },
} as {
  values: { [key in Breakpoint]: number };
};
