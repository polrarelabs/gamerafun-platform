"use client";

import { memo, ReactNode, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, Stack } from "@mui/material";
import useBreakpoint from "@hooks/useBreakpoint";
import { Navigation } from "./components";
import { ACCESSTOKEN_COOKIE, SCREEN_PX } from "@constant";
import { Button } from "@components/shared";
import { SlArrowUp } from "react-icons/sl";
import Cookies from "js-cookie";
import { setToken } from "@api/helpers";
import { HOME_PATH, LOGIN_PATH } from "@constant/paths";
import ChatAI from "@components/AskAI/ChatAI";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  const pathName = usePathname();
  const router = useRouter();

  // console.log("node_env", process.env.NODE_ENV);

  useEffect(() => {
    const cookies = Cookies.get(ACCESSTOKEN_COOKIE);
    console.log("cookies1", cookies);

    if (cookies !== "undefined" && cookies !== undefined) {
      setToken(cookies);
      router.push(HOME_PATH);
    } else router.push(LOGIN_PATH);
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
      {pathName === "/login" ? (
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
      {isMdSmaller && (
        <Stack
          width={"100%"}
          position={"fixed"}
          bottom={0}
          bgcolor={"black"}
          height={"70px"}
          px={SCREEN_PX}
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
            bottom: 100,
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
          bottom: 40,
          right: 20,
          zIndex: 4,
          background: "black !important",
          boxShadow:
            " 0px 0px 4px rgba(106, 246, 96, 0.6), 0px 0px 8px rgba(105,246,96, 0.6) !important",
          color: "white !important",
          "&:hover": {
            boxShadow: "0px 0px 4px #69F660, 0px 0px 8px #69F660 !important",
          },
        }}
      >
        Ask AI
      </Button>

      <Dialog fullWidth open={open} onClose={handleClose} maxWidth={"md"}>
        <ChatAI />
      </Dialog>
    </Stack>
  );
};

export default memo(MainLayout);
