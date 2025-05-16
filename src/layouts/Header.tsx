"use client";

import Connect from "@components/Connect";
import Link from "@components/Link";
import { Button } from "@components/shared";
import { ACCESSTOKEN_COOKIE, HEADER_HEIGHT } from "@constant";
import { CREATE_AGENT_PATH, LOGIN_PATH } from "@constant/paths";
import useAptosWallet from "@hooks/useAptosWallet";
import useBreakpoint from "@hooks/useBreakpoint";
import { Stack } from "@mui/material";
import { useAptos } from "@store/auth";
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

  const { isSmSmaller, isMdSmaller } = useBreakpoint();
  const { isConnectAptos, isLogin } = useAptos();

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
        {/* <Sidebar /> */}

        <Stack direction={"row"} alignItems={"center"} gap={4}>
          <Logo />
          {!isMdSmaller && (
            <Navigation
            // spacing={{ xs: 2, md: 4 }}
            />
          )}
        </Stack>
        {isMdSmaller ? (
          <>
            {!isLogin && (
              <Stack direction={"row"} gap={2}>
                {showLogin && (
                  <Button
                    LinkComponent={Link}
                    href={LOGIN_PATH}
                    variant="contained"
                    size="small"
                  >
                    Log In
                  </Button>
                )}
              </Stack>
            )}
          </>
        ) : (
          <Stack direction="row" spacing={2} alignItems="center">
            {/* <CreateAgent /> */}
            {showLogin ? (
              <>
                {(!isSmSmaller || !isConnectAptos) && <Connect />}

                <Button
                  LinkComponent={Link}
                  href={LOGIN_PATH}
                  variant="contained"
                  size="small"
                >
                  Log In
                </Button>
              </>
            ) : (
              <Profile />
            )}
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default memo(Header);

const CreateAgent = () => {
  const { isConnectAptos } = useAptos();
  if (!isConnectAptos) return null;

  return (
    <Button
      LinkComponent={Link}
      href={CREATE_AGENT_PATH}
      size="small"
      variant="contained"
    >
      Create Agent
    </Button>
  );
};
