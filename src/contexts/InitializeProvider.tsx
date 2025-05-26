"use client";

import { HOME_PATH } from "@constant/paths";
import { store } from "@store/configureStore";
import { usePathname } from "next/navigation";
import { memo, useCallback, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

type InitializeProviderProps = {
  children: React.ReactNode;
};

const InitializeProvider = (props: InitializeProviderProps) => {
  const { children } = props;

  const pathname = usePathname();

  const onSetViewHeight = useCallback(() => {
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  useEffect(() => {
    onSetViewHeight();

    window.addEventListener("resize", () => {
      onSetViewHeight();
    });
  }, [onSetViewHeight]);

  useEffect(() => {
    // const isMacOs = checkIsMacOS();
    // const isMobile = checkIsMobile();
    // if (isMacOs || isMobile) return;
    // document.body.classList.add("scrollbar");
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (pathname === HOME_PATH) {
      if (!document.body.classList.contains("home")) {
        document.body.classList.add("home");
      }
    } else {
      document.body.classList.remove("home");
    }
  }, [pathname]);

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor} > */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
};

export default memo(InitializeProvider);

const checkIsMacOS = () =>
  ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].indexOf(
    window?.navigator?.["userAgentData"]?.platform ||
      window?.navigator?.platform,
  ) !== -1;

const checkIsMobile = () =>
  [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ].some((value) => navigator?.userAgent?.match(value));
