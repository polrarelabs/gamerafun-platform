"use client";

import { Address, Avatar, Socials } from "@components/Info";
import Pagination from "@components/Pagination";
import { Button, Image, Text, TextProps } from "@components/shared";
import {
  CONFIG_BY_CURRENCY,
  DEFAULT_PAGING,
  FEE_BPS,
  BASIS_POINTS,
  BONDING_PACKAGE_ID,
} from "@constant";
import { AGENT_DETAIL_PATH } from "@constant/paths";
import { Token } from "@constant/types";
import useBreakpoint from "@hooks/useBreakpoint";
import { buttonClasses, Stack } from "@mui/material";
import { useTokens, ViewMode } from "@store/token";
import {
  formatCash,
  formatNumber,
  blockchainToNumber,
  numberToBlockchain,
  getMessageErrorByAPI,
  getTicker,
} from "@utils";
import { useRouter } from "next/navigation";
import BotImg from "public/images/img-bot.png";
import { memo, useEffect, useRef, useState } from "react";
import StringFormat from "string-format";
import { TokenItem } from "./components";
import { Currency } from "@constant/enum";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import useAptosWallet from "@hooks/useAptosWallet";
import { useSnackbar, useTokensBalance, useTokensPrice } from "@store/app";
import {
  REJECT_ERROR,
  TRANSACTION_NOT_FOUND_ERROR,
  WALLET_NOT_CONNECTED,
} from "@constant/error";
import { aptosClient } from "@contexts/WalletProvider";
import { U64 } from "@aptos-labs/ts-sdk";
import Link from "@components/Link";

