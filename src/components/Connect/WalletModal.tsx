import { memo, useMemo } from "react";
import { Box, ButtonBase, Stack } from "@mui/material";
import DialogLayout, { DialogLayoutProps } from "@components/DialogLayout";
import { IconButton, Text } from "@components/shared";
import CloseIcon from "@icons/CloseIcon";
import {
  AdapterNotDetectedWallet,
  AdapterWallet,
  groupAndSortWallets,
  WalletItem,
  WalletReadyState,
} from "@aptos-labs/wallet-adapter-react";
import useAptosWallet from "@hooks/useAptosWallet";

type WalletModalProps = {} & Omit<DialogLayoutProps, "children">;

type ItemProps = {
  wallet: AdapterWallet | AdapterNotDetectedWallet;
  onConnect?: () => void;
};

const WalletModal = (props: WalletModalProps) => {
  const { onClose, ...rest } = props;

  const { wallets = [], notDetectedWallets = [] } = useAptosWallet();

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

  return (
    <DialogLayout
      paperSx={{
        maxWidth: 500,
        borderRadius: 4,
      }}
      renderHeader={
        <IconButton
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
          onClick={onClose}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      }
      onClose={onClose}
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
                  wallet?.readyState === WalletReadyState.NotDetected
                    ? onOpenURL(wallet.url)
                    : onClose
                }
              />
            ))}
        </Stack>
      </Stack>
    </DialogLayout>
  );
};

export default memo(WalletModal);

const Item = (props: ItemProps) => {
  const { wallet, onConnect } = props;

  return (
    <WalletItem wallet={wallet} onConnect={onConnect} asChild>
      <WalletItem.ConnectButton asChild>
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
        >
          <Box component="img" src={wallet.icon} alt={wallet.name} width={24} />
          <Text variant="subtitle2">{wallet.name}</Text>
          {!wallet.name.startsWith("Continue") && (
            <Text variant="subtitle2" color="grey.400" ml="auto!important">
              {wallet?.readyState}
            </Text>
          )}
        </Stack>
      </WalletItem.ConnectButton>
    </WalletItem>
  );
};
