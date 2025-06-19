"use client";

import React, { memo } from "react";
import { Stack } from "@mui/material";
import { palette } from "public/material";
import { MobileSteppered, Text } from "@components/shared";
import { useQuest } from "@store/quests";
import MissionItem from "./MissionItem";

interface MissionQuestState {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const MissionQuests = ({ activeStep, setActiveStep }: MissionQuestState) => {
  const { questById } = useQuest();

  return (
    <Stack gap={2} maxHeight={423}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Text
          color={palette.colorQuests?.main}
          fontSize={"14px"}
          textTransform={"uppercase"}
          fontWeight={500}
        >
          missions
        </Text>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Text
            fontSize={"12px"}
            fontWeight={400}
            color={palette.colorReview?.textCopy}
            textTransform={"uppercase"}
          >
            <span
              style={{
                color: palette.colorQuests?.main,
              }}
            >
              {activeStep}
            </span>{" "}
            / {questById.missions && questById.missions.length}
          </Text>
          <MobileSteppered
            activeStep={activeStep}
            steps={questById.missions && questById.missions.length}
            sx={{
              "& .MuiLinearProgress-root": {
                backgroundColor: `${palette.colorModalShare?.bgStep} !important`,
                width: "120px !important",
                height: "7px !important",
                borderRadius: "9999px !important",
              },
              "& .MuiLinearProgress-bar": {
                backgroundColor: `primary.main !important`,
              },
            }}
          />
        </Stack>
      </Stack>
      <Stack
        height={"100%"}
        overflow={"auto"}
        gap={"4px"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "6px",
            backgroundColor: "#222",
            borderRadius: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "6px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
        }}
      >
        {questById.missions &&
          questById.missions.map((item, index) => {
            return (
              <MissionItem
                key={index}
                data={item}
                setActiveStep={setActiveStep}
              />
            );
          })}
      </Stack>
    </Stack>
  );
};

export default memo(MissionQuests);
