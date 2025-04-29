/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getGameOwner } from "./action";

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

export interface DataStateOwner {
  loading: boolean;
  data: ListGame[];
  error: string;
}

const initialState: DataStateOwner = {
  loading: false,
  data: [],
  error: "",
};

const getGameOwnerSlice = createSlice({
  name: "game/getOwnerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGameOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getGameOwner.fulfilled,
        (state, action: PayloadAction<ListGame[]>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(getGameOwner.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred";
      });
  },
});

export default getGameOwnerSlice.reducer;
