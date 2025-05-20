import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  authAptos,
  AuthAptos,
  loginAccount,
  LoginAccount,
  loginGoogle,
  LoginGoogle,
  loginX,
  PropsLoginX,
} from "./action";
import { setIsConnectAptos, setIsLogin } from "./reducer";
import { store } from "@store/configureStore";
import Cookies from "js-cookie";

export const useAptos = () => {
  const dispatch = useAppDispatch();

  const IsLogin = (value: boolean) => {
    return dispatch(setIsLogin(value));
  };

  const IsConnectAptos = (value: boolean) => {
    return dispatch(setIsConnectAptos(value));
  };

  const { data, loading, error, isConnectAptos, isLogin } = useAppSelector(
    (state) => state.aptos_reducers,
  );

  return {
    data,
    loading,
    error,
    IsLogin,
    isLogin,
    IsConnectAptos,
    isConnectAptos,
  };
};

export const useAuthLogin = () => {
  const dispatch = useAppDispatch();

  const LoginGoogle = (body: LoginGoogle) => {
    store.dispatch({ type: "" });
    dispatch(loginGoogle(body));
  };
  const LoginX = (param: PropsLoginX) => {
    store.dispatch({ type: "" });
    dispatch(loginX(param));
  };

  const LoginAccount = (body: LoginAccount) => {
    store.dispatch({ type: "" });
    dispatch(loginAccount(body));
  };
  const AuthAptos = (body: AuthAptos) => {
    store.dispatch({ type: "" });
    dispatch(authAptos(body));
  };

  const { data, loading, error } = useAppSelector((state) => state.auth_login);

  return {
    data,
    loading,
    error,
    LoginGoogle,
    LoginX,
    LoginAccount,
    AuthAptos,
  };
};

export const useLogOut = () => {
  const logOut = () => {
    Cookies.remove("accessToken", { path: "/" });
    store.dispatch({ type: "RESET_STORE" });
  };
  return {
    logOut,
  };
};
