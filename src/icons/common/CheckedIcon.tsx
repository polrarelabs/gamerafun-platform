"use client";
import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const CheckedIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_301_9502)">
        <path
          d="M9.99974 15.172L19.1917 5.979L20.6067 7.393L9.99974 18L3.63574 11.636L5.04974 10.222L9.99974 15.172Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_301_9502">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default memo(CheckedIcon);
