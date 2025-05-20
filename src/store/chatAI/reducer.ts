/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetHistory, SendMessage } from "./action";
import { TypeChat } from "./helper";

export interface SendMessageState {
  data: any | null;
  loading: boolean;
  error: string;
  isCall: boolean;
}

const initialStateSendMessage: SendMessageState = {
  data: null,
  loading: false,
  error: "",
  isCall: false,
};

const SendMessageReducer = createSlice({
  name: "post/sendMessage",
  initialState: initialStateSendMessage,
  reducers: {
    setIsCall: (state, action: PayloadAction<boolean>) => {
      state.isCall = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(SendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        SendMessage.fulfilled,
        (state, action: PayloadAction<any | null>) => {
          state.data = action.payload;
          state.loading = false;
          state.isCall = true;
        },
      )
      .addCase(SendMessage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export interface GetHistoryProps {
  id: number;
  content: string | any;
  type: TypeChat;
}
interface GetHistoryState {
  data: GetHistoryProps[];
  loading: boolean;
  error: string;
}

const initialStateHistory: GetHistoryState = {
  data: [],
  loading: false,
  error: "",
};

const GetHisToryReducer = createSlice({
  name: "get/history",
  initialState: initialStateHistory,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        GetHistory.fulfilled,
        (state, action: PayloadAction<GetHistoryProps[]>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(GetHistory.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const reducers = {
  sendMessage: SendMessageReducer.reducer,
  history: GetHisToryReducer.reducer,
};

export const { setIsCall } = SendMessageReducer.actions;
