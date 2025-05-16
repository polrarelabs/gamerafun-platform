import { client, Endpoint } from "@api";
import {
  Genre,
  MediaPosition,
  Platform,
  SupportChain,
  SupportOs,
} from "@constant/enum";
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

export interface PropsMedia {
  url: string;
  type: string;
  position: MediaPosition;
}

export interface PropsFormik {
  gameId?: number;
  name: string;
  description: string;
  status: number;
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
  media: PropsMedia[];
  content?: string;
}

export interface PropsGameReview {
  gameId: number;
  scroce: number;
  review: string;
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
  "game/create",
  async (params: PropsFormik) => {
    try {
      const response = await client.post(Endpoint.CREATE_GAME, params);
      if (response?.status === HttpStatusCode.Ok) return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const updateGame = createAsyncThunk(
  "game/update",
  async (body: PropsFormik) => {
    try {
      const response = await client.put(Endpoint.UPDATE_GAME, body);
      if (response.status === HttpStatusCode.Ok) return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getGameID = createAsyncThunk(
  "game/getById",
  async (gameId: number) => {
    try {
      const response = await client.get(`${Endpoint.GET_GAME}/${gameId}`);
      if (response.status === HttpStatusCode.Ok) return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export interface PropsDelete {
  gameId: number;
}

export const deleteGame = createAsyncThunk(
  "game/delete",
  async (body: PropsDelete) => {
    try {
      const response = await client.delete(Endpoint.DELETE_GAME, body);
      if (response.status === HttpStatusCode.Ok) return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const createGameReview = createAsyncThunk(
  "game/review",
  async (body: PropsGameReview) => {
    try {
      const response = await client.post(Endpoint.CREATE_GAME_REVIEW, body);
      if (response.status === HttpStatusCode.Ok) return response.data;
    } catch (error) {
      throw error;
    }
  },
);

// export interface PropsGallery {
//   file: File,
//   name: string,
//   description: string
// }

// export const upGallery = createAsyncThunk(
//   "upload/gallery", async (body: PropsGallery) => {
//     try {
//       const response = await client.post(Endpoint.GALLERY, {
//         body: body,
//         'Content-Type': 'multipart/form-data'
//       })
//       if (response.status === HttpStatusCode.Ok) {
//         console.log('upload gallery', response.data);
//         return response.data
//       }
//     } catch (error) {
//       throw error
//     }
//   }
// )
