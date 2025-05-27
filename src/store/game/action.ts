import { client, Endpoint } from "@api";
import {
  Genre,
  MediaPosition,
  Platform,
  ScheduleStatus,
  SupportChain,
  SupportOs,
} from "@constant/enum";
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
// import { HttpStatusCode } from "axios";
// import qs from 'qs'

export interface ParamsProp {
  // pageIndex: number;
  // pageSize: number;
  search?: string;
  sortBy?: string;
  addedDateSort?: string;
  minRating?: number;
  maxRating?: number;
  genre?: Genre[];
  platform?: Platform[];
  statusGame?: ScheduleStatus[];
  playableOnDesktop?: boolean;
  skip?: number;
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

// export const createGame = createAsyncThunk(
//   "post/create",
//   async (params: PropsFormik) => {
//     try {
//       const response = await client.post(Endpoint.CREATE_GAME, params);
//       // if (response?.status === HttpStatusCode.Ok)
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },
// );

// export const updateGame = createAsyncThunk(
//   "put/update",
//   async (body: PropsFormik) => {
//     try {
//       const response = await client.put(Endpoint.UPDATE_GAME, body);
//       // if (response.status === HttpStatusCode.Ok)
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },
// );

// export const getGameID = createAsyncThunk(
//   "get/gameId",
//   async (gameId: number) => {
//     try {
//       const response = await client.get(`${Endpoint.GET_GAME}/${gameId}`);
//       // if (response.status === HttpStatusCode.Ok)
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },
// );

// export interface PropsDelete {
//   gameId: number;
// }

// export const deleteGame = createAsyncThunk(
//   "delete/game",
//   async (body: PropsDelete) => {
//     try {
//       const response = await client.delete(Endpoint.DELETE_GAME, body);
//       // if (response.status === HttpStatusCode.Ok)
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },
// );

// export const createGameReview = createAsyncThunk(
//   "game/review",
//   async (body: PropsGameReview) => {
//     try {
//       const response = await client.post(Endpoint.CREATE_GAME_REVIEW, body);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },
// );

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
