"use client";

import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import SessionLogin from "./SessionLogin";
import useBreakpoint from "@hooks/useBreakpoint";

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
        <Stack
          flex={1.5}
          sx={{
            background:
              "linear-gradient(160deg, rgba(122, 165, 196, 1) 1%, rgba(38, 36, 9, 1) 98%)",
          }}
        ></Stack>
      )}
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
