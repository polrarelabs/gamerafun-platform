import { useMemo } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const useAptosWallet = () => {
  const wallet = useWallet();

  const address = useMemo(
    () => wallet.account?.address.toString(),
    [wallet.account?.address],
  );

  return { ...wallet, address };
};

export default useAptosWallet;
