import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const PanelIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      fontSize="inherit"
      {...props}
    >
      <g clipPath="url(#PanelLeftClose_svg__a)">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          fill="none"
          d="M4.791 14.5v-13m8.653 13H2.556c-.413 0-.809-.152-1.1-.423A1.394 1.394 0 0 1 1 13.055V2.945C1 2.147 1.696 1.5 2.556 1.5h10.888c.86 0 1.556.647 1.556 1.445v10.11c0 .798-.697 1.445-1.556 1.445Z"
        />
        <path
          fill="currentColor"
          d="M8.017 7.618a.4.4 0 0 0 0 .566l2.4 2.4a.4.4 0 0 0 .683-.283v-4.8a.4.4 0 0 0-.683-.283l-2.4 2.4Z"
        />
      </g>
      <defs>
        <clipPath id="PanelLeftClose_svg__a">
          <path d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default memo(PanelIcon);
