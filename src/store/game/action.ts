import { client, Endpoint } from "@api";
import { Genre, Platform } from "@constant/enum";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";

export interface ParamsProp {
  search?: string;
  sortBy?: string;
  addedDateSort?: string;
  minRating?: number;
  maxRating?: number;
  genre?: Genre;
  platform?: Platform;
}

export const getGame = createAsyncThunk(
  "game/getList",
  async (params: ParamsProp) => {
    try {
      const response = await client.get(Endpoint.GET_GAME, params);
      if (response?.status === HttpStatusCode.Ok) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);
