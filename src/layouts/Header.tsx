"use client";

import Link from "@components/Link";
import { Button } from "@components/shared";
import { ACCESSTOKEN_COOKIE, HEADER_HEIGHT } from "@constant";
import { LOGIN_PATH } from "@constant/paths";
import useBreakpoint from "@hooks/useBreakpoint";
import { Stack } from "@mui/material";
import Cookies from "js-cookie";
import { memo, useEffect, useState } from "react";
import { Logo, Navigation } from "./components";
import Profile from "./components/Profile";

const Header = () => {
  const cookies = Cookies.get(ACCESSTOKEN_COOKIE);

  const [showLogin, setShowLogin] = useState<boolean>(true);

  useEffect(() => {
    if (cookies !== "undefined" && cookies !== undefined) {
      setShowLogin(false);
    } else setShowLogin(true);
  }, [cookies]);

  const { isMdSmaller } = useBreakpoint();

  return (
    <>
      <Stack
        component="header"
        direction="row"
        alignItems="center"
        px={2}
        spacing={{ xs: 3, md: 6 }}
        justifyContent="space-between"
        width="100%"
        height={HEADER_HEIGHT}
        position="sticky"
        top={0}
        bgcolor="background.default"
        zIndex={99}
      >
        <Stack direction={"row"} alignItems={"center"} gap={4}>
          <Logo />
          {!isMdSmaller && <Navigation />}
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          {showLogin ? (
            <>
              <Button
                LinkComponent={Link}
                href={LOGIN_PATH}
                variant="contained"
                sx={{
                  borderRadius: "5px !important",
                }}
              >
                Log In
              </Button>
            </>
          ) : (
            <Profile />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default memo(Header);
