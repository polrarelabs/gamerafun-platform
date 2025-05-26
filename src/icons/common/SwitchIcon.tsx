import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const SwitchIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fontSize="inherit"
      {...props}
    >
      <g clipPath="url(#clip0_2648_21239)">
        <path
          d="M0 15.1217L4.57006 19.6918C4.75213 19.8736 4.99892 19.9757 5.25623 19.9757C5.51354 19.9757 5.76033 19.8736 5.94238 19.6918L10.5125 15.1217L9.14018 13.7495L6.22721 16.6624V3.42163H4.28525L4.28525 16.6624L1.37232 13.7495L0 15.1217Z"
          fill="currentColor"
        />
        <path
          d="M20 4.85404L15.4299 0.283966C15.2479 0.102133 15.0011 1.12473e-08 14.7437 0C14.4865 -1.12473e-08 14.2396 0.102133 14.0576 0.283966L9.48755 4.85404L10.8598 6.22635L13.7728 3.31342V16.5542H15.7147V3.31342L18.6277 6.22635L20 4.85404Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_2648_21239">
          <rect width="20" height="20" fill="currentColor" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default memo(SwitchIcon);
