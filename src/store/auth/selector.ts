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

  const IsLogin = (value: boolean) => {
    return dispatch(setIsLogin(value));
  };

  const IsConnectAptos = (value: boolean) => {
    return dispatch(setIsConnectAptos(value));
  };

  const { data, loading, error, isConnectAptos, isLogin } = useAppSelector(
    (state) => state.auth,
  );

  return {
    data,
    loading,
    error,
    LoginGoogle,
    LoginX,
    LoginAccount,
    AuthAptos,
    IsLogin,
    IsConnectAptos,
    isConnectAptos,
    isLogin,
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
