"use client";

import { Button, Image, Text } from "@components/shared";
import { MobileStepper, Stack, SxProps } from "@mui/material";
import { palette } from "public/material";
import React, { memo, useState } from "react";
import img from "public/images/img-bg-login.png";
import { motion } from "framer-motion";
import { QuestItems } from "@store/quests/type";

interface CardQuestProps {
  sx?: SxProps;
  data: QuestItems;
}

const CardQuest = ({ sx, data }: CardQuestProps) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getImageSrc = (url: string) => {
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      return url;
    }
    return img;
  };

  const [hover, setHover] = useState<boolean>(false);

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
            src={getImageSrc("1")}
            alt={`img-${img}`}
            size={"100%"}
            aspectRatio={2 / 2}
            sizes={"414px"}
            draggable={false}
            containerProps={{
              sx: {
                width: "100%",
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

          {/* overlay text block */}
          <Stack
            position="absolute"
            width="100%"
            bottom={0}
            left="0"
            overflow="hidden"
          >
            <motion.div
              style={{ width: "100%" }}
              // animate={{
              //   y: hover ? 0 : 'calc(100% - 80px)',
              // }}
              // transition={{ duration: 0.4, ease: 'easeInOut' }}
              variants={{
                open: { y: 0, transition: { duration: 0.3 } },
                close: { y: "calc(100% - 70px)" },
              }}
              animate={hover ? "open" : "close"}
            >
              <Stack px={4} direction="column" pb={2} gap={2}>
                <Stack>
                  <Text color="white" fontWeight={700} fontSize={"24px"}>
                    Spekter Agent
                  </Text>
                  <Text
                    color={palette.colorGray}
                    fontWeight={400}
                    fontSize={"14px"}
                    textTransform={"uppercase"}
                  >
                    Eliminate all the restless spirits to become the
                  </Text>
                </Stack>
                <Stack>
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
                  >
                    Explore Missions
                  </Button>
                </Stack>
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
      >
        <MobileStepper
          variant="progress"
          steps={6}
          position="static"
          activeStep={activeStep}
          sx={{
            flexGrow: 1,
            "& .mui-j9l60e-MuiLinearProgress-root-MuiMobileStepper-progress": {
              width: "100% !important",
              height: "7px !important",
              borderRadius: "9999px",
              background: `${palette.colorModalShare?.bgStep}`,
            },
          }}
          backButton={<div />}
          nextButton={<div />}
        />
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={"8px"}
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
            1 / 6
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(CardQuest);
