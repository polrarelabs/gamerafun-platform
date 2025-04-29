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
import { client, Endpoint } from "@api";
import { PropsSignMessage } from "@store/sign-message/action";
import { useSignMessage } from "@store/sign-message";

type WalletModalProps = {} & Omit<DialogLayoutProps, "children">;

type ItemProps = {
  wallet: AdapterWallet | AdapterNotDetectedWallet;
  onConnect?: () => void;
};

const WalletModal = (props: WalletModalProps) => {
  const { onClose, ...rest } = props;

  const { petraMessage, data } = useSignMessage();

  const {
    wallets = [],
    notDetectedWallets = [],
    signMessage,
    connect,
    address,
  } = useAptosWallet();

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

  // BUG
  const handleConnect = async (
    wallet: AdapterWallet | AdapterNotDetectedWallet,
  ) => {
    try {
      await connect(wallet.name);
      if (address) {
        const requestBobySignMessage: PropsSignMessage = {
          wallet: address,
          nonce: "56",
        };
        petraMessage(requestBobySignMessage);
        console.log("data tu api", data);
        if (data) {
          console.log("data tu api", data);

          const response = await signMessage({
            message: data.loginId,
            nonce: Date.now().toString(),
            address: true,
            chainId: true,
          });
          // const signature: string = String(response.signature);

          if (response) onClose();
        }
      }
    } catch (error) {
      console.error("Error at signMessage or connect:", error);
    }
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

const Item = (props: ItemProps) => {
  const { wallet, onConnect } = props;

  return (
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
      onClick={onConnect} // tự control click
    >
      <Box component="img" src={wallet.icon} alt={wallet.name} width={24} />
      <Text variant="subtitle2">{wallet.name}</Text>
      {!wallet.name.startsWith("Continue") && (
        <Text variant="subtitle2" color="grey.400" ml="auto!important">
          {wallet?.readyState}
        </Text>
      )}
    </Stack>
  );
};

// const Item = (props: ItemProps) => {
//   const { wallet, onConnect } = props;

//   return (
//     <WalletItem wallet={wallet} onConnect={onConnect} asChild>
//       <WalletItem.ConnectButton asChild>
//         <Stack
//           direction="row"
//           component={ButtonBase}
//           alignItems="center"
//           py={1.5}
//           px={2}
//           border="1px solid"
//           borderColor="grey.500"
//           justifyContent="flex-start"
//           borderRadius={4}
//           spacing={1.5}
//           sx={{ "&:hover": { bgcolor: "background.paper" } }}
//         >
//           <Box component="img" src={wallet.icon} alt={wallet.name} width={24} />
//           <Text variant="subtitle2">{wallet.name}</Text>
//           {!wallet.name.startsWith("Continue") && (
//             <Text variant="subtitle2" color="grey.400" ml="auto!important">
//               {wallet?.readyState}
//             </Text>
//           )}
//         </Stack>
//       </WalletItem.ConnectButton>
//     </WalletItem>
//   );
// };
