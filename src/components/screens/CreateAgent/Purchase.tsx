import DialogLayout, { DialogLayoutProps } from "@components/DialogLayout";
import { Input, InputProps } from "@components/FormControl";
import { TokenInfo, TokenInfoProps } from "@components/Info";
import { Button, IconButton, Text, TextProps } from "@components/shared";
import {
  BASIS_POINTS,
  BONDING_PACKAGE_ID,
  CONFIG_BY_CURRENCY,
  FEE_BPS,
} from "@constant";
import { Currency } from "@constant/enum";
import { aptosClient } from "@contexts/WalletProvider";
import CloseIcon from "@icons/CloseIcon";
import { Stack, StackProps } from "@mui/material";
import { formatNumber, getTicker, blockchainToNumber } from "@utils";
import { typography } from "public/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { U64 } from "@aptos-labs/ts-sdk";

type PurchaseProps = DialogLayoutProps & {
  ticker?: string;
  image?: File;
  value?: number;

  inputProps?: Partial<InputProps> & { value?: number };
  isSubmitting: boolean;
  disabled: boolean;
  currency: Currency;
};

type InfoItemProps = {
  label: string;
  value?: number;
  labelProps?: TextProps;
  tokenProps?: TokenInfoProps;
};

type ReceiveTokenProps = {
  icon?: string;
  ticker?: string;
  value?: number;
  percent?: number;
} & StackProps;

const Purchase = (props: PurchaseProps) => {
  const {
    ticker,
    inputProps = {},
    image,
    isSubmitting,
    disabled,
    currency,
    ...rest
  } = props;
  const { value = 0, error } = inputProps;

  const [initCoinFee, setInitCoinFee] = useState<number>(0);
  const [maxPool, setMaxPool] = useState<number>(0);

  const config = useMemo(() => CONFIG_BY_CURRENCY[currency], [currency]);

  const previewURL = useMemo(() => {
    switch (typeof image) {
      case "object":
        return URL.createObjectURL(image);
      case "string":
        return image;
      default:
        return;
    }
  }, [image]);

  const estReceive = useMemo(() => {
    if (!!error || !maxPool) return 0;

    const virtualDaoxReverse =
      (maxPool * VIRTUAL_NOCTRA_RESERVES_MULTIPLIER) /
      VIRTUAL_NOCTRA_RESERVES_DIVIDER;

    let effectiveAmount: number;
    const _amount = Number(value) || 0;
    let fee_amount = (_amount * FEE_BPS) / BASIS_POINTS;
    if (_amount - fee_amount < maxPool) {
      effectiveAmount = _amount - fee_amount;
    } else {
      fee_amount = (maxPool * FEE_BPS) / (BASIS_POINTS - FEE_BPS);
      effectiveAmount = maxPool;
    }

    const curVirtualDaoxReverse = virtualDaoxReverse + effectiveAmount;
    const curVirtualCoinReverse =
      (virtualDaoxReverse * VIRTUAL_COIN_RESERVES) / curVirtualDaoxReverse;

    return VIRTUAL_COIN_RESERVES - curVirtualCoinReverse;
  }, [error, maxPool, value]);

  const onGetConfig = useCallback(async () => {
    if (!config) return;
    try {
      const configData = await aptosClient.view({
        payload: {
          function: `${BONDING_PACKAGE_ID}::noctra_agent::get_platform_parameters`,
          typeArguments: [config.coinType],
        },
      });

      setInitCoinFee(
        blockchainToNumber(Number(configData[0]), config.decimals),
      );
      setMaxPool(blockchainToNumber(Number(configData[3]), config.decimals));
    } catch (error) {
      console.error(error);
    }
  }, [config]);

  useEffect(() => {
    onGetConfig();
  }, [onGetConfig]);

  return (
    <DialogLayout
      disablePortal
      headerProps={{
        direction: "row",
        position: "relative",
        justifyContent: "center",
        sx: { p: 0, py: 3 },
      }}
      paperSx={{ maxWidth: 640 }}
      contentProps={{ sx: { px: { xs: 2, md: 4 } } }}
      renderHeader={
        <>
          <Text variant="h2" fontWeight={500} textAlign="center">
            {`Choose the amount of\n$${ticker} you want to buy`}
          </Text>
          <IconButton
            sx={{
              position: "absolute",
              top: 24,
              right: { xs: 16, md: 32 },
            }}
            noPadding
            onClick={props.onClose}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </>
      }
      {...rest}
    >
      <Stack width="100%">
        <Text
          variant="body2"
          textAlign="center"
          color="grey.400"
          alignSelf="center"
          maxWidth={350}
          mb={3}
        >
          {`It's optional, but buying a small amount of coins can help protect your coin from snipers`}
        </Text>
        <Input
          sx={{ bgcolor: "grey.A700" }}
          name="buyAmount"
          label={getTicker(currency)}
          type="number"
          placeholder="0"
          maxNumber={1_000_000_000}
          maxDecimal={2}
          endAdornment={
            <TokenInfo
              value={currency}
              textProps={{ variant: "subtitle2" }}
              size={22}
              icon={config.icon}
              pr={1}
            />
          }
          {...inputProps}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          mt={1}
          mb={2}
          alignItems="center"
          spacing={1}
        >
          <Text variant="subtitle2" color="grey.400">
            To receive:
          </Text>

          <ReceiveToken
            icon={previewURL}
            ticker={ticker}
            value={estReceive}
            percent={(estReceive * 100) / DEFAULT_TOTAL_SUPPLY}
          />
        </Stack>

        <Stack borderRadius={2} p={2} spacing={2} bgcolor="grey.A700">
          <InfoItem
            label="Agent Creation Fee"
            value={initCoinFee}
            tokenProps={{ size: 20, icon: config.icon }}
          />
          <InfoItem
            label="Your Initial Buy"
            value={Number(value)}
            tokenProps={{ size: 20, icon: config.icon }}
          />

          <InfoItem
            label="Total"
            labelProps={{ variant: "subtitle1", color: "common.white" }}
            tokenProps={{
              textProps: {
                color: "common.white",
              },
              size: 20,
              icon: config.icon,
            }}
            value={Number(value) + initCoinFee}
          />
        </Stack>
        <Button
          type="submit"
          disabled={disabled}
          submitting={isSubmitting}
          variant="contained"
          sx={{
            ...typography.subtitle2,
            alignSelf: "center",
            width: "100%",
            my: 3,
          }}
        >
          {isSubmitting ? "Creating" : "Create Agent"}
        </Button>
        {/* <Stack direction="row" alignItems="center" spacing={1}>
          <Text fontWeight={600}  color="grey.400">
            Trading Fee
          </Text>
          <IconButton
            noPadding
            tooltip="1% trading fee applies to all buys and sells."
          >
            <InformationCircleIcon sx={{ fontSize: 20, color: "grey.400" }} />
          </IconButton>
        </Stack> */}
      </Stack>
    </DialogLayout>
  );
};

