import AndroidIcon from "@icons/AndroidIcon";
import IosIcon from "@icons/IosIcon";
import MacIcon from "@icons/MacIcon";
import WebsiteIcon from "@icons/WebsiteIcon";
import WindowsIcon from "@icons/WindowsIcon";
import { Stack } from "@mui/material";
import { memo } from "react";

interface PropsGetIcon {
  array: string[];
}

const GetIcon = ({ array }: PropsGetIcon) => {
  const arrayNew: any[] = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "WINDOWS") arrayNew.push(<WindowsIcon />);
    else if (array[i] === "MAC") arrayNew.push(<MacIcon />);
    else if (array[i] === "WEB") arrayNew.push(<WebsiteIcon />);
    else if (array[i] === "ANDROID") arrayNew.push(<AndroidIcon />);
    else if (array[i] === "IOS") arrayNew.push(<IosIcon />);
  }
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      gap={{ md: 2, xs: 1 }}
      justifyContent={"center"}
    >
      {arrayNew.map((icon, index) => {
        return (
          <Stack
            key={index}
            direction={"row"}
            alignItems={"center"}
            fontSize={16}
            color={"#9CA3AF"}
            justifyContent={"center"}
          >
            {icon}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default memo(GetIcon);
