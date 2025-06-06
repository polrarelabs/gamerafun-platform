/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestItems, QuestState } from "./type";
import { CreateQuest, GetQuest, GetQuestById, JoinQuest } from "./action";

const initialState: QuestState = {
  quest: [],
  questById: {} as QuestItems,
  isCreate: false,
  isJoin: false,
  loading: false,
  error: null,
};

const QuestReducers = createSlice({
  name: "quest/reducer",
  initialState,
  reducers: {
    SetCreate: (state) => {
      state.isCreate = false;
    },
    SetJoin: (state) => {
      state.isJoin = false;
    },
  },
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
      })

      .addCase(GetQuestById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        GetQuestById.fulfilled,
        (state, action: PayloadAction<QuestItems>) => {
          state.loading = false;
          state.questById = action.payload;
        },
      )
      .addCase(GetQuestById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(CreateQuest.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateQuest.fulfilled, (state) => {
        state.loading = false;
        state.isCreate = true;
      })
      .addCase(CreateQuest.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(JoinQuest.pending, (state) => {
        state.loading = true;
      })
      .addCase(JoinQuest.fulfilled, (state) => {
        state.loading = false;
        state.isJoin = true;
      })
      .addCase(JoinQuest.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { SetCreate, SetJoin } = QuestReducers.actions;

export default QuestReducers.reducer;
