import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const CircleIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </SvgIcon>
  );
};

export default memo(CircleIcon);
