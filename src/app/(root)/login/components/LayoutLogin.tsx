"use client";

import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import SessionLogin from "./SessionLogin";
import useBreakpoint from "@hooks/useBreakpoint";
import { setCookie } from "@utils";
import { ACCESSTOKEN_COOKIE, AUTH_COOKIE } from "@constant";
import Cookies from "js-cookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/navigation";
import { HOME_PATH } from "@constant/paths";
import { Image } from "@components/shared";
import img from "public/images/img-login.png";
import logo from "public/images/img-logo-text.png";
const LayoutLogin = () => {
  const [height, setHeight] = useState<number>(0);

  const { isMdSmaller } = useBreakpoint();
  useEffect(() => {
    const heightVail = typeof window !== "undefined" ? screen.availHeight : 0;
    setHeight(heightVail);
  }, []);

  return (
    <Stack direction={"row"} height={`calc(${height - 87}px)`}>
      {!isMdSmaller && (
        <Stack flex={1} height={"100%"}>
          <Image
            src={img}
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
        </Stack>
      )}
      <Stack
        direction={"row"}
        flex={5}
        justifyContent={"center"}
        alignItems={isMdSmaller ? "center" : "start"}
        pt={"10%"}
      >
        <Stack height={30} width={30}>
          <Image
            src={logo}
            alt="preview"
            size="100%"
            aspectRatio={1 / 1}
            sizes="14px"
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
        </Stack>
        <SessionLogin />
      </Stack>
    </Stack>
  );
};

export default LayoutLogin;
