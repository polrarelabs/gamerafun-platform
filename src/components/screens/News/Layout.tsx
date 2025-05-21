"use client";

import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect } from "react";
import LayoutLastNews from "./LastNews";

const Layout = () => {
  const router = useRouter();
  const pathName = usePathname();

  const handleDetail = (id: string) => {
    const url = pathName + "/" + id;
    router.push(url);
  };

  return (
    <>
      {/* <LayoutNew /> */}
      <LayoutLastNews />
    </>
  );
};

export default memo(Layout);
