import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ItemListResponse,
  Paging,
  Swap,
  Token,
  TokenHolder,
  Trading,
} from "@constant/types";
import { DataStatus } from "@constant/enum";
import {
  getHoldersOfToken,
  getRecommendTokens,
  getSwapsOfToken,
  getTokenInfo,
  getTokens,
  getTransactionsOfToken,
  rawDataSwapToReadable,
  SwapQueries,
  TokenListQueries,
  TransactionListQueries,
} from "./actions";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "@constant";
import { getFiltersFromQueries, removeDuplicateItem } from "@utils";

export enum ViewMode {
  LIST,
  GRID,
}

export interface TokenState {
  recommendItems: Token[];
  recommendItemsStatus: DataStatus;
  recommendItemsError?: string;

  tokenItems: Token[];
  tokenItemsStatus: DataStatus;
  tokenItemsError?: string;
  tokenItemsPaging: Paging;
  tokenItemsFilters: Omit<TokenListQueries, "pageIndex" | "pageSize">;
  tokenItemsViewMode: ViewMode;

  tokenStatus: DataStatus;
  token?: Token;

  tokenHolderItems: TokenHolder[];
  tokenHolderItemsStatus: DataStatus;
  tokenHolderItemsError?: string;

  transactionItems: Trading[];
  transactionItemsStatus: DataStatus;
  transactionItemsError?: string;
  transactionItemsPaging: Paging;
  transactionItemsFilters: Omit<
    TransactionListQueries,
    "pageIndex" | "pageSize"
  >;

  swapItems: Swap[];
  swapItemsStatus: DataStatus;
  swapItemsError?: string;
  swapItemsPaging: Paging;
  swapItemsFilters: Omit<SwapQueries, "pageIndex" | "pageSize">;
}

