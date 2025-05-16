"use client";
import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const TrashIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fontSize="inherit"
      {...props}
    >
      <path
        d="M19 6L5 6M14 5L10 5M6 10L6 20C6 20.6666667 6.33333333 21 7 21 7.66666667 21 11 21 17 21 17.6666667 21 18 20.6666667 18 20 18 19.3333333 18 16 18 10"
        fill="none"
      />
    </SvgIcon>
  );
};

export default memo(TrashIcon);
