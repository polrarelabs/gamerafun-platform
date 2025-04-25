"use client";

import { useCallback, useEffect, useState } from "react";
import useEventListener from "./useEventListener";

const useScroll = () => {
  const [value, setValue] = useState<number>(
    typeof window === "undefined" ? 0 : document.body.scrollTop,
  );

  const onScroll = useCallback(() => {
    setValue(document.body.scrollTop);
  }, []);

  useEffect(() => {
    setValue(document.body.scrollTop);
  }, []);

  useEventListener("scroll", onScroll, undefined, "body");

  return value;
};

export default useScroll;
