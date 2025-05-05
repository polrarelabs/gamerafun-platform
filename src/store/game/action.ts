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
  genre?: Genre[];
  platform?: Platform[];
}

export const getGame = createAsyncThunk(
  "game/getList",
  async (params: ParamsProp = {}) => {
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

export const getGameCount = createAsyncThunk("game/getCount", async () => {
  try {
    const response = await client.get(Endpoint.GET_GAME_COUNT);
    if (response.status === HttpStatusCode.Ok) return response.data;
  } catch (error) {
    throw error;
  }
});

export const getGameOwner = createAsyncThunk(
  "game/getOwner",
  async (params: ParamsProp = {}) => {
    try {
      const respon = await client.get(Endpoint.GET_GAME_OWNER, params);
      if (respon?.status === HttpStatusCode.Ok) return respon.data;
    } catch (error) {
      throw error;
    }
  },
);
