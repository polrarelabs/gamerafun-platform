"use client";

import { Stack } from "@mui/material";
import React, { memo } from "react";
import { CardRewards } from "./components";
import { Slider, Text } from "@components/shared";
import { palette } from "public/material";
import { useQuest } from "@store/quests";

const RewardsQuests = () => {
  const { questById } = useQuest();

  return (
    <Stack mt={2} gap={2}>
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <Text color="white" fontSize={"21px"} fontWeight={700}>
          Rewards
        </Text>
        <Text
          color={palette.colorReview?.textCopy}
          fontSize={"14px"}
          fontWeight={400}
        >
          0 / 1 claimed
        </Text>
      </Stack>

      {questById.rewards && (
        <>
          {questById.rewards.length > 6 ? (
            <Slider itemWidth={276} step={16} iconWhite={true}>
              {questById.rewards.map((item, index) => {
                return <CardRewards key={index} data={item} widthMax={276} />;
              })}
            </Slider>
          ) : (
            <Stack
              gap={2}
              display={"grid"}
              gridTemplateColumns={"repeat(6,1fr)"}
            >
              {questById.rewards.map((item, index) => {
                return <CardRewards key={index} data={item} />;
              })}
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};

export default memo(RewardsQuests);
