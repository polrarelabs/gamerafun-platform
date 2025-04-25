import { client, Endpoint } from "@api";
import {
  AGENT_DECIMALS,
  AN_ERROR_TRY_AGAIN,
  BASIS_POINTS,
  CONFIG_BY_CURRENCY,
  FEE_BPS,
} from "@constant";
import { AgentState, AgentType, Currency } from "@constant/enum";
import { BaseQueries, Token, TokenHolder } from "@constant/types";
import { aptosClient } from "@contexts/WalletProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { cleanObject, blockchainToNumber, sleep } from "@utils";
import { HttpStatusCode } from "axios";
import StringFormat from "string-format";

export type TokenListQueries = BaseQueries & {
  agentState?: AgentState;
  poolType?: AgentType;

  silent?: boolean;
};

export type TransactionListQueries = BaseQueries & {
  token: string;
  interval: number;
};

export type SwapQueries = BaseQueries & {
  pool_id: string;
};

const getHolders = async (ownerAddress: string, poolId: string) => {
  try {
    const data = await aptosClient.getCurrentFungibleAssetBalances({
      options: {
        where: {
          asset_type: {
            _eq: ownerAddress,
          },
          token_standard: { _eq: "v2" },
        },
      },
    });

    return data
      .reduce((out: TokenHolder[], item) => {
        if (item.owner_address !== poolId) {
          out.push({
            address: item.owner_address,
            balance: blockchainToNumber(item.amount, AGENT_DECIMALS),
          });
        }
        return out;
      }, [])
      .sort((a, b) => b.balance - a.balance);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRecommendTokens = createAsyncThunk(
  "token/getRecommendTokens",
  async () => {
    try {
      const response = await client.get(Endpoint.RECOMMEND_AGENTS);

      if (response?.status === HttpStatusCode.Ok) {
        return response.data.map((item) => rawDataToReadable(item));
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const getTokens = createAsyncThunk(
  "token/getTokens",
  async ({ silent, ...queries }: TokenListQueries) => {
    try {
      await sleep(500);
      const response = await client.get(Endpoint.TOKENS, cleanObject(queries));

      if (response?.status === HttpStatusCode.Ok) {
        return {
          ...response.data,
          items: response.data.items.map((item) => rawDataToReadable(item)),
        };
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const getTokenInfo = createAsyncThunk(
  "token/getTokenInfo",
  async ({ token, silent }: { token: string; silent?: boolean }) => {
    try {
      const response = await client.get(
        StringFormat(Endpoint.TOKEN_ITEM, { token }),
      );

      if (response?.status === HttpStatusCode.Ok) {
        const readableData = rawDataToReadable(response.data);

        const holders = await getHolders(
          readableData.token_address,
          readableData.pool_id,
        );

        return {
          ...readableData,
          holders: holders.length,
          hasDexData: false,
        };
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const getHoldersOfToken = createAsyncThunk(
  "token/getHoldersOfToken",
  async ({
    tokenAddress,
    poolId,
  }: {
    tokenAddress: string;
    poolId: string;
  }) => {
    try {
      const responseData = await getHolders(tokenAddress, poolId);
      return responseData;
    } catch (error) {
      throw error;
    }
  },
);

export const getTransactionsOfToken = createAsyncThunk(
  "token/getTransactionsOfToken",
  async ({ token, ...queries }: TransactionListQueries) => {
    try {
      const response = await client.get(
        StringFormat(Endpoint.TRADING, { token }),
        cleanObject(queries),
      );

      if (response?.status === HttpStatusCode.Ok) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const getSwapsOfToken = createAsyncThunk(
  "token/getSwapsOfToken",
  async ({ pool_id, ...queries }: SwapQueries) => {
    try {
      const response = await client.get(
        StringFormat(Endpoint.SWAP, { token: pool_id }),
        cleanObject(queries),
      );

      if (response?.status === HttpStatusCode.Ok) {
        return {
          ...response.data,
          items: response.data.items.map((item) => rawDataSwapToReadable(item)),
        };
      }
    } catch (error) {
      throw error;
    }
  },
);

const FALLBACK_DIVIDE_ZERO = 1;

export const rawDataToReadable = (item): Token => {
  let currency: Currency = (item?.pool_type || "").split("::")?.[2];

  const indexCurrency = Object.values(CONFIG_BY_CURRENCY).findIndex(
    (config) => config.coinType === item.pool_type,
  );

  currency = (Object.keys(CONFIG_BY_CURRENCY)[indexCurrency] ??
    Currency.APT) as Currency; // fallback APT

  const decimals = CONFIG_BY_CURRENCY[currency].decimals;

  const totalSupply = blockchainToNumber(item.total_supply, item.decimals);
  const virtualDaoxReserves = blockchainToNumber(
    item.virtual_base_reserves,
    decimals,
  );
  const virtualCoinReserves = blockchainToNumber(
    item.virtual_token_reserves,
    item.decimals,
  );

  return {
    ...item,
    total_supply: totalSupply,
    pool_daox: blockchainToNumber(item.pool_base, decimals),
    max_pool_daox: blockchainToNumber(item.max_pool_amount, decimals),
    curvePercent: (item.pool_base * 100) / item.max_pool_amount,
    virtual_coin_reserves: virtualCoinReserves,
    virtual_daox_reserves: virtualDaoxReserves,
    marketCap:
      totalSupply *
      (item.virtual_base_reserves /
        (item.virtual_token_reserves || FALLBACK_DIVIDE_ZERO)),
    currency,

    createdAt: item.timestamp * 1000,
  };
};

export const rawDataSwapToReadable = (item) => {
  return {
    ...item,
    transactionHash: item.transaction_version,
    timestampMs: Number(item.timestamp) * 1000,
    amount: item.is_buy
      ? (item.base_amount * BASIS_POINTS) / (BASIS_POINTS - FEE_BPS)
      : item.token_amount,
    receive: item.is_buy ? item.token_amount : item.base_amount,
  };
};
