import { client } from "@api/client";
import { Endpoint } from "@api/endpoint";
import {
  AGENT_DECIMALS,
  AN_ERROR_TRY_AGAIN,
  CONFIG_BY_CURRENCY,
} from "@constant";
import { Currency } from "@constant/enum";
import { CoinType } from "@constant/types";
import { aptosClient } from "@contexts/WalletProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { blockchainToNumber, sleep } from "@utils";
import { HttpStatusCode } from "axios";

export const getBalances = createAsyncThunk(
  "app/getBalances",
  async (accountAddress: string) => {
    try {
      const coinsData = await aptosClient.getAccountCoinsData({
        accountAddress,
      });

      const coinTypesOfCurrency = Object.values(CONFIG_BY_CURRENCY).map(
        (item) => item.coinType,
      );
      const keysOfCurrency = Object.keys(CONFIG_BY_CURRENCY);

      return coinsData.reduce(
        (out: { [key in Currency | string]: number }, item, index) => {
          let key = item.asset_type,
            decimals = AGENT_DECIMALS;

          const indexCurrency = coinTypesOfCurrency.findIndex(
            (value) => value === item.asset_type,
          );

          if (indexCurrency !== -1) {
            key = keysOfCurrency[indexCurrency] as Currency;
            decimals = CONFIG_BY_CURRENCY[key].decimals;
          }

          if (key) {
            out[key] = blockchainToNumber(item.amount, decimals);
          }
          return out;
        },
        {
          [Currency.APT]: 0,
          [Currency.GAMERA]: 0,
          [Currency.USDC]: 0,
        },
      );
    } catch (error) {
      throw error;
    }
  },
);

export const getPrices = createAsyncThunk("app/getPrices", async () => {
  try {
    // const response = await client.get(Endpoint.PRICE);

    // if (response?.status === HttpStatusCode.Ok) {
    //   return response.data;
    // }
    // throw AN_ERROR_TRY_AGAIN;

    await sleep(500);

    return {
      [Currency.APT]: {
        usd: 5.1204,
        usd_market_cap: 0,
        usd_24h_vol: 0,
        usd_24h_change: 0,
      },
      [Currency.GAMERA]: {
        usd: 0.0021,
        usd_market_cap: 0,
        usd_24h_vol: 0,
        usd_24h_change: 0,
      },
      [Currency.USDC]: {
        usd: 0.9996,
        usd_market_cap: 0,
        usd_24h_vol: 0,
        usd_24h_change: 0,
      },
    };
  } catch (error) {
    throw error;
  }
});
