"use client";

import React, { memo } from "react";
import LayoutLastNews from "./LayoutLastNews";
import LayoutNew from "./LayoutNew";
import { usePathname, useRouter } from "next/navigation";

const Layout = () => {
  const router = useRouter();
  const pathName = usePathname();

  const handleDetail = (id: string) => {
    const url = pathName + "/" + id;
    router.push(url);
  };

  return (
    <>
      <LayoutNew />
      <LayoutLastNews />
    </>
  );
};

export default memo(Layout);