const initialState: TokenState = {
  recommendItems: [],
  recommendItemsStatus: DataStatus.IDLE,

  tokenItems: [],
  tokenItemsStatus: DataStatus.IDLE,
  tokenItemsPaging: DEFAULT_PAGING,
  tokenItemsFilters: {},
  tokenItemsViewMode: ViewMode.GRID,

  tokenStatus: DataStatus.IDLE,

  tokenHolderItems: [],
  tokenHolderItemsStatus: DataStatus.IDLE,

  transactionItems: [],
  transactionItemsStatus: DataStatus.IDLE,
  transactionItemsPaging: DEFAULT_PAGING,
  transactionItemsFilters: { token: "", interval: 0 },

  swapItems: [],
  swapItemsStatus: DataStatus.IDLE,
  swapItemsPaging: DEFAULT_PAGING,
  swapItemsFilters: { pool_id: "" },
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    updateTokenListViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.tokenItemsViewMode = action.payload;
    },
    updateTokenDetail: (state, action: PayloadAction<Token>) => {
      state.token = action.payload;
    },
    resetTokenDetail: (state) => {
      state.token = undefined;
      state.tokenStatus = DataStatus.IDLE;
      state.transactionItems = [];
      state.transactionItemsStatus = DataStatus.IDLE;
      state.transactionItemsPaging = DEFAULT_PAGING;
      state.transactionItemsFilters = { token: "", interval: 0 };
      state.transactionItemsError = undefined;
      state.tokenHolderItems = [];
      state.tokenHolderItemsStatus = DataStatus.IDLE;
      state.tokenHolderItemsError = undefined;
    },
    addSwap: (state, action) => {
      if (state.swapItemsPaging.totalItems !== undefined) {
        const newTransaction = rawDataSwapToReadable(action.payload) as Swap;
        const indexExisted = state.swapItems.findIndex(
          (item) => item.transactionHash === newTransaction.transactionHash,
        );
        if (indexExisted === -1) {
          state.swapItems.unshift(rawDataSwapToReadable(action.payload));
          state.swapItemsPaging.totalItems += 1;
          state.swapItemsPaging.totalPages = Math.ceil(
            state.swapItemsPaging.totalItems / state.swapItemsPaging.pageSize,
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendTokens.pending, (state, _action) => {
        state.recommendItemsStatus = DataStatus.LOADING;
        state.recommendItems = [];
      })
      .addCase(
        getRecommendTokens.fulfilled,
        (state, action: PayloadAction<Token[]>) => {
          state.recommendItemsStatus = DataStatus.SUCCEEDED;
          state.recommendItems = action.payload;
          state.recommendItemsError = undefined;
        },
      )
      .addCase(getRecommendTokens.rejected, (state, action) => {
        state.recommendItemsStatus = DataStatus.FAILED;
        state.recommendItemsError = action?.error.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(getTokens.pending, (state, action) => {
        if (!action.meta.arg?.silent) {
          state.tokenItemsStatus = DataStatus.LOADING;
          state.tokenItemsFilters = getFiltersFromQueries(action.meta.arg);
          state.tokenItems = [];
        }
      })
      .addCase(
        getTokens.fulfilled,
        (state, action: PayloadAction<ItemListResponse<Token>>) => {
          const { items, filters, ...paging } = action.payload;

          state.tokenItemsStatus = DataStatus.SUCCEEDED;
          state.tokenItems = items;
          state.tokenItemsPaging = paging;
          state.tokenItemsError = undefined;
        },
      )
      .addCase(getTokens.rejected, (state, action) => {
        state.tokenItemsStatus = DataStatus.FAILED;
        state.tokenItemsError = action?.error.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(getTokenInfo.pending, (state, action) => {
        if (!state?.token || !action.meta.arg?.silent) {
          state.tokenStatus = DataStatus.LOADING;
          state.token = undefined;
        }
      })
      .addCase(
        getTokenInfo.fulfilled,
        (state, action: PayloadAction<Token>) => {
          state.tokenStatus = DataStatus.SUCCEEDED;
          state.token = action.payload;
        },
      )
      .addCase(getHoldersOfToken.pending, (state, _action) => {
        state.tokenHolderItemsStatus = DataStatus.LOADING;
        state.tokenHolderItems = [];
      })
      .addCase(
        getHoldersOfToken.fulfilled,
        (state, action: PayloadAction<TokenHolder[]>) => {
          state.tokenHolderItemsStatus = DataStatus.SUCCEEDED;
          state.tokenHolderItems = action.payload;
          state.tokenHolderItemsError = undefined;
        },
      )
      .addCase(getHoldersOfToken.rejected, (state, action) => {
        state.tokenHolderItemsStatus = DataStatus.FAILED;
        state.tokenHolderItemsError =
          action?.error.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(getTransactionsOfToken.pending, (state, action) => {
        state.transactionItemsStatus = DataStatus.LOADING;
        state.transactionItemsFilters = getFiltersFromQueries(
          action.meta.arg,
        ) as TokenState["transactionItemsFilters"];
        if (action.meta.arg.pageIndex === 1) {
          state.transactionItems = [];
        }
      })
      .addCase(
        getTransactionsOfToken.fulfilled,
        (state, action: PayloadAction<ItemListResponse<Trading>>) => {
          const { items, ...paging } = action.payload;

          state.transactionItemsStatus = DataStatus.SUCCEEDED;
          state.transactionItems = removeDuplicateItem(
            items
              .map((item) => ({ ...item, time: Math.round(item.time / 1000) }))
              .sort((a, b) => a.time - b.time) ?? [],
            "time",
          );

          state.transactionItemsPaging = paging;
          state.transactionItemsError = undefined;
        },
      )
      .addCase(getTransactionsOfToken.rejected, (state, action) => {
        state.transactionItemsStatus = DataStatus.FAILED;
        state.transactionItemsError =
          action?.error.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(getSwapsOfToken.pending, (state, action) => {
        state.swapItemsStatus = DataStatus.LOADING;
        state.swapItemsFilters = getFiltersFromQueries(
          action.meta.arg,
        ) as TokenState["swapItemsFilters"];
        if (action.meta.arg.pageIndex === 1) {
          state.swapItems = [];
        }
      })
      .addCase(
        getSwapsOfToken.fulfilled,
        (state, action: PayloadAction<ItemListResponse<Swap>>) => {
          const { items, ...paging } = action.payload;

          state.swapItemsStatus = DataStatus.SUCCEEDED;
          state.swapItems = removeDuplicateItem(
            state.swapItems.concat(items),
            "transactionHash",
          );
          state.swapItemsPaging = paging;
          state.swapItemsError = undefined;
        },
      )
      .addCase(getSwapsOfToken.rejected, (state, action) => {
        state.swapItemsStatus = DataStatus.FAILED;
        state.swapItemsError = action?.error.message ?? AN_ERROR_TRY_AGAIN;
      });
  },
});

export const {
  updateTokenListViewMode,
  updateTokenDetail,
  resetTokenDetail,
  addSwap,
} = tokenSlice.actions;

export default tokenSlice.reducer;
