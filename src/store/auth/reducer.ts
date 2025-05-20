/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginX, loginGoogle, loginAccount, authAptos } from "./action";

interface PropsUserConnectsAuth {
  connectType?: string;
  account?: string;
  displayName?: string | null;
}

export interface PropsUserAuth {
  id: string;
  username: string;
  displayName: string;
  refCode?: string;
  point?: number;
  energy?: number;
  earnedCommissions?: number;
  refCount?: number;
  isSetupAA?: boolean;
  createdAt?: string;
  userConnects?: PropsUserConnectsAuth[];
  lastLogin?: number;
  isDefaultAdmin?: boolean;
  email?: string;
}
export interface PropsAuths {
  accessToken: string;
  refreshToken: string;
  user: PropsUserAuth;
}

export interface PropsAuthsState {
  data: PropsAuths;
  loading: boolean;
  error: string;
  isConnectAptos: boolean;
  isLogin: boolean;
}

const initialStateAuthLogins: PropsAuthsState = {
  data: {} as PropsAuths,
  loading: false,
  error: "",
  isConnectAptos: false,
  isLogin: false,
};

const Auth_Login = createSlice({
  name: "auth_login",
  initialState: initialStateAuthLogins,
  reducers: {
    setIsConnectAptos: (state, action: PayloadAction<boolean>) => {
      state.isConnectAptos = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // google
      .addCase(loginGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loginGoogle.fulfilled,
        (state, action: PayloadAction<PropsAuths>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(loginGoogle.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // x
      .addCase(loginX.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginX.fulfilled, (state, action: PayloadAction<PropsAuths>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(loginX.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // username/password
      .addCase(loginAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loginAccount.fulfilled,
        (state, action: PayloadAction<PropsAuths>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(loginAccount.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // aptos
      .addCase(authAptos.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        authAptos.fulfilled,
        (state, action: PayloadAction<PropsAuths>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(authAptos.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default Auth_Login.reducer;

export const { setIsConnectAptos, setIsLogin } = Auth_Login.actions;
