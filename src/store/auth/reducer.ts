/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  petraSignMessage,
  authSignMessage,
  loginX,
  loginGoogle,
} from "./action";

export interface SignMessageProps {
  loading: boolean;
  data: string;
  error: string;
  isConnectPetra: boolean;
  isLogin: boolean;
}

export interface AuthSignMessageProps {
  loading: boolean;
  data: any | null;
  error: string;
}

const initialState: SignMessageProps = {
  data: "",
  loading: false,
  error: "",
  isConnectPetra: false,
  isLogin: false,
};

const initialStateAuth = {
  loadingAuth: false,
  errorAuth: "",
  dataAuth: "",
};

const SignMessageReducer = createSlice({
  name: "signmessage",
  initialState,
  reducers: {
    setIsConnectPetra: (state, action: PayloadAction<boolean>) => {
      state.isConnectPetra = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(petraSignMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        petraSignMessage.fulfilled,
        (state, action: PayloadAction<any | null>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(
        petraSignMessage.rejected,
        (state, action: PayloadAction<any | null>) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      );
  },
});

const AuthSignMessageReducer = createSlice({
  name: "auth/signmessage",
  initialState: initialStateAuth,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignMessage.pending, (state) => {
        state.loadingAuth = true;
      })
      .addCase(
        authSignMessage.fulfilled,
        (state, action: PayloadAction<any | null>) => {
          state.dataAuth = action.payload;
          state.loadingAuth = false;
        },
      )
      .addCase(
        authSignMessage.rejected,
        (state, action: PayloadAction<any | null>) => {
          state.loadingAuth = false;
          state.errorAuth = action.payload as string;
        },
      );
  },
});

interface PropsUserConnects {
  connectType: string;
  account: string;
  displayName: string | null;
}
interface PropsUser {
  id: string;
  username: string;
  displayName: string;
  refCode: string;
  point: number;
  energy: number;
  earnedCommissions: number;
  refCount: number;
  isSetupAA: boolean;
  createdAt: string;
  userConnects: PropsUserConnects[];
  lastLogin: number;
}
export interface PropsAuth {
  accessToken: string;
  refreshToken: string;
  user: PropsUser;
}

export interface PropsAuthXReducers {
  dataAuthLogin: PropsAuth;
  loadingAuthLogin: boolean;
  errorAuthLogin: string;
}

const initialStateAuthLogin: PropsAuthXReducers = {
  dataAuthLogin: {} as PropsAuth,
  loadingAuthLogin: false,
  errorAuthLogin: "",
};

const LoginXReducer = createSlice({
  name: "loginX",
  initialState: initialStateAuthLogin,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginX.pending, (state) => {
        state.loadingAuthLogin = true;
      })
      .addCase(loginX.fulfilled, (state, action: PayloadAction<PropsAuth>) => {
        state.loadingAuthLogin = false;
        state.dataAuthLogin = action.payload;
      })
      .addCase(loginX.rejected, (state, action: PayloadAction<any>) => {
        state.loadingAuthLogin = false;
        state.errorAuthLogin = action.payload as string;
      });
  },
});

export interface PropsAuthGoogleReducers {
  dataAuthLoginGoogle: PropsAuth;
  loadingAuthLoginGoogle: boolean;
  errorAuthLoginGoogle: string;
}

const initialStateAuthLoginGoogle: PropsAuthGoogleReducers = {
  dataAuthLoginGoogle: {} as PropsAuth,
  loadingAuthLoginGoogle: false,
  errorAuthLoginGoogle: "",
};

const LoginGoogleReducer = createSlice({
  name: "loginGoogle",
  initialState: initialStateAuthLoginGoogle,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginGoogle.pending, (state) => {
        state.loadingAuthLoginGoogle = true;
      })
      .addCase(
        loginGoogle.fulfilled,
        (state, action: PayloadAction<PropsAuth>) => {
          state.loadingAuthLoginGoogle = false;
          state.dataAuthLoginGoogle = action.payload;
        },
      )
      .addCase(loginGoogle.rejected, (state, action: PayloadAction<any>) => {
        state.loadingAuthLoginGoogle = false;
        state.errorAuthLoginGoogle = action.payload as string;
      });
  },
});

export const reducers = {
  auth: AuthSignMessageReducer.reducer,
  signmessage: SignMessageReducer.reducer,
  loginX: LoginXReducer.reducer,
  loginGoogle: LoginGoogleReducer.reducer,
};

export const { setIsConnectPetra, setIsLogin } = SignMessageReducer.actions;

// export default SignMessageReducer.reducer;
