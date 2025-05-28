"use client";

import { setToken } from "@api/helpers";
import ChatAI from "@components/AskAI/ChatAI";
import { Button } from "@components/shared";
import { ACCESSTOKEN_COOKIE, REFRESHTOKEN_COOKIE, SCREEN_PX } from "@constant";
import { HOME_PATH, LOGIN_PATH } from "@constant/paths";
import useAptosWallet from "@hooks/useAptosWallet";
import useBreakpoint from "@hooks/useBreakpoint";
import { Stack } from "@mui/material";
import { useAuthLogin, useLogOut } from "@store/auth";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { memo, ReactNode, useEffect, useRef, useState } from "react";
import { SlArrowUp } from "react-icons/sl";
import { Navigation } from "./components";
import Footer from "./Footer";
import Header from "./Header";
import { palette } from "public/material";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  const pathname = usePathname();
  const { GetProfile } = useAuthLogin();

  useEffect(() => {
    const cookie = Cookies.get(ACCESSTOKEN_COOKIE);
    const refreshToken = Cookies.get(REFRESHTOKEN_COOKIE);
    if (cookie && cookie !== "undefined") {
      setToken(cookie);
      GetProfile();
    } else if (refreshToken && refreshToken !== "undefined") {
      setToken(refreshToken);
      GetProfile();
    }
  }, []);

  const { isMdSmaller } = useBreakpoint();

  const ref = useRef<HTMLDivElement | null>(null);

  const [show, setShow] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScroll = (ref) => {
    window.scrollTo({
      left: 0,
      top: ref.offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const useScroll = () => {
      if (window.scrollY > window.innerHeight / 2) setShow(true);
      else setShow(false);
    };

    window.addEventListener("scroll", useScroll);

    return () => window.removeEventListener("scroll", useScroll);
  }, []);

  return (
    <Stack position={"relative"}>
      {pathname === LOGIN_PATH ? (
        <>
          <Stack ref={ref}></Stack>
          {children}
        </>
      ) : (
        <>
          <Header />
          <Stack ref={ref}></Stack>
          {children}
          <Footer />
        </>
      )}
      {isMdSmaller && pathname !== LOGIN_PATH && (
        <Stack
          width={"100%"}
          position={"fixed"}
          bottom={0}
          bgcolor={"black"}
          height={"70px"}
          px={SCREEN_PX}
          zIndex={10}
        >
          <Navigation />
        </Stack>
      )}

      {show && (
        <Button
          variant="outlined"
          onClick={() => {
            handleScroll(ref.current);
          }}
          sx={{
            position: "fixed !important",
            bottom: isMdSmaller ? 130 : 100,
            right: 20,
            zIndex: 4,
            borderRadius: "1000px",
            p: "10px !important",
            height: 40,
            width: 40,
          }}
        >
          <SlArrowUp />
        </Button>
      )}
      <Button
        onClick={toggleDrawer(true)}
        variant="contained"
        size={"small"}
        sx={{
          position: "fixed !important",
          bottom: isMdSmaller ? 80 : 40,
          right: 20,
          zIndex: 4,
          background: "black !important",
          boxShadow: `0px 0px 4px ${palette.colorGame?.btnChat}, 0px 0px 8px ${palette.colorGame?.btnChat} !important `,
          color: "white !important",
          "&:hover": {
            boxShadow: `0px 0px 4px ${palette.colorGame?.btnChat}, 0px 0px 8px ${palette.colorGame?.btnChat} !important`,
          },
        }}
      >
        Ask AI
      </Button>

      <ChatAI open={open} handleClose={handleClose} />
    </Stack>
  );
};

export default memo(MainLayout);
