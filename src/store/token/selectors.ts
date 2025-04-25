import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { shallowEqual } from "react-redux";
import {
  getHoldersOfToken,
  getRecommendTokens,
  getSwapsOfToken,
  getTokenInfo,
  getTokens,
  getTransactionsOfToken,
  SwapQueries,
  TokenListQueries,
  TransactionListQueries,
} from "./actions";
import { DataStatus } from "@constant/enum";
import {
  addSwap,
  resetTokenDetail,
  updateTokenDetail,
  updateTokenListViewMode,
  ViewMode,
} from "./reducer";
import { Token } from "@constant/types";

export const useRecommendTokens = () => {
  const dispatch = useAppDispatch();

  const {
    recommendItems: items,
    recommendItemsStatus: status,
    recommendItemsError: error,
  } = useAppSelector((state) => state.token, shallowEqual);

  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);

  const onGetRecommendTokens = useCallback(() => {
    dispatch(getRecommendTokens());
  }, [dispatch]);

  return {
    items,
    status,
    error,
    isFetching,
    isSucceeded,
    onGetRecommendTokens,
  };
};

export const useTokens = () => {
  const dispatch = useAppDispatch();

  const {
    tokenItems: items,
    tokenItemsStatus: status,
    tokenItemsError: error,
    tokenItemsFilters: filters,
    tokenItemsViewMode: viewMode,
  } = useAppSelector((state) => state.token, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.token.tokenItemsPaging,
    shallowEqual,
  );

  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);

  const onGetTokens = useCallback(
    (queries: TokenListQueries) => {
      dispatch(getTokens(queries));
    },
    [dispatch],
  );

  const onUpdateViewMode = useCallback(
    (newMode: ViewMode) => {
      dispatch(updateTokenListViewMode(newMode));
    },
    [dispatch],
  );

  return {
    items,
    status,
    error,
    filters,
    isFetching,
    isSucceeded,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    viewMode,
    onGetTokens,
    onUpdateViewMode,
  };
};

export const useTokenDetail = () => {
  const dispatch = useAppDispatch();

  const { token, tokenStatus: status } = useAppSelector(
    (state) => state.token,
    shallowEqual,
  );

  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetToken = useCallback(
    (token: string, silent = false) => {
      dispatch(getTokenInfo({ token, silent }));
    },
    [dispatch],
  );

  const onUpdateToken = useCallback(
    (token: Token) => {
      dispatch(updateTokenDetail(token));
    },
    [dispatch],
  );

  const onResetToken = useCallback(() => {
    dispatch(resetTokenDetail());
  }, [dispatch]);

  return {
    token,
    status,
    isFetching,
    onResetToken,
    onGetToken,
    onUpdateToken,
  };
};

export const useHolders = () => {
  const dispatch = useAppDispatch();

  const {
    tokenHolderItems: items,
    tokenHolderItemsStatus: status,
    tokenHolderItemsError: error,
  } = useAppSelector((state) => state.token, shallowEqual);

  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);

  const onGetHolders = useCallback(
    (tokenAddress: string, poolId: string) => {
      dispatch(getHoldersOfToken({ tokenAddress, poolId }));
    },
    [dispatch],
  );

  return {
    items,
    status,
    error,
    isFetching,
    isSucceeded,
    onGetHolders,
  };
};

export const useTransactions = () => {
  const dispatch = useAppDispatch();

  const {
    transactionItems: items,
    transactionItemsStatus: status,
    transactionItemsError: error,
    transactionItemsFilters: filters,
  } = useAppSelector((state) => state.token, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.token.transactionItemsPaging,
    shallowEqual,
  );

  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);

  const onGetTransactions = useCallback(
    (queries: TransactionListQueries) => {
      dispatch(getTransactionsOfToken(queries));
    },
    [dispatch],
  );

  return {
    items,
    status,
    error,
    filters,
    isFetching,
    isSucceeded,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    onGetTransactions,
  };
};

export const useSwaps = () => {
  const dispatch = useAppDispatch();

  const {
    swapItems,
    swapItemsStatus: status,
    swapItemsError: error,
    swapItemsFilters: filters,
  } = useAppSelector((state) => state.token, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.token.swapItemsPaging,
    shallowEqual,
  );

  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);
  const items = useMemo(
    () => [...swapItems].sort((a, b) => b.timestampMs - a.timestampMs),
    [swapItems],
  );

  const onGetSwaps = useCallback(
    (queries: SwapQueries) => {
      dispatch(getSwapsOfToken(queries));
    },
    [dispatch],
  );

  const onAddSwap = useCallback(
    (data) => {
      dispatch(addSwap(data));
    },
    [dispatch],
  );

  return {
    items,
    status,
    error,
    filters,
    isFetching,
    isSucceeded,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    onGetSwaps,
    onAddSwap,
  };
};
