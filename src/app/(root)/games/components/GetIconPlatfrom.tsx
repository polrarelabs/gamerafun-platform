import MacIcon from "@icons/MacIcon";
import WindowsIcon from "@icons/WindowsIcon";
import { Stack } from "@mui/material";
import { memo } from "react";

interface PropsGetIconPlatfrom {
  array: string[];
}

const GetIconPlatfrom = ({ array }: PropsGetIconPlatfrom) => {
  const arrayNew: any[] = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "STEAM") arrayNew.push(<WindowsIcon />);
    else if (array[i] === "EPIC") arrayNew.push(<MacIcon />);
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
            fontSize={24}
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

export default memo(GetIconPlatfrom);
