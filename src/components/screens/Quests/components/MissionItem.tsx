"use client";

import { Text } from "@components/shared";
import ArrowLongIcon from "@icons/common/ArrowLongIcon";
import SquareIcon from "@icons/common/SquareIcon";
import { Checkbox, Stack } from "@mui/material";
import { MisstionItems } from "@store/quests/type";
import { palette } from "public/material";
import React, { memo, useState } from "react";

interface MissionItemState {
  data: MisstionItems;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  isClose?: boolean;
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const MissionItem = ({
  data,
  setActiveStep,
  isClose = false,
}: MissionItemState) => {
  const [hover, setHover] = useState<boolean>(false);
  const [checkbox, setCheckbox] = useState<boolean>(false);

  const handleClick = () => {
    setCheckbox(!checkbox);
    if (checkbox === false) setActiveStep((pre) => pre + 1);
    else setActiveStep((pre) => pre - 1);
  };

  return (
    <Stack
      sx={{
        background: palette.colorQuests?.bgMission,
        "&:hover": {
          background: palette.colorQuests?.bgMissionHover,
        },
        padding: "16px 24px",
        borderRadius: "4px",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Checkbox
          {...label}
          checked={checkbox}
          sx={{
            "&.Mui-checked": {
              color: palette.colorQuests?.main,
            },
            width: "fit-content",
          }}
          icon={
            <SquareIcon
              sx={{
                color: hover
                  ? palette.colorQuests?.bgCheckboxHover
                  : palette.colorQuests?.bgCheckbox,
              }}
            />
          }
        />
        <Text
          fontSize={"16px"}
          color={hover ? "white" : palette.colorQuests?.colorMission}
        >
          {data.name}
        </Text>
      </Stack>
      <Stack>
        <ArrowLongIcon
          sx={{
            color: palette.colorQuests?.main,
            rotate: "180deg",
            transform: hover ? " scaleX(1) " : " scaleX(0.5) ",
            transformOrigin: "left",
            transition: "transform 0.3s cubic-bezier(.4,2,.6,1)",
            opacity: hover ? 1 : 0,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default memo(MissionItem);
