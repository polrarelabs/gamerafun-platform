import { U64 } from "@aptos-labs/ts-sdk";
import { TokenInfo } from "@components/Info";
import {
  Button,
  IconButton,
  Text,
  TextField,
  TextFieldProps,
} from "@components/shared";
import {
  BASIS_POINTS,
  BONDING_PACKAGE_ID,
  CONFIG_BY_CURRENCY,
  FEE_BPS,
  TOKEN_DECIMAL,
} from "@constant";
import {
  REJECT_ERROR,
  TRANSACTION_NOT_FOUND_ERROR,
  WALLET_NOT_CONNECTED,
} from "@constant/error";
import { Token } from "@constant/types";
import { aptosClient } from "@contexts/WalletProvider";
import useAptosWallet from "@hooks/useAptosWallet";
import SwitchIcon from "@icons/SwitchIcon";
import WalletIcon from "@icons/WalletIcon";
import { Skeleton, Stack, StackProps } from "@mui/material";
import { useSnackbar, useTokensBalance, useTokensPrice } from "@store/app";
import { useTokenDetail } from "@store/token";
import {
  formatNumber,
  getMessageErrorByAPI,
  getTicker,
  limitDecimalNumber,
  numberToBlockchain,
  onTriggerConnectWallet,
} from "@utils";
import { typography } from "public/material";
import { memo, useEffect, useMemo, useState } from "react";
import StringFormat from "string-format";

type PrototypeSwapProps = {};

type ItemProps = {
  label: string;
  inputProps: TextFieldProps;
  symbol?: string;
  image?: string;
  error?: string;
  name?: string;
  balance?: number;
  usdt?: number;
} & StackProps;

enum SwapMode {
  BUY,
  SELL,
}

