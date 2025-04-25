import { ReactNode } from "react";
import { AgentState, Currency, TradeMode } from "./enum";

export interface Size {
  width?: number;
  height?: number;
}

export type SortBy = -1 | 1 | "asc" | "ascending" | "desc" | "descending";
export type Sort = `${string},${SortBy}`;

export type CoinType = `${string}::${string}::${string}`;

export interface Record {
  id: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Option {
  label: string | number;
  value: string | number;
  subValue?: string | number;
  icon?: string | ReactNode;
  disabled?: boolean;
}

export type CssOptions = {
  width?: number | string;
  height?: number | string;
  fontFamily?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  color?: string;
  hoverColor?: string;
  clipPath?: string;
};

export type Params = {
  [key: string]: string | number | string[] | number[] | boolean | undefined;
};

export type OptionFormatNumber = {
  numberOfFixed?: number;
  emptyText?: string;
  localeOption?: Intl.NumberFormatOptions;
  prefix?: string;
  suffix?: string;
  space?: boolean;
  getMinDecimal?: boolean;
  groupZeroDecimal?: boolean;
} & Intl.NumberFormatOptions;

export type OptionLimitDecimal = {
  getMinDecimal?: boolean;
  convertString?: boolean;
};

export interface Paging {
  pageIndex: number;
  pageSize: number;
  totalPages?: number;
  totalItems?: number;
}

export type ItemListResponse<T> = Paging & {
  totalPages: number;
  totalItems: number;
  items: T[];
  filters?: Params;
};

export interface BaseQueries {
  pageIndex: number;
  pageSize: number;
  search?: string | number;

  // CLIENT
  concat?: boolean;
}

export type ErrorResponse = {
  statusCode: number;
  message: string | string[];
};

export interface TokenLaunched {
  address: string;
  token: string;
  pair: string;
  blockTimestamp: number;
  transactionHash: string;
}

export interface TokenData {
  token: string;
  name: string;
  ticker: string;
  supply: number;
  price: number;
  marketCap: number;
  liquidity: number;
  volume: number;
  volume24H: number;
  prevPrice: number;
  lastUpdated: number; //s
  holders: number;
  change24H: number;
  updatedAt: string;
}

export interface PairInfo {
  address: string;
  reserve0: number;
  reserve1: number;
  updatedBlockTimestamp: number;
  updatedTransactionHash: string;
}

export interface Token {
  id: string;
  pool_id: string;
  total_supply: number;
  max_pool_daox: number;
  virtual_coin_reserves: number;
  virtual_daox_reserves: number;
  name: string;
  symbol: string;
  decimals: number;
  description: string;
  icon_url: string;
  sender: string;
  pool_type: string;
  token_address: string;
  coin_type: string;
  x: string;
  telegram: string;
  website: string;
  agent_age: number;
  personality: string;
  first_message: string;
  lore: string;
  style: string;
  adjective: string;
  knowledge: string;
  complete: boolean;
  createdAt: string;
  updatedAt: string;
  pool_daox: number;
  pool_coin: number;
  marketCap?: number;
  change24H: number;
  volume24H: number;
  holders: number;
  packageId: string;
  curvePercent?: number;
  cetus_pair: string;
  currency: Currency;

  priceUsd?: number;
  priceNative?: number;
  hasDexData?: boolean;
}

export interface TokenHolder {
  address: string;
  balance: number;
}

export interface Trading {
  id: string;
  open: number;
  time: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  updatedBlockTimestamp: string;
  updatedTransactionHash: string;
  updatedAt: string;
}

export interface Swap {
  id: string;
  sender: string;
  timestampMs: number;
  transactionHash: number;
  is_buy: boolean;
  amount: number;
  receive: number;
}

export interface TokenPrice {
  usd: number;
  usd_market_cap: number;
  usd_24h_vol: number;
  usd_24h_change: number;
}

export interface TokenBalance {
  balance: number;
  objectIds: string[];
}

export interface TokenPrice {
  usd: number;
  usd_market_cap: number;
  usd_24h_vol: number;
  usd_24h_change: number;
}

export interface TokenHolder {
  address: string;
  balance: number;
}

export interface Trading {
  id: string;
  open: number;
  time: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  updatedBlockTimestamp: string;
  updatedTransactionHash: string;
  updatedAt: string;
}

export interface Swap {
  id: string;
  sender: string;
  timestampMs: number;
  transactionHash: number;
  is_buy: boolean;
  amount: number;
  receive: number;
}
