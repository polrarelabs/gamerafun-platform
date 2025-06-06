"use client";

import { Image, MobileSteppered } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX, SCREEN_PY } from "@constant";
import { QUESTS_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { useParams } from "next/navigation";
import img from "public/images/img-local.webp";
import { palette } from "public/material";
import { memo, useEffect, useState } from "react";
import InfoQuest from "./InfoQuest";
import MissionQuests from "./MissionQuests";
import RaffleInfor from "./RaffleInfor";
import RewardsQuests from "./RewardsQuests";
import { useQuest } from "@store/quests";
import useBreakpoint from "@hooks/useBreakpoint";

const QuestDetail = () => {
  const params = useParams();

  const { questById, getQuestById } = useQuest();

  const { isMdSmaller } = useBreakpoint();

  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    getQuestById(Number(params.slug));
  }, []);

  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: QUESTS_PATH,
      title: "quest",
    },
    {
      title: questById.name,
    },
  ];

  return (
    <Stack position={"relative"}>
      {/* background */}
      <Stack
        position={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        zIndex={2}
        sx={{
          background: palette.colorQuests?.bgLinear,
          opacity: 0.5,
        }}
      />
      <Stack
        position={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        zIndex={1}
      >
        <Image
          src={img}
          alt={`img-${img}`}
          size="100%"
          aspectRatio={3 / 2}
          sizes={`1920px`}
          containerProps={{
            sx: {
              width: `100%`,
              height: "100%",
              overflow: "hidden",
              opacity: 0.1,
              border: "1px",
              borderColor: palette.borderColorLinear,
              "& img": {
                objectFit: "cover",
                objectPosition: "center",
              },
            },
          }}
        />
      </Stack>

      <Stack gap={2} zIndex={3}>
        <MobileSteppered
          steps={questById.missions && questById.missions.length}
          activeStep={activeStep}
          sx={{
            "& .MuiLinearProgress-root": {
              backgroundColor: `${palette.colorModalShare?.bgStep} !important`,
              width: "100% !important",
              height: "4px !important",
              borderRadius: "0px !important",
            },
          }}
        />
        <Stack px={SCREEN_PX} py={SCREEN_PY} gap={4}>
          <Breadcumbs breadcumbs={breadcrumbs} />
          <Stack
            display={{ md: "grid" }}
            gridTemplateColumns={"repeat(2,1fr)"}
            gap={4}
            direction={{ md: "row", xs: "column" }}
          >
            <InfoQuest />
            <MissionQuests
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </Stack>

          <RaffleInfor />

          <RewardsQuests />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(QuestDetail);
