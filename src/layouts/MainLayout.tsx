"use client";

import { memo, ReactNode, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { usePathname, useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import useBreakpoint from "@hooks/useBreakpoint";
import { Navigation } from "./components";
import { ACCESSTOKEN_COOKIE, SCREEN_PX } from "@constant";
import { Button } from "@components/shared";
import { SlArrowUp } from "react-icons/sl";
import Cookies from "js-cookie";
import { setToken } from "@api/helpers";
import { HOME_PATH, LOGIN_PATH } from "@constant/paths";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  const pathName = usePathname();
  const router = useRouter();
  const cookies = Cookies.get(ACCESSTOKEN_COOKIE);
  useEffect(() => {
    if (cookies !== "undefined" && cookies !== undefined) {
      setToken(cookies);
      router.push(HOME_PATH);
    } else router.push(LOGIN_PATH);
  }, [cookies]);

  const { isMdSmaller } = useBreakpoint();

  const ref = useRef<HTMLDivElement | null>(null);

  const [show, setShow] = useState<boolean>(false);

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
    </Stack>
  );
};

export default memo(MainLayout);
