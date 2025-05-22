import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const PanelOpenIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 16 16"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      fontSize="inherit"
      {...props}
    >
      <g clipPath="url(#PanelLeftOpen_svg__a)">
        <path
          fill="currentColor"
          d="M11.583 7.617a.4.4 0 0 1 0 .566l-2.4 2.4A.4.4 0 0 1 8.5 10.3V5.5a.4.4 0 0 1 .683-.283l2.4 2.4Z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          fill="none"
          d="M4.791 14.5v-13m8.653 13H2.556c-.413 0-.809-.152-1.1-.423A1.394 1.394 0 0 1 1 13.055V2.945C1 2.147 1.696 1.5 2.556 1.5h10.888c.86 0 1.556.647 1.556 1.445v10.11c0 .798-.697 1.445-1.556 1.445Z"
        />
      </g>
      <defs>
        <clipPath id="PanelLeftOpen_svg__a">
          <path d="M0 16h16V0H0z" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default memo(PanelOpenIcon);
