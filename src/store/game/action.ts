import { client, Endpoint } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FormCreateGameProps,
  GameDProps,
  GenresCProps,
  GenresProps,
  OwnerReviewProps,
  ParamsGameProps,
  RateProps,
} from "./type";

// game count dang loi api

export const GetGame = createAsyncThunk(
  "get/game",
  async (params: ParamsGameProps) => {
    try {
      const response = await client.get(Endpoint.GET_GAME, params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const GetGameById = createAsyncThunk(
  "get/game/id",
  async (params: number) => {
    try {
      const respon = await client.get(`${Endpoint.GET_GAME}/${params}`);
      return respon.data;
    } catch (error) {
      throw error;
    }
  },
);

export const GetGameOwner = createAsyncThunk(
  "get/owner",
  async (params: ParamsGameProps) => {
    try {
      const respon = await client.get(Endpoint.GET_GAME_OWNER, params);
      return respon.data;
    } catch (error) {
      throw error;
    }
  },
);

export const GetOwnerById = createAsyncThunk(
  "get/owner/id",
  async (params: number) => {
    try {
      const respon = await client.get(`${Endpoint.GET_GAME_OWNER}/${params}`);
      return respon.data;
    } catch (error) {
      throw error;
    }
  },
);

export const CreateGame = createAsyncThunk(
  "post/create",
  async (body: FormCreateGameProps) => {
    try {
      const response = await client.post(Endpoint.CREATE_GAME, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const UpdateGame = createAsyncThunk(
  "put/update/game",
  async (body: FormCreateGameProps) => {
    try {
      const response = await client.put(Endpoint.UPDATE_GAME, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
export const DeleteOwner = createAsyncThunk(
  "delete/owner",
  async (params: GameDProps) => {
    try {
      const response = await client.delete(Endpoint.DELETE_OWNER, params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
export const DeleteGame = createAsyncThunk(
  "delete/game",
  async (params: GameDProps) => {
    try {
      const response = await client.delete(Endpoint.DELETE_GAME, params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const GetGenres = createAsyncThunk(
  "get/genres",
  async (body: GenresProps = {}) => {
    try {
      const response = await client.get(Endpoint.GET_GENRES, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const GetGenresById = createAsyncThunk(
  "get/genres/id",
  async (genreId: number) => {
    try {
      const response = await client.get(`${Endpoint.GET_GENRES}/${genreId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const CreateGenres = createAsyncThunk(
  "post/genres",
  async (body: GenresCProps) => {
    try {
      const response = await client.post(Endpoint.CREATE_GENRES, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
export const UpdateGenres = createAsyncThunk(
  "put/update/genres",
  async (body: GenresCProps) => {
    try {
      const response = await client.put(Endpoint.UPDATE_GENRES, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const DeleteGenres = createAsyncThunk(
  "delete/genres",
  async (params: number) => {
    try {
      const response = await client.delete(
        `${Endpoint.DELETE_GENRES}/${params}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const CreateRate = createAsyncThunk(
  "post/rate",
  async (body: RateProps) => {
    try {
      const response = await client.post(Endpoint.CREATE_RATE, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const CreateOwnerReview = createAsyncThunk(
  "post/owner/review",
  async (body: OwnerReviewProps) => {
    try {
      const response = await client.post(Endpoint.OWNER_REVIEW, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const UpdateOwnerReview = createAsyncThunk(
  "put/owner/review",
  async (body: OwnerReviewProps) => {
    try {
      const response = await client.put(Endpoint.OWNER_REVIEW, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
export const GetGameCount = createAsyncThunk("get/count", async () => {
  try {
    const response = await client.get(Endpoint.GET_GAME_COUNT);
    // if (response.status === HttpStatusCode.Ok)
    return response.data;
  } catch (error) {
    throw error;
  }
});
