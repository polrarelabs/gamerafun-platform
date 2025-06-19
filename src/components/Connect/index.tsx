/* eslint-disable react-hooks/exhaustive-deps */
import { Button, ButtonProps, Dropdown, Text } from "@components/shared";
import { CONNECT_BUTTON_ID } from "@constant";
import useAptosWallet from "@hooks/useAptosWallet";
import useToggle from "@hooks/useToggle";
import { Box } from "@mui/material";
import { useAuthLogin } from "@store/auth";
import { shortAddress } from "@utils";
import { memo, MouseEvent, useEffect, useMemo, useState } from "react";
import WalletModal from "./WalletModal";

enum Option {
  COPY_ADDRESS,
  SIGN_OUT,
}

const Connect = (props: ButtonProps) => {
  const { disconnect, address, wallet } = useAptosWallet();

  const { isConnectAptos, IsConnectAptos } = useAuthLogin();

  const [isShow, onShow, onHide] = useToggle();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = useMemo(() => !!anchorEl, [anchorEl]);

  useEffect(() => {
    if (!isConnectAptos) disconnect();
  }, [isConnectAptos]);

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
          IsConnectAptos(false);
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
        onClick={isConnectAptos ? onAnchor : onShow}
        startIcon={
          wallet && isConnectAptos ? (
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
        {isConnectAptos && address
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
