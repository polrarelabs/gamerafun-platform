/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestItems, QuestState } from "./type";
import { GetQuest } from "./action";

const initialState: QuestState = {
  quest: [],
  loading: false,
  error: null,
};

const QuestReducers = createSlice({
  name: "quest/reducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetQuest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        GetQuest.fulfilled,
        (state, action: PayloadAction<QuestItems[]>) => {
          state.loading = false;
          state.quest = action.payload;
        },
      )
      .addCase(GetQuest.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default QuestReducers.reducer;
