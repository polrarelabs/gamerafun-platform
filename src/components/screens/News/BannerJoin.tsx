import { Button, Image, Text } from "@components/shared";
import { SCREEN_PX } from "@constant";
import { Stack } from "@mui/material";
import { useBlog } from "@store/new";
import { palette } from "public/material";
import React, { memo } from "react";
import img from "public/images/img-login.webp";
import { getImageSrc } from "@components/helper";

const BannerJoin = () => {
  const { blogId } = useBlog();

  return (
    <Stack
      px={SCREEN_PX}
      py={14}
      direction={"column"}
      gap={2}
      position={"relative"}
      mt={4}
    >
      <Stack
        position={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        zIndex={2}
        sx={{
          background: palette.colorRelate?.linearImage,
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
          src={getImageSrc(blogId.thumbnailUrl, img)}
          alt={`img-${blogId.thumbnailUrl}`}
          size="100%"
          aspectRatio={3 / 2}
          sizes={`1920px`}
          containerProps={{
            sx: {
              width: `100%`,
              height: "100%",
              overflow: "hidden",
              opacity: 0.2,
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

      <Stack gap={2} width={{ lg: "40%", xs: "100%" }} zIndex={2}>
        <Text color={"white"} fontWeight={700} fontSize={"36px"}>
          Ready to start your journey?
        </Text>
        <Text
          color={"white"}
          fontSize={"19px"}
          sx={{
            opacity: 0.8,
          }}
        >
          Don’t just get the game. Get more from your game. Unlock exclusive
          rewards, members-only content, and a library of top titles.
        </Text>
        <Button
          variant="contained"
          sx={{
            borderRadius: "8px !important",
            padding: "12px 24px !important",
            background: "white !important",
            color: "black !important",
            width: "fit-content",
            "&:hover": {
              background: `${palette.colorBanner?.bgColorWhite} !important`,
            },
          }}
        >
          Join Now
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(BannerJoin);
