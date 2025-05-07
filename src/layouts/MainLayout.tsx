"use client";

import { memo, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  const pathName = usePathname();

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
    </>
  );
};

export default memo(MainLayout);
