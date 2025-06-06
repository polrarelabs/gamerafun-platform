"use client";

import { Box } from "@mui/material";
import React, { memo, useRef } from "react";

interface ClickWrapperProps {
  onClick?: () => void;
  children: React.ReactNode;
  isDragging?: boolean;
}

const ClickWrapper = ({ onClick, children, isDragging }: ClickWrapperProps) => {
  const startX = useRef(0);
  const startY = useRef(0);
  const threshold = 5;

  const handleStart = (clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
  };

  const handleEnd = (clientX: number, clientY: number) => {
    const deltaX = Math.abs(clientX - startX.current);
    const deltaY = Math.abs(clientY - startY.current);
    const isClick = deltaX < threshold && deltaY < threshold;

    if (isClick && !isDragging) {
      onClick?.();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    handleEnd(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    handleEnd(touch.clientX, touch.clientY);
  };

  return (
    <Box
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </Box>
  );
};

export default memo(ClickWrapper);

// "use client";

// import { Box } from "@mui/material";
// import React, { memo, useRef } from "react";

// interface ClickWrapperProps {
//   onClick?: () => void;
//   children: React.ReactNode;
// }

// const ClickWrapper = ({ onClick, children }: ClickWrapperProps) => {
//   const startX = useRef(0);
//   const startY = useRef(0);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     startX.current = e.clientX;
//     startY.current = e.clientY;
//   };

//   const handleMouseUp = (e: React.MouseEvent) => {
//     const deltaX = Math.abs(e.clientX - startX.current);
//     const deltaY = Math.abs(e.clientY - startY.current);

//     if (deltaX < 5 && deltaY < 5) {
//       onClick?.();
//     }
//   };

//   return (
//     <Box onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
//       {children}
//     </Box>
//   );
// };

// export default memo(ClickWrapper);
