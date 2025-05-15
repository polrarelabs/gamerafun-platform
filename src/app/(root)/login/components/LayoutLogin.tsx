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
const LayoutLogin = () => {
  const [height, setHeight] = useState<number>(0);
  const router = useRouter();
  const { isMdSmaller } = useBreakpoint();
  const cookies = Cookies.get(ACCESSTOKEN_COOKIE);
  console.log("cookies", typeof cookies);

  useEffect(() => {
    const heightVail = typeof window !== "undefined" ? screen.availHeight : 0;
    setHeight(heightVail);
  }, []);

  if (cookies !== "undefined" && cookies !== undefined) {
    router.push(HOME_PATH);
  }

  return (
    <Stack direction={"row"} height={`calc(${height - 87}px)`}>
      {/* {!isMdSmaller && (
        <Stack
          flex={1.5}
          sx={{
            background:
              "linear-gradient(160deg, rgba(122, 165, 196, 1) 1%, rgba(38, 36, 9, 1) 98%)",
          }}
        ></Stack>
      )} */}
      <Stack
        direction={"row"}
        flex={4}
        justifyContent={"center"}
        alignItems={isMdSmaller ? "center" : "start"}
        pt={"10%"}
      >
        <SessionLogin />
      </Stack>
    </Stack>
  );
};

export default LayoutLogin;
