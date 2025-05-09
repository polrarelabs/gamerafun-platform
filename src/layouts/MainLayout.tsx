"use client";

import { memo, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import { Stack } from "@mui/material";
import useBreakpoint from "@hooks/useBreakpoint";
import { Navigation } from "./components";
import { SCREEN_PX } from "@constant";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  const pathName = usePathname();

  const { isMdSmaller } = useBreakpoint();

  return (
    <>
      {pathName === "/login" ? (
        <>{children}</>
      ) : (
        <>
          <Header />
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
    </>
  );
};

export default memo(MainLayout);
