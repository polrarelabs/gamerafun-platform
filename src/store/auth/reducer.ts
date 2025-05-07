/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { petraSignMessage, AuthSignMessage, authSignMessage } from "./action";

export interface SignMessageProps {
  loading: boolean;
  data: string;
  error: string;
  isConnectPetra: boolean;
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

export const reducers = {
  auth: AuthSignMessageReducer.reducer,
  signmessage: SignMessageReducer.reducer,
};

export const { setIsConnectPetra } = SignMessageReducer.actions;

// export default SignMessageReducer.reducer;
