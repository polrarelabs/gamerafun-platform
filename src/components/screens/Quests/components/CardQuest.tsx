"use client";

import { getImageSrc } from "@components/helper";
import { Button, Image, MobileSteppered, Text } from "@components/shared";
import { QUESTS_PATH } from "@constant/paths";
import { Stack, SxProps } from "@mui/material";
import { QuestItems } from "@store/quests/type";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import img from "public/images/img-bg-login.png";
import { palette } from "public/material";
import { memo, useState } from "react";

interface CardQuestProps {
  sx?: SxProps;
  data: QuestItems;
  witdhMax?: number | null;
  isDragging?: boolean;
}

const CardQuest = ({
  sx,
  data,
  witdhMax = null,
  isDragging,
}: CardQuestProps) => {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState<number>(0);

  const [hover, setHover] = useState<boolean>(false);

  const handleClick = () => {
    router.push(`${QUESTS_PATH}/${data.id}`);
  };

  return (
    <Stack direction={"column"} sx={{ ...sx }}>
      <Stack
        p={"2px"}
        width="100%"
        height="100%"
        gap={2}
        sx={{
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          background: palette.colorGame?.colorBoderLinear1,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Stack
          position={"relative"}
          justifyContent={"center"}
          component={motion.section}
          zIndex={2}
        >
          <Image
            src={getImageSrc("1", img)}
            alt={`img-${img}`}
            size={"100%"}
            aspectRatio={2 / 2}
            sizes={witdhMax ? witdhMax : "414px"}
            draggable={false}
            containerProps={{
              sx: {
                width: witdhMax ? witdhMax : "414px",
                height: "100%",
                overflow: "hidden",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                border: "1px",
                borderColor: palette.borderColorLinear,
                "& img": {
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "all 0.3s ease-in-out",
                },
              },
            }}
          />

          <Stack
            position="absolute"
            width="100%"
            bottom={0}
            left="0"
            overflow="hidden"
          >
            <motion.div
              style={{ width: "100%" }}
              variants={{
                open: { y: 0, transition: { duration: 0.3 } },
                close: { y: "calc(100% - 70px)" },
              }}
              animate={hover ? "open" : "close"}
            >
              <Stack px={4} direction="column" pb={2} gap={2}>
                <Stack>
                  <Text color="white" fontWeight={700} fontSize={"24px"}>
                    {data.name}
                  </Text>
                  <Text
                    color={palette.colorGray}
                    fontWeight={400}
                    fontSize={"14px"}
                    textTransform={"uppercase"}
                  >
                    {data.description}
                  </Text>
                </Stack>

                {data.participants && data.participants.length > 0 ? (
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: "4px !important",
                      color: "white !important",
                      border: "1px solid white !important",
                      "&:hover": {
                        background: "white !important",
                        color: "black !important",
                      },
                    }}
                    onClick={handleClick}
                  >
                    Explore Missions
                  </Button>
                ) : (
                  <Stack direction={"row"} gap={2} width={"100%"}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: "4px !important",
                        color: "white !important",
                        border: "1px solid white !important",
                        "&:hover": {
                          background: "white !important",
                          color: "black !important",
                        },
                        width: "100% !important",
                      }}
                      // onClick={handleClick}
                    >
                      Missions
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: "4px !important",
                        width: "100% !important",
                        fontWeight: "500 !important",
                        "&:hover": {
                          color: "black !important",
                        },
                      }}
                      // onClick={handleClick}
                    >
                      Start Quest
                    </Button>
                  </Stack>
                )}
              </Stack>
            </motion.div>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        px={"8px"}
        zIndex={3}
        my={2}
        sx={{
          height: "100%",
          width: "100%",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
        gap={1}
      >
        <MobileSteppered
          activeStep={activeStep}
          steps={data.missions && data.missions.length}
          sx={{
            "& .MuiLinearProgress-root": {
              backgroundColor: `${palette.colorModalShare?.bgStep} !important`,
              width: "100% !important",
              height: "7px !important",
              borderRadius: "9999px !important",
            },
          }}
        />
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text
            fontSize={"12px"}
            fontWeight={400}
            color={palette.colorReview?.textCopy}
            textTransform={"uppercase"}
          >
            missions
          </Text>
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
            / {data.missions && data.missions.length}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(CardQuest);
