"use client";

import { Stack } from "@mui/material";
import { memo } from "react";
import LoginSocials from "./LoginSocials";
import LoginAccount from "./LoginAccount";

const FormLogin = () => {
  return (
    <Stack
      width={{ md: "40%", xs: "90%" }}
      height={"auto"}
      direction={"column"}
      gap={{ md: 3, xs: 2 }}
    >
      <LoginSocials />
      {/* <LoginAccount /> */}
    </Stack>
  );
};

export default memo(FormLogin);
