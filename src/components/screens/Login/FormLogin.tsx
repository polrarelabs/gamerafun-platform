"use client";

import { Stack } from "@mui/material";
import { memo, useState } from "react";
import LoginSocials from "./LoginSocials";
import LoginAccount from "./LoginAccount";
import LoginEmail from "./LoginEmail";
import { Button } from "@components/shared";
import { palette } from "public/material";

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
        <>
          <LoginSocials setOption={setOption} />
          <Button
            variant="outlined"
            onClick={() => setOption("account")}
            sx={{
              position: "absolute !important",
              top: 80,
              right: 40,
              width: "fit-content",
              borderColor: `white !important`,
              color: "white !important",
              background: "inherit !important",
            }}
            size={"small"}
          >
            Login Admin
          </Button>
        </>
      ) : option === "account" ? (
        <LoginAccount setOption={setOption} />
      ) : (
        <LoginEmail setOption={setOption} />
      )}
    </Stack>
  );
};

export default memo(FormLogin);
