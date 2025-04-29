/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGame as fetchListGame } from "./action";

interface ScheduleProps {
  beta: string;
  alpha: string;
  release: string;
}

export interface ListGame {
  id: number;
  name: string;
  description: string;
  status: number;
  downloadLink: string;
  publisher: string;
  developer: string;
  website: string;
  socials: any | null;
  schedule: ScheduleProps;
  support_os: string[];
  platform: string[];
  genre: string[];
  chain: string[];
  rating: number;
  media: string[];
}

export interface DataState {
  loading: boolean;
  data: ListGame[];
  error: string;
}

const initialState: DataState = {
  loading: false,
  data: [],
  error: "",
};

const getGameSlice = createSlice({
  name: "get_game_reducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchListGame.fulfilled,
        (state, action: PayloadAction<ListGame[]>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchListGame.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred";
      });
  },
});

export default getGameSlice.reducer;
