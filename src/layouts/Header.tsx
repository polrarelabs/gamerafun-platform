"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import { Button } from "@components/shared";
import useBreakpoint from "@hooks/useBreakpoint";
import { Logo, Navigation } from "./components";
import Link from "@components/Link";
import { CREATE_AGENT_PATH, LOGIN_PATH } from "@constant/paths";
import Connect from "@components/Connect";
import useAptosWallet from "@hooks/useAptosWallet";
import { HEADER_HEIGHT, SCREEN_PX } from "@constant";
import Sidebar from "./Sidebar";
import { useSignMessage } from "@store/auth";

const Header = () => {
  const { isSmSmaller } = useBreakpoint();
  const { connected } = useAptosWallet();
  const { isConnectPetra, isLogin } = useSignMessage();
  return (
    <Stack
      component="header"
      direction="row"
      alignItems="center"
      px={SCREEN_PX}
      spacing={{ xs: 3, md: 6 }}
      justifyContent="space-between"
      width="100%"
      height={HEADER_HEIGHT}
      position="sticky"
      top={0}
      bgcolor="background.default"
      zIndex={99}
    >
      <Sidebar />

      <Logo />
      {!isSmSmaller && <Navigation spacing={{ xs: 2, md: 4 }} />}
      <Stack direction="row" spacing={2} alignItems="center">
        <CreateAgent />
        {(!isSmSmaller || !isConnectPetra) && <Connect />}
        {!isLogin && (
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
    </Stack>
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
