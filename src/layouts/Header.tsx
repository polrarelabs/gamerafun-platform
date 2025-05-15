"use client";

import { memo, useEffect, useState } from "react";
import { Drawer, Stack } from "@mui/material";
import { Button } from "@components/shared";
import useBreakpoint from "@hooks/useBreakpoint";
import { Logo, Navigation } from "./components";
import Link from "@components/Link";
import { CREATE_AGENT_PATH, LOGIN_PATH } from "@constant/paths";
import Connect from "@components/Connect";
import useAptosWallet from "@hooks/useAptosWallet";
import {
  ACCESSTOKEN_COOKIE,
  DOMAIN,
  HEADER_HEIGHT,
  SCREEN_PX,
} from "@constant";
import Sidebar from "./Sidebar";
import { useSignMessage } from "@store/auth";
import ChatAI from "@components/AskAI/ChatAI";
import Cookies from "js-cookie";
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
  const { connected } = useAptosWallet();
  const { isConnectPetra, isLogin } = useSignMessage();

  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
                {/* <Button
                  onClick={toggleDrawer(true)}
                  variant="contained"
                  size={"small"}
                >
                  Ask AI
                </Button> */}
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
            {/* <Button
              onClick={toggleDrawer(true)}
              variant="contained"
              size={"small"}
              sx={{
                borderRadius: '8px !important'

              }}
            >
              Ask AI
            </Button> */}
            <CreateAgent />
            {showLogin ? (
              <>
                {(!isSmSmaller || !isConnectPetra) && <Connect />}

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
              // <Button
              //   LinkComponent={Link}
              //   href={LOGIN_PATH}
              //   variant="contained"
              //   size="small"
              //   onClick={() => Cookies.remove("accessToken", { path: "" })}
              // >
              //   Log Out
              // </Button>
              <Profile />
            )}
          </Stack>
        )}
      </Stack>
      {/* <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: "400px",
          },
        }}
      >
        <ChatAI />
      </Drawer> */}
    </>
  );
};

export default memo(Header);

const CreateAgent = () => {
  const { isConnectPetra } = useSignMessage();
  if (!isConnectPetra) return null;

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
