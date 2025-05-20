"use client";

import { Stack, Box } from "@mui/material";
import { Button, Image, Text } from "@components/shared";
import bgSlider from "public/images/banner.webp";
import { memo } from "react";
import { About, CreateReview, Share } from "./components";
import { palette } from "public/material";

const News = () => {
  return (
    <>
      <CreateReview />
      <Stack
        direction={"row"}
        spacing={2}
        gap={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          my: 2,
        }}
      >
        <Box
          sx={{
            width: "200px",
            height: "200px",
            overflow: "hidden",
            borderRadius: "16px",
            border: "1px",
            borderColor: palette.borderColorLinear,
          }}
        >
          <Image
            src={bgSlider}
            alt={`img - ${bgSlider}`}
            containerProps={{
              sx: {
                overflow: "hidden",
                borderRadius: "16px",
                border: "1px",
                borderColor: palette.borderColorLinear,
                "& img": {
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "all 0.5s ease-in-out",
                },
              },
            }}
          />
        </Box>
        <Stack direction={"column"} spacing={1}>
          <Text fontSize={16} fontWeight={400}>
            4 DAYS AGO . 4 MIN READ
          </Text>
          <Text fontSize={18} fontWeight={600}>
            Best 5 NFT Games of May 2025
          </Text>
          <Text fontSize={16} fontWeight={400}>
            Explore the top five web3 games launching or updating in May 2025,
            including MapleStory N, Treeverse, and KAI Battle of Three Kingdoms,
            with blockchain features and cross-platform support.
          </Text>
          <Button
            variant="contained"
            sx={{
              p: 2,
              borderRadius: "8px !important",
              width: "fit-content !important",
              height: "40px !impornt",
              color: `${palette.greenColorText} !important`,
              background: `${palette.greenColorButton} !important`,
              "&:hover": {
                color: "black !important",
                background: `${palette.greenColorText} !important`,
              },
            }}
            size={"small"}
          >
            BEST OF
          </Button>
        </Stack>
      </Stack>
      <About />
      <Share />
    </>
  );
};
export default memo(News);
