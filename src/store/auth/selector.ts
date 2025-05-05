import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  AuthSignMessage,
  authSignMessage,
  petraSignMessage,
  PropsSignMessage,
} from "./action";
import { setIsConnectPetra } from "./reducer";

export const useSignMessage = () => {
  const dispatch = useAppDispatch();

  const petraMessage = (body: PropsSignMessage) => {
    return dispatch(petraSignMessage(body));
  };

  const IsConnectPetra = (value: boolean) => {
    return dispatch(setIsConnectPetra(value));
  };

  const { data, loading, error, isConnectPetra } = useAppSelector(
    (state) => state.signmessage,
  );

  return {
    data,
    loading,
    error,
    petraMessage,
    IsConnectPetra,
    isConnectPetra,
  };
};

export const useAuthSignMessage = () => {
  const dispatch = useAppDispatch();

  const AuthSignMessage = (body: AuthSignMessage) => {
    return dispatch(authSignMessage(body));
  };

  const { dataAuth, loadingAuth, errorAuth } = useAppSelector(
    (state) => state.auth,
  );

  return {
    dataAuth,
    loadingAuth,
    errorAuth,
    AuthSignMessage,
  };
};
