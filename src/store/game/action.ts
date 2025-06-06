import { client, Endpoint } from "@api";
import { Genre, Platform, SupportChain, SupportOs } from "@constant/enum";
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

export interface PropsSocials {
  discord: string;
  telegram_chat: string;
  telegram_news: string;
  linkedin: string;
  medium: string;
  twitter: string;
  tiktok: string;
  youtube: string;
}

export interface PropsSchedule {
  alpha: string;
  beta: string;
  release: string;
}

export interface PropsDownloading {
  windows: string;
  macos: string;
  android: string;
  ios: string;
}

export interface PropsFormik {
  name: string;
  description: string;
  status: number | 1 | 2 | 3;
  website: string;
  downloadLinks: PropsDownloading;
  publisher: string;
  developer: string;
  socials: PropsSocials;
  schedule: PropsSchedule;
  support_os: SupportOs[];
  platform: Platform[];
  genre: Genre[];
  chain: SupportChain[];
  media: string[];
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

export const createGame = createAsyncThunk(
  "game/createGame",
  async (params: PropsFormik) => {
    try {
      const response = await client.post(Endpoint.CREATE_GAME, params);
      if (response?.status === HttpStatusCode.Ok) return response.data;
    } catch (error) {
      throw error;
    }
  },
);
