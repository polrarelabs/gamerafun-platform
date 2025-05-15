"use client";

import { Image } from "@components/shared";
import useBreakpoint from "@hooks/useBreakpoint";
import { Stack } from "@mui/material";
import gameDevice from "public/images/game-device.png";
import imgBgLogin from "public/images/img-bg-login.png";
import logo from "public/images/img-logo-text-big.png";
import { useEffect, useState } from "react";
import SessionLogin from "./SessionLogin";
const LayoutLogin = () => {
  const [height, setHeight] = useState<number>(0);

  const { isMdSmaller } = useBreakpoint();
  useEffect(() => {
    const heightVail = typeof window !== "undefined" ? screen.availHeight : 0;
    setHeight(heightVail);
  }, []);

  return (
    <Stack
      position={"relative"}
      direction={"row"}
      height={`calc(${height - 87}px)`}
    >
      <Stack
        position={"absolute"}
        width={1328}
        height={947}
        left={"-25%"}
        bottom={"-15%"}
        zIndex={8}
      >
        <Image
          src={gameDevice}
          alt="preview"
          size="100%"
          aspectRatio={1428 / 1047}
          sizes="960px"
          containerProps={{
            sx: {
              width: "100%",
              height: "100%",
              overflow: "hidden",
              "& img": {
                objectFit: "cover",
                objectPosition: "center",
              },
            },
          }}
        />
      </Stack>

      <Stack
        position={"relative"}
        bgcolor={"#6D45FC"}
        overflow={"hidden"}
        flex={2}
        minWidth={0}
      >
        <Image
          src={imgBgLogin}
          alt="preview"
          size="100%"
          aspectRatio={2 / 3}
          sizes="960px"
          containerProps={{
            sx: {
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: "8px",
              "& img": {
                objectFit: "cover",
                objectPosition: "center",
              },
            },
          }}
        />

        {/* logo */}
        <Stack
          position={"absolute"}
          height={47}
          left={"50%"}
          top={"10%"}
          sx={{
            translate: "-50% -50%",
          }}
        >
          <Image
            src={logo}
            alt="preview"
            size="100%"
            aspectRatio={720 / 100}
            sizes="1960px"
            containerProps={{
              sx: {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                "& img": {
                  objectFit: "cover",
                  objectPosition: "center",
                },
              },
            }}
          />
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        flex={5}
        justifyContent={"center"}
        alignItems={isMdSmaller ? "center" : "start"}
        pt={"10%"}
        position={"relative"}
      >
        <SessionLogin />
      </Stack>
    </Stack>
  );
};

export default LayoutLogin;
