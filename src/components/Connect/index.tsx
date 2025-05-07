import { memo, useMemo, useState, MouseEvent, useEffect } from "react";
import { Button, ButtonProps, Dropdown, Text } from "@components/shared";
import LogInIcon from "@icons/LogInIcon";
import useToggle from "@hooks/useToggle";
import WalletModal from "./WalletModal";
import { useRouter } from "next/navigation";
import { PROFILE_PATH } from "@constant/paths";
import { shortAddress } from "@utils";
import { Box } from "@mui/material";
import { CONNECT_BUTTON_ID } from "@constant";
import useAptosWallet from "@hooks/useAptosWallet";
import { useSignMessage } from "@store/auth";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

enum Option {
  COPY_ADDRESS,
  SIGN_OUT,
}

const Connect = (props: ButtonProps) => {
  const { connected, disconnect, address, wallet } = useAptosWallet();
  const { push } = useRouter();

  const wallets = useWallet();
  console.log("walletttsts", wallets);

  const { isConnectPetra, IsConnectPetra } = useSignMessage();

  const [isShow, onShow, onHide] = useToggle();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = useMemo(() => !!anchorEl, [anchorEl]);

  useEffect(() => {
    console.log(isConnectPetra);
  }, [isConnectPetra]);

  const onAnchor = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const renderItem = (item) => {
    return (
      <Text variant="subtitle2" textTransform="initial">
        {item.label}
      </Text>
    );
  };

  const onSelect = (item) => {
    return async () => {
      switch (item.value) {
        case Option.COPY_ADDRESS:
          navigator.clipboard.writeText(address as string);
          break;
        case Option.SIGN_OUT:
          disconnect();
          IsConnectPetra(false);
          break;
        default:
          break;
      }
      onClose();
    };
  };

  return (
    <>
      <Button
        id={CONNECT_BUTTON_ID}
        onClick={connected ? onAnchor : onShow}
        startIcon={
          wallet && isConnectPetra ? (
            <Box
              component="img"
              src={wallet?.icon}
              alt={wallet.name}
              width={20}
            />
          ) : undefined
        }
        variant="contained"
        size="small"
        {...props}
      >
        {isConnectPetra && address
          ? shortAddress(address.toString(), 6)
          : "Connect Wallet"}
      </Button>
      <WalletModal onClose={onHide} open={isShow} />
      <Dropdown
        onSelect={onSelect}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        renderItem={renderItem}
        options={OPTIONS}
        sx={{ minWidth: 140, bgcolor: "grey.A700" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      />
    </>
  );
};

export default memo(Connect);

const OPTIONS = [
  { label: "Copy Address", value: Option.COPY_ADDRESS },
  { label: "Disconnect", value: Option.SIGN_OUT },
];

// import { memo, useMemo, useState, MouseEvent, useEffect } from "react";
// import { Button, ButtonProps, Dropdown, Text } from "@components/shared";
// import LogInIcon from "@icons/LogInIcon";
// import useToggle from "@hooks/useToggle";
// import WalletModal from "./WalletModal";
// import { useRouter } from "next/navigation";
// import { PROFILE_PATH } from "@constant/paths";
// import { shortAddress } from "@utils";
// import { Box } from "@mui/material";
// import { CONNECT_BUTTON_ID } from "@constant";
// import useAptosWallet from "@hooks/useAptosWallet";

// enum Option {
//   COPY_ADDRESS,
//   SIGN_OUT,
// }

// const Connect = (props: ButtonProps) => {
//   const { connected, disconnect, address, wallet, signMessage } =
//     useAptosWallet();
//   const { push } = useRouter();

//   const [isShow, onShow, onHide] = useToggle();
//   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

//   const open = useMemo(() => !!anchorEl, [anchorEl]);

//   const onAnchor = (event: MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const onClose = () => {
//     setAnchorEl(null);
//   };

//   const renderItem = (item) => {
//     return (
//       <Text variant="subtitle2" textTransform="initial">
//         {item.label}
//       </Text>
//     );
//   };

//   const onSelect = (item) => {
//     return async () => {
//       switch (item.value) {
//         case Option.COPY_ADDRESS:
//           navigator.clipboard.writeText(address as string);
//           break;
//         case Option.SIGN_OUT:
//           disconnect();
//           break;
//         default:
//           break;
//       }
//       onClose();
//     };
//   };

//   return (
//     <>
//       <Button
//         id={CONNECT_BUTTON_ID}
//         onClick={connected ? onAnchor : onShow}
//         startIcon={
//           wallet ? (
//             <Box
//               component="img"
//               src={wallet?.icon}
//               alt={wallet.name}
//               width={20}
//             />
//           ) : undefined
//         }
//         variant="contained"
//         size="small"
//         {...props}
//       >
//         {address ? shortAddress(address.toString(), 6) : "Connect Wallet"}
//       </Button>
//       <WalletModal onClose={onHide} open={isShow} />
//       <Dropdown
//         onSelect={onSelect}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={onClose}
//         renderItem={renderItem}
//         options={OPTIONS}
//         sx={{ minWidth: 140, bgcolor: "grey.A700" }}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//         transformOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//       />
//     </>
//   );
// };

// export default memo(Connect);

// const OPTIONS = [
//   { label: "Copy Address", value: Option.COPY_ADDRESS },
//   { label: "Disconnect", value: Option.SIGN_OUT },
// ];
