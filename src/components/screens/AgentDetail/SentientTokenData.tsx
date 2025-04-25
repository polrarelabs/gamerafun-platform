"use client";

import { Text } from "@components/shared";
import { CONFIG_BY_CURRENCY } from "@constant";
import { OptionFormatNumber } from "@constant/types";
import { Box, Stack } from "@mui/material";
import { useTokenDetail } from "@store/token";
import { formatCash, formatNumber } from "@utils";
import { memo } from "react";
import { Heading } from "./components";
import { useTokensPrice } from "@store/app";

type ItemProps = {
  label: string;
  value?: number;
  numberOptions?: OptionFormatNumber;
  color?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  format?: Function;
};
type SentientTokenDataProps = {};

const SentientTokenData = (props: SentientTokenDataProps) => {
  const { token } = useTokenDetail();
  const { tokensPrice } = useTokensPrice();

  if (!token) return null;

  return (
    <Stack
      borderTop="1px solid"
      py={3}
      px={{ xs: 1, lg: 4 }}
      borderColor="divider"
    >
      <Heading mb={2.5}>Token data</Heading>
      <Stack borderRadius={2} p={2} bgcolor="grey.A700">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Item
            label="MC (FDV)"
            value={
              token?.hasDexData
                ? token?.marketCap
                : (token?.marketCap || 0) * tokensPrice[token.currency].usd
            }
            numberOptions={{ prefix: "$" }}
            format={formatCash}
          />
          <Item
            label="24h Chg"
            value={token.change24H}
            numberOptions={{ suffix: "%", space: false }}
            color
          />
          {/* <Item
            label="TVL"
            value={
              (token.pool_coin *
                token.virtual_daox_reserves *
                tokensPrice[token.currency].usd) /
              (token.virtual_coin_reserves * Math.pow(10, token.decimals))
            }
            numberOptions={{ prefix: "$" }}
            format={formatCash}
          /> */}
        </Stack>
        <Box width="100%" mt={2} mb={1} height="1px" bgcolor="divider" />
        <Stack
          direction="row"
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          alignItems="center"
          spacing={1}
        >
          {/* <Item label="Holders" value={token.holders} /> */}
          <Item
            label="24h vol"
            value={
              token?.hasDexData
                ? token.volume24H
                : (token.volume24H * tokensPrice[token.currency].usd) /
                  Math.pow(10, CONFIG_BY_CURRENCY[token.currency].decimals)
            }
            numberOptions={{ prefix: "$" }}
            format={formatCash}
          />
          {/* <Item label="Inferences" value={undefined} /> */}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(SentientTokenData);

const Item = (props: ItemProps) => {
  const { label, value, numberOptions, color, format = formatNumber } = props;

  return (
    <Stack spacing={0.5} flex={1}>
      <Text variant="subtitle2" color="grey.400">
        {label}
      </Text>
      <Text
        variant="body2"
        color={
          typeof value !== "number" || !color || value == 0
            ? "common.white"
            : value > 0
              ? "success.light"
              : "error.main"
        }
      >
        {format(value, numberOptions)}
      </Text>
    </Stack>
  );
};
