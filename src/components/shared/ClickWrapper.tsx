"use client";

import { Box } from "@mui/material";
import React, { memo, useRef } from "react";

interface ClickWrapperProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const ClickWrapper = ({ onClick, children }: ClickWrapperProps) => {
  const startX = useRef(0);
  const startY = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const deltaX = Math.abs(e.clientX - startX.current);
    const deltaY = Math.abs(e.clientY - startY.current);

    if (deltaX < 5 && deltaY < 5) {
      onClick?.();
    }
  };

  return (
    <Box onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {children}
    </Box>
  );
};

export default memo(ClickWrapper);
