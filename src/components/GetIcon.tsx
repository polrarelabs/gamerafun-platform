/* eslint-disable @typescript-eslint/no-explicit-any */
import AndroidIcon from "@icons/web3/AndroidIcon";
import IosIcon from "@icons/web3/IosIcon";
import MacIcon from "@icons/web3/MacIcon";
import WebsiteIcon from "@icons/web3/WebsiteIcon";
import WindowsIcon from "@icons/web3/WindowsIcon";
import { Stack } from "@mui/material";
import { palette } from "public/material";
import { memo } from "react";

interface PropsGetIcon {
  array: string[];
}

const Icons = (value: string) => {
  switch (value) {
    case "WINDOWS":
      return <WindowsIcon sx={{ fontSize: 14 }} />;
    case "MACOS":
      return <MacIcon sx={{ fontSize: 14 }} />;
    case "ANDROID":
      return <AndroidIcon sx={{ fontSize: 14 }} />;
    case "WEB":
      return <WebsiteIcon sx={{ fontSize: 14 }} />;
    default:
      return <IosIcon sx={{ fontSize: 14 }} />;
  }
};

const GetIcon = ({ array }: PropsGetIcon) => {
  const arrayNew: any[] = [];
  if (array && array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      arrayNew.push(Icons(array[i]));
    }
  }
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      gap={1}
      justifyContent={"center"}
    >
      {arrayNew &&
        arrayNew.length > 0 &&
        arrayNew.map((icon, index) => {
          return (
            <Stack
              key={index}
              direction={"row"}
              alignItems={"center"}
              color={palette.colorGray}
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