export default memo(Purchase);

const ReceiveToken = (props: ReceiveTokenProps) => {
  const { icon, ticker, value, percent, ...rest } = props;

  return (
    <Stack spacing={0.5} {...rest}>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <TokenInfo
          textProps={{ variant: "subtitle2" }}
          size={22}
          spacing={0.5}
          value={value || 0}
          icon={icon}
          numberOptions={{ numberOfFixed: 6 }}
        />
        <Text variant="subtitle2">{ticker}</Text>
      </Stack>
      <Text
        variant="subtitle2"
        textAlign="right"
      >{`(${formatNumber(percent || 0, { suffix: "%", space: false })})`}</Text>
    </Stack>
  );
};

const InfoItem = (props: InfoItemProps) => {
  const { label, value, labelProps, tokenProps } = props;

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Text variant="subtitle2" color="grey.400" {...labelProps}>
        {label}
      </Text>
      <TokenInfo value={value} {...tokenProps} />
    </Stack>
  );
};

// Virtual reserves configuration for AMM
const VIRTUAL_RESERVES_MULTIPLIER = 11;
const VIRTUAL_RESERVES_DIVIDER = 10;
const VIRTUAL_NOCTRA_RESERVES_MULTIPLIER = 3;
const VIRTUAL_NOCTRA_RESERVES_DIVIDER = 8;

const DEFAULT_TOTAL_SUPPLY = 1_000_000_000; // Default token supply

const VIRTUAL_COIN_RESERVES =
  (DEFAULT_TOTAL_SUPPLY * VIRTUAL_RESERVES_MULTIPLIER) /
  VIRTUAL_RESERVES_DIVIDER;
