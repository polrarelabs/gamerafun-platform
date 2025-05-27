"use client";

import Layout from "@components/screens/News/Layout";
import { Image, Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX } from "@constant";
import { HOME_PATH } from "@constant/paths";
import { Box, Stack } from "@mui/material";
import { useGallery } from "@store/media";
import { palette } from "public/material";
import { memo } from "react";

const News = () => {
  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: HOME_PATH,
      title: "HOME",
    },
    {
      title: "NEWS",
    },
  ];
  const { url } = useGallery();

  return (
    <Stack direction={"column"} gap={4}>
      {/* <Stack direction={"column"} gap={2}> */}
      <Stack
        px={SCREEN_PX}
        direction={"column"}
        gap={2}
        position={"relative"}
        py={4}
      >
        <Stack
          px={SCREEN_PX}
          direction={"column"}
          gap={2}
          position={"relative"}
          py={4}
        >
          {/* <Stack
            position={"absolute"}
            top={0}
            left={0}
            width={"100%"}
            height={"100%"}
            zIndex={1}
          >
            <Image
              src={url ? url : "/images/img-login.png"}
              alt={`img-`}
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
                    // transition: "all 0.5s ease-in-out",
                  },
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                background:
                  `linear-gradient(180deg, #111111 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, #111111 100%)`,
                zIndex: 2,
              }}
            />
          </Stack> */}
          <Breadcumbs breadcumbs={breadcrumbs} />
          <Stack direction={"column"}>
            <Text color={palette.textWhite} fontWeight={700} fontSize={"31px"}>
              News
            </Text>
            <Text color={palette.colorGray} fontWeight={400} fontSize={"16px"}>
              Stay on top of the latest blockchain gaming news and enjoy
              exclusive interviews and informative web3 gaming opinion pieces.
            </Text>
          </Stack>
        </Stack>
        <Layout />
      </Stack>
    </Stack>
  );
};

export default memo(News);
