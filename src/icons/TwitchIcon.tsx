import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const TwitchIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" width="24" height="24" rx="12" fill="#9146FF" />
      <path
        d="M15.7681 12.8743L14.038 14.4795H12.3079L10.794 15.884V14.4795H8.84766V8.46005H15.7681V12.8743Z"
        fill="#9146FF"
      />
      <path
        d="M9.76095 6.78262L9.23922 7.30436L8.32617 13.1739L11.0653 14.6087L11.4566 15.1304L14.0653 14.2174L16.9349 12L17.0653 9.91306L16.9349 6.91306L16.5436 6.78262H9.76095Z"
        fill="white"
      />
      <path
        d="M9.44536 6.37125L7.28271 8.37772V15.601H9.87789V17.6075L12.0405 15.601H13.7707L17.6634 11.9894V6.37125H9.44536ZM16.7984 11.5881L15.0683 13.1933H13.3381L11.8243 14.5978V13.1933H9.87789V7.17384H16.7984V11.5881Z"
        fill="black"
      />
      <path
        d="M15.5008 8.57837H14.6357V10.9861H15.5008V8.57837Z"
        fill="black"
      />
      <path
        d="M13.1229 8.57837H12.2578V10.9861H13.1229V8.57837Z"
        fill="black"
      />
    </SvgIcon>
  );
};

export default memo(TwitchIcon);
