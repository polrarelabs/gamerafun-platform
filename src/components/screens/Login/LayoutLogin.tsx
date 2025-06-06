"use client";

import { Button, Image } from "@components/shared";
import useBreakpoint from "@hooks/useBreakpoint";
import { Stack } from "@mui/material";
import gameDevice from "public/images/game-device.png";
import imgBgLogin from "public/images/img-bg-login.webp";
import logo from "public/images/img-logo-text-big.png";
// import { useEffect, useState } from "react";
import SessionLogin from "./SessionLogin";
import CloseIcon from "@icons/common/CloseIcon";
import { palette } from "public/material";
import useAptosWallet from "@hooks/useAptosWallet";
import { useLogOut } from "@store/auth";
import { useEffect } from "react";
const LayoutLogin = () => {
  const { isMdSmaller } = useBreakpoint();
  const { disconnect } = useAptosWallet();
  const { logOut } = useLogOut();

  useEffect(() => {
    disconnect();
    logOut();
  }, []);
  return (
    <Stack
      position={"relative"}
      direction={"row"}
      height="100vh"
      overflow={"hidden"}
    >
      {!isMdSmaller && (
        <>
          <Stack
            position="absolute"
            left="-24%"
            bottom="-17%"
            zIndex={8}
            sx={{
              width: { xl: 1328, lg: 1000, md: 700 },
              height: "auto",
            }}
          >
            <Image
              src={gameDevice}
              alt="preview"
              size="100%"
              aspectRatio={1428 / 1047}
              sizes="(max-width: 768px) 80vw, 960px"
              containerProps={{
                sx: {
                  width: "100%",
                  height: "auto",
                  overflow: "hidden",
                  "& img": {
                    objectFit: "contain",
                    objectPosition: "center",
                    width: "100%",
                    height: "auto",
                  },
                },
              }}
            />
          </Stack>

          <Stack
            position={"relative"}
            bgcolor={palette.colorRelate?.bgColorLogin}
            overflow={"hidden"}
            flex={2}
            minWidth={0}
          >
            <Image
              src={imgBgLogin}
              alt="login background"
              size="100%"
              aspectRatio={2 / 3}
              sizes="960px"
              containerProps={{
                sx: {
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  "& img": {
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    height: "100%",
                  },
                },
              }}
            />

            {/* logo */}
            <Stack
              position="absolute"
              width={{ md: 250, lg: 350, xl: 400 }}
              height="auto"
              left="50%"
              top="10%"
              sx={{ transform: "translate(-50%, -50%)" }}
            >
              <Image
                src={logo}
                alt="logo"
                size="100%"
                aspectRatio={720 / 100}
                containerProps={{
                  sx: {
                    width: "100%",
                    height: "auto",
                    overflow: "hidden",
                    "& img": {
                      objectFit: "contain",
                      objectPosition: "center",
                    },
                  },
                }}
              />
            </Stack>
          </Stack>
        </>
      )}
      <Stack
        direction={"row"}
        flex={5}
        justifyContent={"center"}
        alignItems={isMdSmaller ? "center" : "start"}
        pt={"10%"}
        position={"relative"}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          position={"absolute"}
          top={20}
          right={40}
          gap={2}
        >
          <Button
            variant="outlined"
            size={"small"}
            sx={{
              borderColor: `${palette.colorRelate?.borderColor} !important`,
              color: "white !important",
              background: "inherit !important",
            }}
          >
            Contact Us
          </Button>
          <CloseIcon height={14} width={14} />
        </Stack>
        <SessionLogin />
      </Stack>
    </Stack>
  );
};

export default LayoutLogin;
