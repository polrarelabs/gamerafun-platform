"use client";
import { Stack } from "@mui/material";
import { useQuest } from "@store/quests";
import React, { memo, useEffect } from "react";
import CardQuest from "./components/CardQuest";
import { palette } from "public/material";
import { Text } from "@components/shared";

const LayoutQuest = () => {
  const { quest, getQuest } = useQuest();

  useEffect(() => {
    getQuest({});
  }, []);

  return (
    <Stack gap={2}>
      <Text color="white" fontSize={"34px"} fontWeight={700}>
        Quests
      </Text>

      <Stack display={"grid"} gridTemplateColumns={"repeat(4,1fr)"} gap={2}>
        {quest.map((item, index) => {
          return (
            <CardQuest
              key={index}
              data={item}
              sx={{
                border: `0.2px solid ${palette.colorReview?.colorBorder}`,
                borderRadius: "16px",
                padding: "4px",
              }}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default memo(LayoutQuest);
