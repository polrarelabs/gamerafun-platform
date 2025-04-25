import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Snackbar, addSnackbar, removeSnackbar, resetBalance } from "./reducer";
import { getBalances, getPrices } from "./action";
import { shallowEqual } from "react-redux";

export const useSnackbar = () => {
  const dispatch = useAppDispatch();

  const snackbarList = useAppSelector((state) => state.app.snackbarList);

  const onAddSnackbar = useCallback(
    (
      message: Snackbar["message"],
      severity?: Snackbar["severity"],
      content?: Snackbar["content"],
      expiredIn?: Snackbar["expiredIn"],
    ) => {
      dispatch(addSnackbar({ message, severity, content, expiredIn }));
    },
    [dispatch],
  );

  const onRemoveSnackbar = useCallback(
    (snackbarId: string) => {
      dispatch(removeSnackbar(snackbarId));
    },
    [dispatch],
  );

  return {
    snackbarList,
    onAddSnackbar,
    onRemoveSnackbar,
  };
};

export const useTokensBalance = () => {
  const dispatch = useAppDispatch();

  const { tokensBalance } = useAppSelector((state) => state.app, shallowEqual);

  const onGetBalances = useCallback(
    (address: string) => {
      dispatch(getBalances(address));
    },
    [dispatch],
  );

  const onResetBalance = useCallback(() => {
    dispatch(resetBalance());
  }, [dispatch]);

  return {
    tokensBalance,
    onGetBalances,
    onResetBalance,
  };
};

export const useTokensPrice = () => {
  const dispatch = useAppDispatch();

  const { tokensPrice } = useAppSelector((state) => state.app, shallowEqual);

  const onGetPrices = useCallback(() => {
    dispatch(getPrices());
  }, [dispatch]);

  return {
    tokensPrice,
    onGetPrices,
  };
};
