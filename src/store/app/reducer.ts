import { Currency } from "@constant/enum";
import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uuid } from "utils/index";
import { getBalances, getPrices } from "./action";
import { TokenPrice } from "@constant/types";

export interface Snackbar {
  message: string;
  severity?: AlertColor;
  expiredIn?: number;
  content?: string;
}

export type SnackbarItem = Snackbar & {
  id: string;
};

export interface AppState {
  snackbarList: SnackbarItem[];

  tokensBalance: {
    [key in Currency | string]: number;
  };
  tokensPrice: {
    [key in Currency]: TokenPrice;
  };
}

const initialState: AppState = {
  snackbarList: [],

  tokensBalance: {
    [Currency.APT]: 0,
    [Currency.NOCTRA]: 0,
    [Currency.USDC]: 0,
  },

  tokensPrice: {
    [Currency.APT]: {
      usd: 0,
      usd_market_cap: 0,
      usd_24h_vol: 0,
      usd_24h_change: 0,
    },
    [Currency.NOCTRA]: {
      usd: 0,
      usd_market_cap: 0,
      usd_24h_vol: 0,
      usd_24h_change: 0,
    },
    [Currency.USDC]: {
      usd: 0,
      usd_market_cap: 0,
      usd_24h_vol: 0,
      usd_24h_change: 0,
    },
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addSnackbar: (state, action: PayloadAction<Snackbar>) => {
      state.snackbarList.push({
        id: uuid(),
        ...action.payload,
      });
    },
    removeSnackbar: (state, action: PayloadAction<string>) => {
      const indexDeleted = state.snackbarList.findIndex(
        (item) => item.id === action.payload,
      );
      if (indexDeleted !== -1) {
        state.snackbarList.splice(indexDeleted, 1);
      }
    },
    resetBalance: (state) => {
      state.tokensBalance = initialState.tokensBalance;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getBalances.fulfilled,
        (state, action: PayloadAction<AppState["tokensBalance"]>) => {
          state.tokensBalance = action.payload;
        },
      )
      .addCase(getPrices.fulfilled, (state, action) => {
        state.tokensPrice = action.payload;
      });
  },
});

export const { addSnackbar, removeSnackbar, resetBalance } = appSlice.actions;

export default appSlice.reducer;
