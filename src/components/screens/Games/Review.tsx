"use client";

import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import CreateReview from "./components/CreateReview";
import About from "./components/About";
import { Image, Text } from "@components/shared";
import bgSlider from "public/images/banner.webp";
import CheckIcon from "@icons/CheckIcon";
import CheckFailIcon from "@icons/CheckFailIcon";
import { memo, useState } from "react";
import ModalShare from "./components/ModalShare";
import SimilarGameReviews from "./components/SimilarGameReviews";
import Share from "./components/Share";
import { palette } from "public/material";
import { useGame } from "@store/game";
const Review = () => {
  const { dataGetGameId: data } = useGame();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClickModalShare = () => {
    setIsOpen(true);
  };
  return (
    <>
      <CreateReview />
      <Stack
        direction={"row"}
        my={4}
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ width: 60, height: 60 }} src="/images/img-logo.png" />
          <Stack direction={"column"} spacing={1}>
            <Text fontSize={18} fontWeight={600}>
              Mostafa Salem
            </Text>
            <Text fontSize={16} fontWeight={400}>
              Head of Gaming Research
            </Text>
          </Stack>
        </Stack>
        <Text>Updated:06/09/2023 . Posted:15/10/2022</Text>
      </Stack>
      {data.description ? (
        <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
      ) : (
        <>
          <Typography variant="h2" component="h2" gutterBottom sx={{ my: 2 }}>
            Introduce
          </Typography>
          <Typography variant="h2" component="h2" gutterBottom sx={{ my: 2 }}>
            GamePlay
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Image
              src={bgSlider}
              alt={`img-${bgSlider}`}
              aspectRatio={ASPECT_RATIO}
              containerProps={{
                sx: {
                  overflow: "hidden",
                  borderRadius: "16px",
                  border: "1px",
                  borderColor: palette.borderColorLinear,
                  "& img": {
                    width: "100% !important",
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "all 0.5s ease-in-out",
                    display: "block",
                  },
                },
              }}
            />
          </Box>
        </>
      )}
      <Stack
        direction={"row"}
        gap={4}
        width={"100%"}
        my={4}
        sx={{
          alignItems: "flex-start",
          padding: "2rem",
          backgroundColor: "#121926",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            width: "50%",
          }}
        >
          <Stack gap={2}>
            <Text variant={"h3"} sx={{ color: palette.greenColorText }}>
              Pros
            </Text>
            <Stack direction={"row"} gap={3}>
              <CheckIcon />
              <Text sx={{ fontSize: "1.125rem", lineHeight: "1.75rem" }}>
                TBA
              </Text>
            </Stack>
          </Stack>
          <Stack gap={2}>
            <Text variant={"h3"} sx={{ color: palette.colorTextRed }}>
              Cons
            </Text>
            <Stack direction={"row"} gap={3}>
              <CheckFailIcon />
              <Text sx={{ fontSize: "1.125rem", lineHeight: "1.75rem" }}>
                TBA
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Box mx={"40%"} width={"100%"}>
        <Button
          variant="contained"
          sx={{
            borderRadius: "8px !important",
            height: "40px !important",
            color: `${palette.colorTextGray} !important`,
            background: `${palette.colorBgGray} !important`,
            "&:hover": {
              color: "black !important",
              background: `${palette.colorTextGray} !important`,
            },
          }}
          size={"small"}
          onClick={() => handleClickModalShare()}
        >
          Share this review
        </Button>
      </Box>
      <ModalShare open={isOpen} setOpen={setIsOpen} />
      <About />
      <Share />
      <SimilarGameReviews />
    </>
  );
};

export default memo(Review);

const ASPECT_RATIO = { xs: 4 / 2, md: 1000 / 600, lg: 1920 / 800 };
