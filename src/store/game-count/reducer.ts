import { Duration_Status, Genre, Platform, Support_OS } from "@constant/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGameCount } from "./action";

export interface GameCount {
  platform: Platform;
  genre: Genre;
  support_os: Support_OS;
  duration_status: Duration_Status;
}

export interface PropGameCount {
  data: GameCount;
  loading: boolean;
  error: string;
}

const initialState: PropGameCount = {
  data: {} as GameCount,
  loading: false,
  error: "",
};

const GameCountReducer = createSlice({
  name: "game/getCount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGameCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getGameCount.fulfilled,
        (state, action: PayloadAction<GameCount>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(getGameCount.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default GameCountReducer.reducer;
