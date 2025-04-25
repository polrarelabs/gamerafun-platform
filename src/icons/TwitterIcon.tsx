import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const TwitterIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      fontSize="inherit"
      {...props}
    >
      <path
        d="M3.44543 3.6001L10.5778 13.0767L3.40039 20.7816H5.01574L11.2996 14.0358L16.3767 20.7816H21.8738L14.3401 10.7719L21.0208 3.6001H19.4055L13.6184 9.81279L8.94253 3.6001H3.44543ZM5.82092 4.78247H8.3463L19.498 19.599H16.9726L5.82092 4.78247Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(TwitterIcon);
