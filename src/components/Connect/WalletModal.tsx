"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Box, ButtonBase, Stack } from "@mui/material";
import DialogLayout, { DialogLayoutProps } from "@components/DialogLayout";
import { IconButton, Text } from "@components/shared";
import CloseIcon from "@icons/CloseIcon";
import {
  AdapterNotDetectedWallet,
  AdapterWallet,
  groupAndSortWallets,
  WalletReadyState,
} from "@aptos-labs/wallet-adapter-react";
import useAptosWallet from "@hooks/useAptosWallet";
import { AuthSignMessage, PropsSignMessage } from "@store/auth/action";
import {
  AuthSignMessageProps,
  useAuthSignMessage,
  useSignMessage,
} from "@store/auth";

type WalletModalProps = {} & Omit<DialogLayoutProps, "children">;

type ItemProps = {
  wallet: AdapterWallet | AdapterNotDetectedWallet;
  onConnect?: () => void;
};

const WalletModal = (props: WalletModalProps) => {
  const { onClose, ...rest } = props;
  const { petraMessage, IsConnectPetra } = useSignMessage();

  const { AuthSignMessage } = useAuthSignMessage();

  const [selectedWallet, setSelectedWallet] = useState<
    AdapterWallet | AdapterNotDetectedWallet | null
  >(null);

  const {
    wallets = [],
    notDetectedWallets = [],
    signMessage,
    connect,
    address,
    disconnect,
    account,
  } = useAptosWallet();

  const handleClose = () => {
    if (selectedWallet) {
      disconnect();
      setSelectedWallet(null);
      IsConnectPetra(false);
    }
    onClose();
  };

  const walletGrouped = useMemo(() => {
    return groupAndSortWallets(
      [...wallets, ...notDetectedWallets].filter(
        (item) =>
          item?.["isOkxWallet"] ||
          item.name.startsWith("Continue") ||
          item.name === "Petra",
      ),
    );
  }, [wallets, notDetectedWallets]);

  const onOpenURL = (url: string) => () => {
    window.open(url, "_blank");
  };
  useEffect(() => {
    const signAfterConnect = async () => {
      if (!selectedWallet || !address) return;
      const nonce = Date.now().toString();
      try {
        const requestBody: PropsSignMessage = {
          wallet: address,
          nonce: nonce,
        };

        const data = await petraMessage(requestBody);

        if (!data) {
          disconnect();
          IsConnectPetra(false);
          setSelectedWallet(null);
          return;
        }

        const response = await signMessage({
          // message: data.payload,
          message: "loginId: 9cef1dbb-f77a-436a-9d7e-598c9e83aec0",
          nonce: nonce,
          address: true,
          chainId: true,
        });

        if (response) {
          // const publicKey1 = account?.publicKey.toString
          console.log("publicKey", String(account?.publicKey));

          console.log("signature", String(response.signature));

          const valueAuth: AuthSignMessage = {
            wallet: address,
            signature: String(response.signature),
            publicKey: String(account?.publicKey),
          };

          await AuthSignMessage(valueAuth);

          onClose();
          setSelectedWallet(null);
          IsConnectPetra(true);
        } else {
          IsConnectPetra(false);
          disconnect();
          setSelectedWallet(null);
        }
      } catch (error) {
        console.error("Lỗi trong quá trình sign:", error);
        IsConnectPetra(false);
        disconnect();
        setSelectedWallet(null);
      }
    };

    signAfterConnect();
  }, [address, selectedWallet]);

  const handleConnect = async (
    wallet: AdapterWallet | AdapterNotDetectedWallet,
  ) => {
    try {
      await connect(wallet.name);
      setSelectedWallet(wallet);
    } catch (error) {
      console.log("Lỗi trong quá trình kết nối ví:", error);
    }
  };

  return (
    <DialogLayout
      paperSx={{ maxWidth: 500, borderRadius: 4 }}
      renderHeader={
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          onClick={handleClose}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      }
      onClose={handleClose}
      {...rest}
    >
      <Stack flex={1}>
        <Text variant="h3">Connect your wallet</Text>
        <Text variant="subtitle2">
          Connect a wallet to your Noctra Protocol account
        </Text>
        <Stack flex={1} spacing={1.5} my={3}>
          {Object.values(walletGrouped)
            .flat()
            .map((wallet) => (
              <Item
                key={wallet.name}
                wallet={wallet}
                onConnect={
                  wallet.readyState === WalletReadyState.NotDetected
                    ? onOpenURL(wallet.url)
                    : () => handleConnect(wallet)
                }
              />
            ))}
        </Stack>
      </Stack>
    </DialogLayout>
  );
};

export default memo(WalletModal);

const Item = ({ wallet, onConnect }: ItemProps) => (
  <Stack
    direction="row"
    component={ButtonBase}
    alignItems="center"
    py={1.5}
    px={2}
    border="1px solid"
    borderColor="grey.500"
    justifyContent="flex-start"
    borderRadius={4}
    spacing={1.5}
    sx={{ "&:hover": { bgcolor: "background.paper" } }}
    onClick={onConnect}
  >
    <Box component="img" src={wallet.icon} alt={wallet.name} width={24} />
    <Text variant="subtitle2">{wallet.name}</Text>
    {!wallet.name.startsWith("Continue") && (
      <Text variant="subtitle2" color="grey.400" ml="auto">
        {wallet.readyState}
      </Text>
    )}
  </Stack>
);
