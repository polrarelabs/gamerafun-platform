import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const XIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill="black" />
      <path
        d="M6.31977 6.55295L10.8738 12.625L6.29102 17.5619H7.32242L11.3346 13.2396L14.5764 17.5619H18.0863L13.2761 11.1483L17.5417 6.55295H16.5103L12.8152 10.5337L9.82968 6.55295H6.31977ZM7.83653 7.31055H9.44899L16.5693 16.8042H14.9569L7.83653 7.31055Z"
        fill="white"
      />
    </SvgIcon>
  );
};

export default memo(XIcon);
