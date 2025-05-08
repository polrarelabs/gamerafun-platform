/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetChatAI } from "./action";

export interface DataAskAI {
  threadId: string;
}

const initialState: DataAskAI = {
  threadId: "",
};

const AskAIReducer = createSlice({
  name: "ask/ai",
  initialState,
  reducers: {
    setThreadId: (state, action: PayloadAction<string>) => {
      state.threadId = action.payload;
    },
  },
});

export interface MessageChat {
  id: number;
  content: any | null;
  type: string;
}

export interface MessageChatProps {
  data: MessageChat[];
  loading: boolean;
  error: string;
}

const initialStateMessage: MessageChatProps = {
  data: [],
  loading: false,
  error: "",
};

const GetMessageReducer = createSlice({
  name: "get/message",
  initialState: initialStateMessage,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetChatAI.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        GetChatAI.fulfilled,
        (state, action: PayloadAction<MessageChat[]>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(GetChatAI.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const reducers = {
  askAI: AskAIReducer.reducer,
  messageChat: GetMessageReducer.reducer,
};

export const { setThreadId } = AskAIReducer.actions;
