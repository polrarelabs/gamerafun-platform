"use client";

import { memo, useEffect } from "react";
import { useTokensBalance, useTokensPrice } from "@store/app";
import useAptosWallet from "@hooks/useAptosWallet";

const FetchData = () => {
  const { address } = useAptosWallet();
  const { onGetBalances, onResetBalance } = useTokensBalance();
  const { onGetPrices } = useTokensPrice();

  useEffect(() => {
    if (address) {
      onGetBalances(address);
    } else {
      onResetBalance();
    }
  }, [address, onGetBalances, onResetBalance]);

  useEffect(() => {
    onGetPrices();
  }, [onGetPrices]);

  return null;
};

export default memo(FetchData);
