import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const MenuIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      fontSize="inherit"
      {...props}
    >
      <path
        d="M20 18H4C3.45 18 3 17.55 3 17C3 16.45 3.45 16 4 16H20C20.55 16 21 16.45 21 17C21 17.55 20.55 18 20 18ZM20 13H4C3.45 13 3 12.55 3 12C3 11.45 3.45 11 4 11H20C20.55 11 21 11.45 21 12C21 12.55 20.55 13 20 13ZM21 7C21 7.55 20.55 8 20 8H4C3.45 8 3 7.55 3 7C3 6.45 3.45 6 4 6H20C20.55 6 21 6.45 21 7Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(MenuIcon);
