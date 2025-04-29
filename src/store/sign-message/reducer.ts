/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { petraSignMessage } from "./action";

interface SignMessage {
  loginId: string;
}

export interface SignMessageProps {
  loading: boolean;
  data: SignMessage;
  error: string;
}

const initialState: SignMessageProps = {
  data: {} as SignMessage,
  loading: false,
  error: "",
};

const SignMessageReducer = createSlice({
  name: "signmessage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(petraSignMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        petraSignMessage.fulfilled,
        (state, action: PayloadAction<SignMessage>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(
        petraSignMessage.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      );
  },
});

export default SignMessageReducer.reducer;
