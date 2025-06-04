"use client";
import { Stack } from "@mui/material";
import { useQuest } from "@store/quests";
import React, { memo, useEffect } from "react";
import CardQuest from "./components/CardQuest";
import { palette } from "public/material";
import { Button, Text } from "@components/shared";
import { useRouter } from "next/navigation";
import { QUESTS_PATH } from "@constant/paths";
import { BannerJoin } from "../News";

const LayoutQuest = () => {
  const { quest, getQuest } = useQuest();

  useEffect(() => {
    getQuest({});
  }, []);

  const router = useRouter();

  return (
    <Stack gap={2} position={"relative"}>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
        onClick={() => router.push(`${QUESTS_PATH}/create-quest`)}
      >
        Create Quest
      </Button>
      <Text color="white" fontSize={"34px"} fontWeight={700}>
        Quests
      </Text>

      <Stack
        display={"grid"}
        gridTemplateColumns={{
          lg: "repeat(4,1fr)",
          md: "repeat(3,1fr)",
          sm: "repeat(2,1fr)",
          xs: "repeat(1,1fr)",
        }}
        gap={2}
      >
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