const PrototypeSwap = (props: PrototypeSwapProps) => {
  const { token } = useTokenDetail();

  const { onAddSnackbar } = useSnackbar();
  const { tokensBalance, onGetBalances } = useTokensBalance();
  const { tokensPrice } = useTokensPrice();
  const { connected, address, signAndSubmitTransaction } = useAptosWallet();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [mode, setMode] = useState<SwapMode>(SwapMode.BUY);
  const [amount, setAmount] = useState<number>(0);
  const [receive, setReceive] = useState<number>(0);
  const [fromUsd, setFromUsd] = useState<number>(0);
  const [receiveUsd, setReceiveUsd] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const config = useMemo(() => {
    return token?.currency ? CONFIG_BY_CURRENCY[token.currency] : undefined;
  }, [token?.currency]);

  const currencyPrice = useMemo(() => {
    return token?.currency && Object.keys(tokensPrice).length
      ? tokensPrice[token.currency].usd
      : 0;
  }, [token?.currency, tokensPrice]);

  const currencyBalance = useMemo(() => {
    if (!token?.currency || !Object.keys(tokensBalance).length) return 0;
    return tokensBalance[token.currency];
  }, [token?.currency, tokensBalance]);

  const tokenBalance = useMemo(() => {
    if (
      !token?.token_address ||
      !Object.keys(tokensBalance).length ||
      !tokensBalance[token.token_address]
    )
      return 0;
    return tokensBalance[token.token_address];
  }, [token?.token_address, tokensBalance]);

  const balanceUsed = useMemo(
    () => (mode === SwapMode.BUY ? currencyBalance : tokenBalance),
    [currencyBalance, tokenBalance, mode],
  );

  const [fromIcon, toIcon] = useMemo(() => {
    if (mode === SwapMode.BUY) return [config?.icon, token?.icon_url];
    return [token?.icon_url, config?.icon];
  }, [config?.icon, mode, token?.icon_url]);

  const [fromName, toName] = useMemo(() => {
    if (mode === SwapMode.BUY) return [config?.name, token?.name];
    return [token?.name, config?.name];
  }, [config?.name, mode, token?.name]);

  const [fromSymbol, toSymbol] = useMemo(() => {
    if (mode === SwapMode.BUY) return [config?.name, token?.symbol];
    return [token?.symbol, config?.name];
  }, [config?.name, mode, token?.symbol]);

  const [fromBalance, toBalance] = useMemo(() => {
    if (mode === SwapMode.BUY) return [currencyBalance, tokenBalance];
    return [tokenBalance, currencyBalance];
  }, [currencyBalance, tokenBalance, mode]);

  const onToggleMode = () => {
    setMode((prevMode) =>
      prevMode === SwapMode.BUY ? SwapMode.SELL : SwapMode.BUY,
    );
    setAmount(0);
    setError("");
  };

  const onChangeAmount = (newValue, checkDecimal = true) => {
    const decimals = `${newValue}`.split(".")[1];

    if (checkDecimal && `${decimals ?? ""}`.length > MAX_DECIMAL) {
      newValue = Math.floor(newValue) + `.${decimals.slice(0, MAX_DECIMAL)}`;
    }

    // if (newValue > fromBalance) newValue = fromBalance;

    setAmount(newValue);

    const _amount = Number(newValue || 0);
    let _receive = 0;

    if (token) {
      if (mode === SwapMode.BUY) {
        const availableSpace = token.max_pool_daox - token.pool_daox + 0.000001;

        let effectiveAmount: number;
        let fee_amount = (_amount * FEE_BPS) / BASIS_POINTS;
        if (_amount - fee_amount < availableSpace) {
          effectiveAmount = _amount - fee_amount;
        } else {
          fee_amount = (availableSpace * FEE_BPS) / (BASIS_POINTS - FEE_BPS);
          setAmount(
            limitDecimalNumber(
              availableSpace + fee_amount,
              MAX_DECIMAL,
            ) as number,
          );
          effectiveAmount = availableSpace;
        }

        const curVirtualDaoxReverse =
          token.virtual_daox_reserves + effectiveAmount;
        const curVirtualCoinReverse =
          (token.virtual_daox_reserves * token.virtual_coin_reserves) /
          curVirtualDaoxReverse;

        _receive = token.virtual_coin_reserves - curVirtualCoinReverse;

        const curPrice = effectiveAmount / _receive;
        setFromUsd((effectiveAmount + fee_amount) * currencyPrice);
        setReceiveUsd(currencyPrice * _receive * curPrice);

        setReceive(
          limitDecimalNumber(_receive, token.decimals, {
            getMinDecimal: false,
          }) as number,
        );
      } else {
        const curVirtualCoinReverse = token.virtual_coin_reserves + _amount;
        const curVirtualDaoxReverse =
          (token.virtual_daox_reserves * token.virtual_coin_reserves) /
          curVirtualCoinReverse;
        const outAmount = token.virtual_daox_reserves - curVirtualDaoxReverse;
        const feeAmount = (outAmount * FEE_BPS) / BASIS_POINTS;

        _receive = outAmount - feeAmount;

        const curPrice = outAmount / _amount;
        setFromUsd(currencyPrice * _amount * curPrice);
        setReceiveUsd(currencyPrice * _receive);

        setReceive(
          limitDecimalNumber(_receive, MAX_DECIMAL, {
            getMinDecimal: false,
          }) as number,
        );
      }
    }

    setError(
      getError(mode === SwapMode.BUY ? newValue : _receive, balanceUsed, token),
    );
  };

  const onChangeReceive = (newValue, checkDecimal = true) => {
    const decimals = `${newValue}`.split(".")[1];

    if (checkDecimal && `${decimals ?? ""}`.length > MAX_DECIMAL) {
      newValue = Math.floor(newValue) + `.${decimals.slice(0, MAX_DECIMAL)}`;
    }

    // if (newValue > toBalance) newValue = toBalance;

    setReceive(newValue);

    const _receive = Number(newValue || 0);

    let _amount = 0;

    if (token) {
      if (mode === SwapMode.BUY) {
        _amount =
          (token.virtual_daox_reserves * token.virtual_coin_reserves) /
            (token.virtual_coin_reserves - _receive) -
          token.virtual_daox_reserves;

        if (_amount < 0) {
          _amount = Number(tokenBalance);
          onChangeAmount(Number(tokenBalance));
        } else {
          const curPrice = _amount / _receive;
          const fee = (_amount * FEE_BPS) / (BASIS_POINTS - FEE_BPS);
          setFromUsd((_amount + fee) * currencyPrice);
          setReceiveUsd(_receive * curPrice * currencyPrice);
          setAmount(
            limitDecimalNumber(_amount + fee, MAX_DECIMAL, {
              getMinDecimal: false,
            }) as number,
          );
        }
      } else {
        _amount =
          (token.virtual_daox_reserves * token.virtual_coin_reserves) /
            (token.virtual_daox_reserves -
              (BASIS_POINTS * _receive) / (BASIS_POINTS - FEE_BPS)) -
          token.virtual_coin_reserves;

        if (_amount < 0) {
          _amount = Number(tokenBalance);
          onChangeAmount(Number(tokenBalance));
        } else {
          setAmount(
            limitDecimalNumber(_amount, MAX_DECIMAL, {
              getMinDecimal: false,
            }) as number,
          );
        }
      }
    }

    setError(getError(_amount, balanceUsed, token));
  };

  const onTradeSuccess = () => {
    if (!address || !token?.pool_id) return;
    onGetBalances(address);
    setAmount(0);
    setReceive(0);
    setError("");
  };

  const onBuy = async () => {
    setIsSubmitting(true);
    try {
      if (!address) throw WALLET_NOT_CONNECTED;
      if (!config || !token) return;

      const minOut = Math.floor(receive * 0.99 * Math.pow(10, token.decimals));

      const transaction = await signAndSubmitTransaction({
        data: {
          function: `${BONDING_PACKAGE_ID}::noctra_agent::buy`,
          typeArguments: [config.coinType],
          functionArguments: [
            token.pool_id,
            new U64(numberToBlockchain(amount, token.decimals)),
            new U64(minOut),
          ],
        },
      });

      await aptosClient.waitForTransaction({
        transactionHash: transaction.hash,
      });

      onAddSnackbar(
        "Buy successfully!",
        "info",
        `You spent ${formatNumber(amount, { suffix: getTicker(fromSymbol) })} to buy ${formatNumber(receive, { suffix: getTicker(toSymbol) })}`,
      );
      onTradeSuccess();
    } catch (error) {
      console.error(error);
      if (error?.toString()?.includes(REJECT_ERROR)) return;
      if (error?.toString()?.startsWith(TRANSACTION_NOT_FOUND_ERROR)) {
        onAddSnackbar(
          "Buy successfully!",
          "info",
          `You spent ${formatNumber(amount, { suffix: getTicker(fromSymbol) })} to buy ${formatNumber(receive, { suffix: getTicker(toSymbol) })}`,
        );
        onTradeSuccess();
        return;
      }
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSell = async () => {
    try {
      setIsSubmitting(true);
      if (!address) throw WALLET_NOT_CONNECTED;
      if (!config || !token || !tokenBalance) return;

      const minOut = Math.floor(receive * Math.pow(10, config.decimals) * 0.99);

      const transaction = await signAndSubmitTransaction({
        data: {
          function: `${BONDING_PACKAGE_ID}::noctra_agent::sell`,
          typeArguments: [config.coinType],
          functionArguments: [
            token.pool_id,
            new U64(numberToBlockchain(amount, token.decimals)),
            new U64(minOut),
          ],
        },
      });

      await aptosClient.waitForTransaction({
        transactionHash: transaction.hash,
      });

      onAddSnackbar(
        "Sell successfully!",
        "info",
        `You sold ${formatNumber(amount, { suffix: getTicker(fromSymbol) })} and received ${formatNumber(receive, { suffix: getTicker(toSymbol) })}`,
      );
      onTradeSuccess();
    } catch (error) {
      console.error(error);
      if (error?.toString()?.includes(REJECT_ERROR)) return;
      if (error?.toString()?.startsWith(TRANSACTION_NOT_FOUND_ERROR)) {
        onAddSnackbar(
          "Sell successfully!",
          "info",
          `You sold ${formatNumber(amount, { suffix: getTicker(fromSymbol) })} and received ${formatNumber(receive, { suffix: getTicker(toSymbol) })}`,
        );
        onTradeSuccess();
        return;
      }

      onAddSnackbar(getMessageErrorByAPI(error), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!address) return;
    onGetBalances(address);
  }, [address, onGetBalances]);

  useEffect(() => {
    setAmount(0);
    setReceive(0);
    setFromUsd(0);
    setReceiveUsd(0);
  }, [mode, token]);

  return (
    <Stack
      bgcolor="grey.A700"
      width="100%"
      px={{ xs: 1, lg: 2, elg: 3 }}
      pb={3}
      borderRadius={2}
    >
      <Item
        label="From"
        symbol={fromSymbol}
        balance={fromBalance || 0}
        image={fromIcon}
        usdt={fromUsd || 0}
        inputProps={{
          onChangeText: onChangeAmount,
          value: amount || 0,
          disabled: isSubmitting,
        }}
        error={error}
        name={fromName}
      />
      <IconButton
        onClick={onToggleMode}
        sx={{
          p: 1.25,
          bgcolor: "grey.A700",
          alignSelf: "center",
          mt: -2,
        }}
      >
        <SwitchIcon fontSize="small" />
      </IconButton>
      {token ? (
        <Item
          mt={-2}
          label="To"
          symbol={toSymbol}
          balance={toBalance || 0}
          image={toIcon}
          usdt={receiveUsd || 0}
          name={toName}
          inputProps={{
            value: receive || 0,
            onChangeText: onChangeReceive,
            disabled: isSubmitting,
          }}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={118}
          sx={{
            borderRadius: 2,
          }}
        />
      )}
      <Button
        submitting={isSubmitting}
        onClick={
          !connected
            ? onTriggerConnectWallet
            : mode === SwapMode.BUY
              ? onBuy
              : onSell
        }
        variant="contained"
        disabled={connected && (!amount || !!error)}
        fullWidth
        size="large"
        sx={{
          mt: 4,
          textTransform: "initial",
        }}
      >
        {connected
          ? StringFormat(error, { ticker: getTicker(fromSymbol) }) ||
            "Place Trade"
          : "Connect Wallet"}
      </Button>
    </Stack>
  );
};

export default memo(PrototypeSwap);

const Item = (props: ItemProps) => {
  const {
    label,
    symbol,
    image,
    balance = 0,
    inputProps,
    children,
    error,
    name,
    usdt,
    ...rest
  } = props;

  const onUse = (value: number) => () => {
    if (!inputProps?.onChangeText) return;
    inputProps.onChangeText(
      limitDecimalNumber(balance * value, MAX_DECIMAL) as number,
    );
  };

  return (
    <Stack borderRadius={2} bgcolor="grey.A700" overflow="hidden" {...rest}>
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        px={2}
        py={1.5}
        justifyContent="flex-end"
      >
        <Text variant="subtitle2" mr="auto">
          {label}
        </Text>
        <Stack direction="row" alignItems="center">
          <WalletIcon sx={{ fontSize: 18, mt: 0.25 }} />
          <Text variant="body2" ml={0.5}>
            {formatNumber(balance, { numberOfFixed: TOKEN_DECIMAL })}
          </Text>
        </Stack>
        <Button
          onClick={onUse(1)}
          variant="contained"
          sx={{ height: 28, minHeight: 28, mx: 1.25, borderRadius: 1 }}
          css={{
            backgroundColor: "text.secondary",
            borderColor: "transparent",
            color: "grey.400",
          }}
          disabled={inputProps?.disabled}
        >
          Max
        </Button>
        <Button
          onClick={onUse(0.5)}
          variant="outlined"
          sx={{ height: 28, minHeight: 28, borderRadius: 1 }}
          css={{
            backgroundColor: "text.secondary",
            borderColor: "transparent",
            color: "grey.400",
          }}
          disabled={inputProps?.disabled}
        >
          50%
        </Button>
      </Stack>
      <Stack
        width="100%"
        px={2}
        py={1.5}
        bgcolor="text.secondary"
        sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TokenInfo
          py={1}
          pr={1.5}
          pl={0.5}
          direction="row-reverse"
          borderRadius={1.5}
          bgcolor="grey.A700"
          value={symbol}
          icon={image}
          name={name}
          size={24}
          textProps={{ variant: "subtitle2" }}
        />
        <Stack width="100%" spacing={0.5} alignItems="flex-end">
          <TextField
            fullWidth
            sx={{
              bgcolor: "transparent",
              border: "none",
              p: 0,
              ...typography.h2,
              fontSize: typography.h2.fontSize,
              "& input": {
                textAlign: "right",
                px: 0,
                "&:disabled": {
                  WebkitTextFillColor: "#FFFFFF",
                },
              },
            }}
            type="number"
            placeholder="0.00"
            error={!!error}
            {...inputProps}
          />
          <Text minHeight={18} variant="body2" color="grey.400">
            {typeof usdt === "number"
              ? formatNumber(usdt, { prefix: "~ $" })
              : undefined}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

const MAX_DECIMAL = 6;

const getError = (amount?: number, balance?: number, token?: Token) => {
  if (!token) return "";
  // const addToken = token?.max_pool_daox - token?.pool_daox;
  // const fee = (addToken * FEE_BPS) / (BASIS_POINTS - FEE_BPS);

  // const additionToken = addToken + fee;
  switch (true) {
    // case Number(amount) > additionToken:
    //   return `Amount exceeds ${formatNumber(additionToken)} {ticker} allowed`;
    case Number(balance) < Number(amount):
      return "Insufficient balance";
    default:
      return "";
  }
};
