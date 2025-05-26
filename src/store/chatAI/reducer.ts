/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetHistory, SendMessage } from "./action";
import { TypeChat } from "./helper";

export interface HistoryProps {
  id: number;
  content: string | any;
  type: TypeChat;
}
interface ChatAIState {
  message: string;
  histories: HistoryProps[];
  loading: boolean;
  error: string;
  isCall: boolean;
}

const initialState: ChatAIState = {
  loading: false,
  error: "",
  histories: [],
  message: "",
  isCall: false,
};

const ChatAIReducer = createSlice({
  name: "chatAI",
  initialState,
  reducers: {
    setIsCall: (state, action: PayloadAction<boolean>) => {
      state.isCall = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        SendMessage.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.message = action.payload;
          state.loading = false;
          state.isCall = true;
        },
      )
      .addCase(SendMessage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(GetHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        GetHistory.fulfilled,
        (state, action: PayloadAction<HistoryProps[]>) => {
          state.histories = action.payload;
          state.loading = false;
        },
      )
      .addCase(GetHistory.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ChatAIReducer.reducer;

export const { setIsCall } = ChatAIReducer.actions;
