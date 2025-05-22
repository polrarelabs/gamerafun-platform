"use client";

import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const LogInIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.2872 9.63928L8.72723 12.1993L11.2872 14.7593"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9.76001 12.1992H19.93"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M11.76 20.1392C7.34001 20.1392 3.76001 17.1392 3.76001 12.1392C3.76001 7.13916 7.34001 4.13916 11.76 4.13916"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
};

export default memo(LogInIcon);
