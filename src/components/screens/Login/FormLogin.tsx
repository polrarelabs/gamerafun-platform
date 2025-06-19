"use client";

import { Stack } from "@mui/material";
import { memo, useState } from "react";
import LoginSocials from "./LoginSocials";
import LoginAccount from "./LoginAccount";
import LoginEmail from "./LoginEmail";
import { Suspense } from "react";

const FormLogin = () => {
  const [option, setOption] = useState<string>("social");

  return (
    <Stack
      width={{ md: "40%", xs: "90%" }}
      height={"auto"}
      direction={"column"}
      gap={{ md: 3, xs: 2 }}
    >
      {option === "social" ? (
        <Suspense fallback={<div>Loading...</div>}>
          <LoginSocials setOption={setOption} />
        </Suspense>
      ) : option === "account" ? (
        <LoginAccount setOption={setOption} />
      ) : (
        <LoginEmail setOption={setOption} />
      )}
    </Stack>
  );
};

export default memo(FormLogin);
