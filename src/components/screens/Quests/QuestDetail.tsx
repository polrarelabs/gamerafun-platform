"use client";

import { getImageSrc } from "@components/helper";
import {
  BoxSelected,
  DialogShare,
  Image,
  MobileSteppered,
  Text,
} from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX, SCREEN_PY } from "@constant";
import { QUESTS_PATH } from "@constant/paths";
import ShareIcon from "@icons/common/ShareIcon";
import { Avatar, AvatarGroup, Stack } from "@mui/material";
import { useParams, usePathname } from "next/navigation";
import { default as avatar, default as img } from "public/images/img-local.png";
import { palette } from "public/material";
import { memo, useState } from "react";
import { CardRewards, Clock, MissionItem } from "./components";

const QuestDetail = () => {
  const activeStep = 2;

  const params = useParams();

  const pathname = usePathname();

  const [openShare, setOpenShare] = useState<boolean>(false);

  const [hover, setHover] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenShare(true);
  };

  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: QUESTS_PATH,
      title: "quest",
    },
    {
      title: params.slug as string,
    },
  ];

  return (
    <Stack position={"relative"}>
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
                // transition: "all 0.5s ease-in-out",
              },
            },
          }}
        />
      </Stack>

      <Stack gap={2} zIndex={3}>
        <MobileSteppered
          steps={6}
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

          <Stack display={"grid"} gridTemplateColumns={"repeat(2,1fr)"} gap={4}>
            <Stack gap={4}>
              <Stack>
                <Stack direction={"row"} alignItems={"center"} gap={2}>
                  <BoxSelected
                    value="active"
                    isClose={false}
                    isBorder={false}
                    border={true}
                    color={palette.colorQuests?.main}
                    bgColor={palette.colorQuests?.bgTags}
                    isPadding={false}
                  />
                  <Text
                    color={palette.colorQuests?.main}
                    fontSize={"12px"}
                    fontWeight={600}
                    textTransform={"uppercase"}
                  >
                    Ends in 17D 07H
                  </Text>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} gap={2}>
                  <Text fontSize={"44px"} fontWeight={700} color="white">
                    Peace and Quiet
                  </Text>
                  <ShareIcon
                    onClick={handleOpen}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        // background: palette.colorQuests?.bgMissionHover
                      },
                    }}
                  />
                </Stack>
              </Stack>
              <Stack width={100}>
                <Image
                  src={getImageSrc("data.mediaUrl[0]", img)}
                  alt={`img-${img}`}
                  size="100%"
                  aspectRatio={2 / 1}
                  sizes={100}
                  draggable={false}
                  containerProps={{
                    sx: {
                      width: 100,
                      height: 48,
                      overflow: "hidden",
                      borderRadius: "8px",

                      border: "1px",
                      borderColor: palette.borderColorLinear,
                      "& img": {
                        objectFit: "cover",
                        objectPosition: "center",
                        transition: "all 0.2s ease-in-out",
                      },
                    },
                  }}
                />
              </Stack>
              <Text color={palette.colorReview?.textCopy} fontSize={"18px"}>
                Moonfrost combines the charm of classic titles like Stardew
                Valley. Customize your farm, build relationships with a diverse
                cast of characters, and uncover the secrets of the mysterious
                Frost.
              </Text>
              <Text color={palette.colorReview?.textCopy} fontSize={"18px"}>
                Complete the missions below for a chance to win one of 75 Gnome
                Key NFTs and 20 Whitelist spots.
              </Text>
              <Stack
                direction={"row"}
                justifyContent={"start"}
                gap={1}
                alignItems={"center"}
              >
                <AvatarGroup
                  spacing={hover ? 10 : 15}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  sx={{
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={avatar.src}
                    sx={{ width: 44, height: 44 }}
                  />
                  <Avatar
                    alt="Travis Howard"
                    src={avatar.src}
                    sx={{ width: 44, height: 44 }}
                  />
                  <Avatar
                    alt="Agnes Walker"
                    src={avatar.src}
                    sx={{ width: 44, height: 44 }}
                  />
                </AvatarGroup>
                <Text fontSize={"14px"} color={palette.colorReview?.textCopy}>
                  +1000 completing
                </Text>
              </Stack>
            </Stack>
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
                    / 6
                  </Text>
                  <MobileSteppered
                    activeStep={activeStep}
                    steps={6}
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
                {Array.from({ length: 10 }).map((_, index) => {
                  return <MissionItem key={index} />;
                })}
              </Stack>
            </Stack>
          </Stack>

          <Stack mt={2} gap={2}>
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <Text color="white" fontSize={"21px"} fontWeight={700}>
                Raffle Information
              </Text>
              <Text
                color={palette.colorReview?.textCopy}
                fontSize={"14px"}
                fontWeight={400}
              >
                75 seats available
              </Text>
            </Stack>
            <Text color="white" fontSize={"21px"} fontWeight={500}>
              Join our Quest raffle for exclusive gaming rewards! Winners will
              be randomly selected and rewards distributed at the end of the
              Quest. Stay tuned to claim your prize.
            </Text>

            <Clock day={5} second={4} />
          </Stack>

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
            <Stack
              gap={2}
              display={"grid"}
              gridTemplateColumns={"repeat(6,1fr)"}
            >
              <CardRewards />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <DialogShare
        open={openShare}
        setOpen={setOpenShare}
        pathname={pathname}
      />
    </Stack>
  );
};

export default memo(QuestDetail);
