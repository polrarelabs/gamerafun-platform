"use client";

import { memo, ReactNode } from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { APP_ENVIRONMENT, APTOS_API_KEY } from "@constant";

type WalletProviderProps = {
  children: ReactNode;
};

const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <AptosWalletAdapterProvider
      autoConnect
      dappConfig={{
        // aptosConnectDappId: "aptos_api_dev",
        network: NETWORK_SUPPORTED,
        aptosApiKeys: {
          [NETWORK_SUPPORTED]: APTOS_API_KEY,
        },
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};

export default memo(WalletProvider);

export const NETWORK_SUPPORTED =
  APP_ENVIRONMENT === "production" ? Network.MAINNET : Network.TESTNET;

export const aptosClient = new Aptos(
  new AptosConfig({ network: NETWORK_SUPPORTED }),
);
