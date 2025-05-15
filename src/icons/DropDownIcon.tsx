"use client";
import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const DropDownIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.577085 0.410747C0.902522 0.085309 1.43016 0.085309 1.7556 0.410747L6.99967 5.65482L12.2438 0.410747C12.5692 0.085309 13.0968 0.085309 13.4223 0.410747C13.7477 0.736183 13.7477 1.26382 13.4223 1.58926L7.58893 7.42259C7.26349 7.74803 6.73586 7.74803 6.41042 7.42259L0.577085 1.58926C0.251649 1.26382 0.251649 0.736183 0.577085 0.410747Z"
        fill="white"
      />
    </SvgIcon>
  );
};

export default memo(DropDownIcon);
