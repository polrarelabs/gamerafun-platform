"use client";
import { Text } from "@components/shared";
import { SCREEN_PX } from "@constant";
import { Stack } from "@mui/material";
import { useQuest } from "@store/quests";
import { useRouter } from "next/navigation";
import { palette } from "public/material";
import { memo, useEffect } from "react";
import CardQuest from "./CardQuest";

const LayoutQuest = () => {
  const { quest, getQuest } = useQuest();

  useEffect(() => {
    getQuest({});
  }, []);

  const router = useRouter();

  return (
    <Stack gap={2} position={"relative"} px={SCREEN_PX}>
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
                borderRadius: "5px",
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