const ItemList = () => {
  const {
    items,
    onGetTokens,
    filters,
    pageIndex,
    pageSize,
    totalPages,
    totalItems,
    isFetching,
    viewMode,
    isSucceeded,
    onUpdateViewMode,
  } = useTokens();
  const { isMdSmaller } = useBreakpoint();
  const { onGetBalances, tokensBalance } = useTokensBalance();
  const { tokensPrice } = useTokensPrice();
  const { onAddSnackbar } = useSnackbar();

  const { address, signAndSubmitTransaction } = useAptosWallet();
  const [submittingId, setSubmittingId] = useState<string | undefined>();

  const lastCountRef = useRef<number>(6);

  const { push } = useRouter();

  const onChangePage = (newPage: number) => {
    onGetTokens({
      ...filters,
      pageSize,
      pageIndex: newPage,
    });
  };

  const onGoDetail = (token: string) => () => {
    push(
      StringFormat(AGENT_DETAIL_PATH, {
        token,
      }),
    );
  };

  const onQuickBuy = (item: Token) => async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSubmittingId(item.pool_id);
    const quickBuyAmount = AMOUNT_QUICK_BUY[item.currency];
    const receive = getAmountOut(item, quickBuyAmount);
    try {
      if (!address) throw WALLET_NOT_CONNECTED;
      const config = CONFIG_BY_CURRENCY[item.currency];

      const minOut = Math.floor(receive * 0.99 * Math.pow(10, item.decimals));

      const transaction = await signAndSubmitTransaction({
        data: {
          function: `${BONDING_PACKAGE_ID}::noctra_agent::buy`,
          typeArguments: [config.coinType],
          functionArguments: [
            item.pool_id,
            new U64(numberToBlockchain(quickBuyAmount, item.decimals)),
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
        `You spent ${formatNumber(quickBuyAmount, { suffix: getTicker(item.currency) })} to buy ${formatNumber(receive, { suffix: getTicker(item.symbol) })}`,
      );
      onGetBalances(address);
      onGetTokens({ ...filters, pageIndex, pageSize, silent: true });
    } catch (error) {
      console.error(error);
      if (error?.toString()?.includes(REJECT_ERROR)) return;
      if (
        error?.toString()?.startsWith(TRANSACTION_NOT_FOUND_ERROR) &&
        address
      ) {
        onAddSnackbar(
          "Buy successfully!",
          "info",
          `You spent ${formatNumber(quickBuyAmount, { suffix: getTicker(item.currency) })} to buy ${formatNumber(receive, { suffix: getTicker(item.symbol) })}`,
        );
        onGetBalances(address);
        onGetTokens({ ...filters, pageIndex, pageSize, silent: true });
        return;
      }
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    } finally {
      setSubmittingId(undefined);
    }
  };

  useEffect(() => {
    onGetTokens(DEFAULT_PAGING);
  }, [onGetTokens]);

  useEffect(() => {
    if (!isMdSmaller) return;
    onUpdateViewMode(ViewMode.GRID);
  }, [isMdSmaller, onUpdateViewMode]);

  useEffect(() => {
    if (!isSucceeded || !items.length) return;
    lastCountRef.current = items.length;
  }, [isSucceeded, items.length]);

  return (
    <Stack
      width="100%"
      flex={1}
      alignItems="center"
      spacing={8}
      minHeight={items.length > 1 ? 600 : undefined}
    >
      {Boolean(Number(totalItems === 0) && isSucceeded) ? (
        <Stack
          flex={1}
          justifyContent="center"
          alignItems="center"
          width="100%"
          minHeight={300}
        >
          <Image
            src={BotImg}
            size={{ xs: 60, md: 100 }}
            sizes="100px"
            aspectRatio={1}
            alt=""
          />
          <Text variant="h3" fontWeight={600} textAlign="center">
            No any agents
          </Text>
        </Stack>
      ) : viewMode === ViewMode.LIST ? (
        <Stack
          flex={1}
          width="100%"
          overflow="auto"
          sx={{ overflowX: "auto" }}
          spacing={1}
        >
          <Stack direction="row" minWidth="fit-content" alignItems="center">
            {HEADER_LIST.map((item) => (
              <Text
                variant="subtitle2"
                color="grey.400"
                key={item.value}
                textTransform="uppercase"
                px={2}
                pt={0.1875}
                pb={1.1875}
                width={item.width}
                minWidth={item?.minWidth}
                textAlign={item?.align as TextProps["textAlign"]}
                whiteSpace="nowrap"
              >
                {item.value}
              </Text>
            ))}
          </Stack>
          <Stack
            minWidth="fit-content"
            sx={{ overflowY: "auto" }}
            maxHeight={MAX_ROW * 78 + (MAX_ROW - 1) * 8}
            spacing={1}
          >
            {items.map((item) => {
              const balance = tokensBalance[item.currency];
              const quickBuyAmount = AMOUNT_QUICK_BUY[item.currency];
              const marketCap = item.hasDexData
                ? item.marketCap
                : Number(item.marketCap || 0) * tokensPrice[item.currency].usd;

              return (
                <Stack
                  key={item.pool_id}
                  direction="row"
                  minWidth="fit-content"
                  py={0.6875}
                  border="1px solid"
                  alignItems="center"
                  borderColor="grey.700"
                  borderRadius={2}
                  component={Link}
                  href={StringFormat(AGENT_DETAIL_PATH, {
                    token: item.pool_id,
                  })}
                  sx={{
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                    },
                  }}
                >
                  <Stack
                    pl={2}
                    direction="row"
                    spacing={2}
                    width={HEADER_LIST[0].width}
                    minWidth={HEADER_LIST[0].minWidth}
                  >
                    <Avatar
                      src={item.icon_url}
                      currency={item.currency}
                      size={56}
                      name={item.name}
                      variant="rounded"
                      currencySize={20}
                    />
                    <Stack spacing={0.75} width="100%">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Text
                          variant="overline"
                          textTransform="initial"
                          color="grey.400"
                          whiteSpace="nowrap"
                        >
                          {getTicker(item.symbol)}
                        </Text>
                        <Text
                          variant="subtitle2"
                          bgcolor="grey.600"
                          py={0.25}
                          px={0.75}
                          borderRadius={1}
                          whiteSpace="nowrap"
                        >
                          {item.name}
                        </Text>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Address value={item.token_address} />
                        <Socials data={item} />
                      </Stack>
                    </Stack>
                  </Stack>
                  <Text
                    width={HEADER_LIST[1].width}
                    minWidth={HEADER_LIST[1].minWidth}
                    pl={2}
                  >
                    {formatCash(marketCap, { prefix: "$" })}
                  </Text>
                  <Text
                    pl={2}
                    width={HEADER_LIST[2].width}
                    minWidth={HEADER_LIST[2].minWidth}
                    color={
                      Number(item.change24H) > 0 ? "success.main" : "error.main"
                    }
                  >
                    {formatNumber(item.change24H, {
                      suffix: "%",
                      space: false,
                      numberOfFixed: 2,
                    })}
                  </Text>
                  <Text
                    pl={2}
                    width={HEADER_LIST[3].width}
                    minWidth={HEADER_LIST[3].minWidth}
                  >
                    {formatCash(
                      item?.hasDexData
                        ? item.volume24H
                        : blockchainToNumber(
                            item.volume24H * tokensPrice[item.currency].usd,
                            CONFIG_BY_CURRENCY[item.currency].decimals,
                          ),
                      {
                        prefix: "$",
                      },
                    )}
                  </Text>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    pl={2}
                    width={HEADER_LIST[4].width}
                    minWidth={HEADER_LIST[4].minWidth}
                  >
                    <Button
                      onClick={onQuickBuy(item)}
                      disabled={Boolean(
                        item.complete || Number(balance) < quickBuyAmount,
                      )}
                      sx={{
                        minWidth: 118,
                        [`& .${buttonClasses.startIcon}`]: {
                          bgcolor: "common.black",
                          borderRadius: "50%",
                          p: 0.25,
                        },
                      }}
                      variant="contained"
                      submitting={Boolean(item?.pool_id == submittingId)}
                      css={{ backgroundColor: "common.white" }}
                      tooltip={
                        Boolean(
                          !item?.complete && Number(balance) < quickBuyAmount,
                        )
                          ? "Insufficient balance"
                          : undefined
                      }
                      startIcon={
                        item.complete ? undefined : (
                          <Image
                            src={CONFIG_BY_CURRENCY[item.currency].icon}
                            alt=""
                            width={16}
                            height={16}
                          />
                        )
                      }
                    >
                      {item.complete
                        ? "Full bonding"
                        : item?.pool_id == submittingId
                          ? "Buying"
                          : formatNumber(quickBuyAmount)}
                    </Button>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      ) : (
        <Stack
          width="100%"
          {...(items?.length || isFetching
            ? {
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(1, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                  elg: "repeat(5, 1fr)",
                  xl: "repeat(6, 1fr)",
                },
                gap: 2.5,
              }
            : {})}
        >
          {isFetching
            ? Array.from(new Array(lastCountRef.current)).map((_, index) => (
                <TokenItem key={index} skeleton item={{} as Token} />
              ))
            : items.map((item) => (
                <TokenItem key={item.token_address} item={item} />
              ))}
        </Stack>
      )}
      {Number(totalPages) > 1 && (
        <Pagination
          totalItems={totalItems}
          totalPages={totalPages}
          pageSize={pageSize}
          page={pageIndex}
          onChangePage={onChangePage}
        />
      )}
    </Stack>
  );
};

export default memo(ItemList);

const MAX_ROW = 8;

const HEADER_LIST = [
  { value: "AI Agents", width: "30%", minWidth: 450 },
  { value: "Market Cap", width: "20%", minWidth: 200 },
  { value: "24h Change", width: "15%", minWidth: 200 },
  { value: "24H Vol", width: "20%", minWidth: 200 },
  { value: "Quick Buy", width: "15%", align: "center", minWidth: 150 },
];

const AMOUNT_QUICK_BUY = {
  [Currency.NOCTRA]: 5000,
  [Currency.APT]: 3,
  [Currency.USDC]: 15,
};

const getAmountOut = (token: Token, quiclBuyAmount: number) => {
  const availableSpace = token.max_pool_daox - token.pool_daox + 0.000001;

  let effectiveAmount: number;
  let fee_amount = (quiclBuyAmount * FEE_BPS) / BASIS_POINTS;
  if (quiclBuyAmount - fee_amount < availableSpace) {
    effectiveAmount = quiclBuyAmount - fee_amount;
  } else {
    fee_amount = (availableSpace * FEE_BPS) / (BASIS_POINTS - FEE_BPS);
    effectiveAmount = availableSpace;
  }

  const curVirtualDaoxReverse = token.virtual_daox_reserves + effectiveAmount;
  const curVirtualCoinReverse =
    (token.virtual_daox_reserves * token.virtual_coin_reserves) /
    curVirtualDaoxReverse;

  return token.virtual_coin_reserves - curVirtualCoinReverse;
};
