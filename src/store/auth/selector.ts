import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  AuthSignMessage,
  authSignMessage,
  loginAccount,
  LoginAccount,
  loginGoogle,
  LoginGoogle,
  loginX,
  petraSignMessage,
  PropsLoginX,
  PropsSignMessage,
} from "./action";
import { setIsConnectPetra, setIsLogin } from "./reducer";
import { store } from "@store/configureStore";
import Cookies from "js-cookie";

export const useSignMessage = () => {
  const dispatch = useAppDispatch();

  const petraMessage = (body: PropsSignMessage) => {
    return dispatch(petraSignMessage(body));
  };

  const IsLogin = (value: boolean) => {
    return dispatch(setIsLogin(value));
  };

  const IsConnectPetra = (value: boolean) => {
    return dispatch(setIsConnectPetra(value));
  };

  const { data, loading, error, isConnectPetra, isLogin } = useAppSelector(
    (state) => state.signmessage,
  );

  return {
    data,
    loading,
    error,
    petraMessage,
    IsConnectPetra,
    isConnectPetra,
    IsLogin,
    isLogin,
  };
};

export const useAuthSignMessage = () => {
  const dispatch = useAppDispatch();

  const AuthSignMessage = (body: AuthSignMessage) => {
    store.dispatch({ type: "" });
    dispatch(authSignMessage(body));
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

export const useAuthLoginX = () => {
  const dispatch = useAppDispatch();

  const LoginX = (param: PropsLoginX) => {
    store.dispatch({ type: "" });
    dispatch(loginX(param));
  };

  const { dataAuthLogin, loadingAuthLogin, errorAuthLogin } = useAppSelector(
    (state) => state.loginX,
  );

  return {
    LoginX,
    dataAuthLogin,
    loadingAuthLogin,
    errorAuthLogin,
  };
};

export const useLoginAccount = () => {
  const dispatch = useAppDispatch();

  const LoginAccount = (body: LoginAccount) => {
    store.dispatch({ type: "" });
    dispatch(loginAccount(body));
  };

  const {
    dataAuthLoginAccount,
    loadingAuthLoginAccount,
    errorAuthLoginAccount,
  } = useAppSelector((state) => state.LoginAccount);

  return {
    dataAuthLoginAccount,
    loadingAuthLoginAccount,
    errorAuthLoginAccount,
    LoginAccount,
  };
};

export const useLoginGoogle = () => {
  const dispatch = useAppDispatch();

  const LoginGoogle = (body: LoginGoogle) => {
    dispatch(loginGoogle(body));
    store.dispatch({ type: "" });
  };

  const { dataAuthLoginGoogle, loadingAuthLoginGoogle, errorAuthLoginGoogle } =
    useAppSelector((state) => state.loginGoogle);

  return {
    LoginGoogle,
    dataAuthLoginGoogle,
    loadingAuthLoginGoogle,
    errorAuthLoginGoogle,
  };
};

export const useLogOut = () => {
  const logOut = () => {
    store.dispatch({ type: "RESET_STORE" });
    Cookies.remove("accessToken", { path: "" });
  };
  return {
    logOut,
  };
};
