"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import "./swap.scss";
import { onTriggerConnectWallet, setCookie, uuid } from "@utils";
import { APTOS_COIN_TYPE, AUTH_COOKIE } from "@constant";
import useAptosWallet from "@hooks/useAptosWallet";

type SwapProps = {
  token: string;
};

const Swap = ({ token }: SwapProps) => {
  const { connected, disconnect, address, account } = useAptosWallet();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [id, setId] = useState<string>(uuid());

  const connectedRef = useRef<boolean>(connected);
  const disconnectRef = useRef<() => void>(disconnect);

  const onDisconnect = useCallback(() => {
    setCookie(AUTH_COOKIE, 0);
    disconnectRef.current();
  }, []);

  useEffect(() => {
    if (!window["CetusSwap"] || !isReady) return;
    window["CetusSwap"].init(
      {
        containerId: CESTUS_TERMINAL_ID,
        displayMode: "Integrated",
        independentWallet: false,
        defaultFromToken: APTOS_COIN_TYPE,
        defaultToToken: token,
      },
      {
        connect: onTriggerConnectWallet,
        disconnect: onDisconnect,
        currentAccount: account,
      },
    );
  }, [isReady, id, token, onDisconnect, account]);

  useEffect(() => {
    if (!window["CetusSwap"]) return;

    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  }, []);

  useEffect(() => {
    setId(uuid());
  }, [address]);

  useEffect(() => {
    disconnectRef.current = disconnect;
  }, [disconnect]);

  return <div id={CESTUS_TERMINAL_ID} className="cetus-swap" />;
};

export default memo(Swap);

const CESTUS_TERMINAL_ID = "cetus-terminal";
