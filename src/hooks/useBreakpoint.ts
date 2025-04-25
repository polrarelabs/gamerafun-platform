"use client";

import { useCallback, useEffect, useState } from "react";
import useEventListener from "./useEventListener";
import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | undefined>("xs");
  const { breakpoints } = useTheme();

  const isXsSmaller = useMediaQuery(breakpoints.down("xs"));
  const isSmSmaller = useMediaQuery(breakpoints.down("sm"));

  const isMdSmaller = useMediaQuery(breakpoints.down("md"));
  const isLgSmaller = useMediaQuery(breakpoints.down("lg"));
  const isELgSmaller = useMediaQuery(breakpoints.down("elg" as Breakpoint));
  const isXlSmaller = useMediaQuery(breakpoints.down("xl"));

  const onGetBreakpoint = useCallback(() => {
    const currentBreakpoint = getCurrentBreakpoint(breakpoints.values) || "xs";
    setBreakpoint(currentBreakpoint);
  }, [breakpoints]);

  useEventListener("resize", onGetBreakpoint);

  useEffect(() => {
    onGetBreakpoint();
  }, [onGetBreakpoint]);

  return {
    breakpoint,
    isXsSmaller,
    isSmSmaller,
    isMdSmaller,
    isLgSmaller,
    isELgSmaller,
    isXlSmaller,
  };
};

export default useBreakpoint;

const getCurrentBreakpoint = (breakpoints: { [key: string]: number }) => {
  if (typeof window === "undefined") return;
  let currentBreakpoint;
  let biggestBreakpointValue = 0;
  for (const breakpoint of Object.keys(breakpoints)) {
    const breakpointValue = breakpoints[breakpoint];

    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }

  return currentBreakpoint as Breakpoint;
};
