/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { client, Endpoint } from "@api";
import { setToken } from "@api/helpers";
import {
  AdapterNotDetectedWallet,
  AdapterWallet,
  groupAndSortWallets,
  WalletReadyState,
} from "@aptos-labs/wallet-adapter-react";
import DialogLayout, { DialogLayoutProps } from "@components/DialogLayout";
import { IconButton, Text } from "@components/shared";
import useAptosWallet from "@hooks/useAptosWallet";
import CloseIcon from "@icons/common/CloseIcon";
import { Box, ButtonBase, Stack } from "@mui/material";
import { useAuthLogin } from "@store/auth";
import { memo, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { HOME_PATH } from "@constant/paths";
import { useRouter } from "next/navigation";

type WalletModalProps = {} & Omit<DialogLayoutProps, "children">;

type ItemProps = {
  wallet: AdapterWallet | AdapterNotDetectedWallet;
  onConnect?: () => void;
};

const WalletModal = (props: WalletModalProps) => {
  const { onClose, ...rest } = props;

  const router = useRouter();

  const [selectedWallet, setSelectedWallet] = useState<
    AdapterWallet | AdapterNotDetectedWallet | null
  >(null);

  const { data, AuthAptos, error, IsConnectAptos } = useAuthLogin();

  const {
    wallets = [],
    notDetectedWallets = [],
    signMessage,
    connect,
    address,
    disconnect,
    account,
    // connected,
    // wallet,
    // network
  } = useAptosWallet();

  const handleClose = () => {
    if (selectedWallet) {
      disconnect();
      setSelectedWallet(null);
      IsConnectAptos(false);
    }
    onClose();
  };

  const walletGrouped = useMemo(() => {
    return groupAndSortWallets(
      [...wallets, ...notDetectedWallets].filter(
        (item) => item?.["isOkxWallet"] || item.name === "Petra",
      ),
    );
  }, [wallets, notDetectedWallets]);

  const onOpenURL = (url: string) => () => {
    window.open(url, "_blank");
  };

  const nonce = Date.now().toString();

  useEffect(() => {
    if (error) {
      disconnect();
      IsConnectAptos(false);
      setSelectedWallet(null);
      return;
    } else if (data && Object.keys(data).length > 0) {
      onClose();
      setSelectedWallet(null);
      IsConnectAptos(true);
      setToken(data.accessToken);
      Cookies.set("accessToken", data.accessToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      // router.push(HOME_PATH);
    }
  }, [data, error]);

  useEffect(() => {
    console.log("log sign wall", selectedWallet, address);

    const signAfterConnect = async () => {
      if (!selectedWallet || !address) return;
      try {
        const data = await client.post(Endpoint.AUTH_SIGNMESSAGE, {
          wallet: address,
          nonce: nonce,
        });
        if (!data) {
          disconnect();
          IsConnectAptos(false);
          setSelectedWallet(null);
          return;
        }

        const response = await signMessage({
          message: data.data,
          nonce: nonce,
        });

        if (response && account) {
          AuthAptos({
            wallet: address,
            signature: response.signature?.toString(),
            publicKey: account?.publicKey?.toString(),
          });
        } else {
          IsConnectAptos(false);
          disconnect();
          setSelectedWallet(null);
        }
      } catch (error) {
        console.error("Sign Errors:", error);
        IsConnectAptos(false);
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
      throw error;
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
        <Text variant="subtitle2">Connect a wallet to your Gamera account</Text>
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
