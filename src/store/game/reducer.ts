/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createGame,
  createGameReview,
  deleteGame,
  getGame as fetchListGame,
  getGameCount,
  getGameID,
  getGameOwner,
  PropsDownloading,
  PropsMedia,
  PropsSchedule,
  PropsSocials,
  updateGame,
} from "./action";
import {
  Genre,
  Platform,
  SortBy,
  SupportChain,
  SupportOs,
} from "@constant/enum";

export interface ScheduleProps {
  beta: string;
  alpha: string;
  release: string;
}
export interface SupportOsProps {
  WINDOWS: number;
  MAC: number;
  WEB: number;
  ANDROID: number;
  IOS: number;
}

export interface PlatformProps {
  EPIC: number;
  STEAM: number;
}

export interface ScheduleStatusProps {
  PLAYABLE: number;
  BETA: number;
  ALPHA: number;
  INDEVELOPMENT: number;
}

export interface GenreProps {
  ACTION: number;
  ADVENTURE: number;
  RPG: number;
  STRATEGY: number;
  PUZZLE: number;
  CASUAL: number;
  MULTIPLAYER: number;
  SPORTS: number;
  SHOOTER: number;
  RACING: number;
  FIGHTING: number;
  MMORPG: number;
  METAVERSE: number;
  FREETOPLAY: number;
  ONCHAIN: number;
  CARD: number;
  BATTLEROYALE: number;
  AUTOBATTLER: number;
}

interface Rate {
  gameId: number;
  score: number;
  review: string;
}

export interface ListGame {
  id: number;
  name: string;
  description: string;
  status: number;
  downloadLink: PropsDownloading;
  publisher: string;
  developer: string;
  website: string;
  socials: PropsSocials;
  schedule: PropsSchedule;
  support_os: SupportOs[];
  platform: Platform[];
  genre: Genre[];
  chain: SupportChain[];
  media: PropsMedia[];
  rating: number;
  rates?: Rate[];
}

export interface GameCount {
  platform: PlatformProps;
  genre: GenreProps;
  support_os: SupportOsProps;
  schedule_status: ScheduleStatusProps;
}

// interface PropsGame {
//   items:
// }
interface PropsGameReducers {
  loading: boolean;
  error: string;
  isCreateRate: boolean;
  isDelete: boolean;
  isUpdate: boolean;
  isCreate: boolean;
  dataGameOwner: ListGame[];
  dataGameCount: GameCount;
  dataListGame: ListGame[];
  status: boolean;
  dataGetGameId: ListGame;
  minRating: number;
  maxRating: number;
  gameId: number;
  isGetGameId: boolean;
  genres: Genre[];
  platforms: Platform[];
  errorsSizeImage: string | null;
  playNow: boolean;
  freeToPlay: boolean;
  awardWinners: boolean;
  favorites: boolean;
  genresTitle: string;
  sortBy: SortBy;
  search: string;
  // status: string[],
}

const initialState: PropsGameReducers = {
  loading: false,
  error: "",
  isCreateRate: false,
  isDelete: false,
  isUpdate: false,
  isCreate: false,
  dataGameOwner: [],
  dataGameCount: {} as GameCount,
  dataListGame: [],
  dataGetGameId: {} as ListGame,
  status: false,
  minRating: 0,
  maxRating: 0,
  gameId: 0,
  isGetGameId: false,
  genres: [],
  errorsSizeImage: null,
  platforms: [],
  playNow: false,
  freeToPlay: false,
  awardWinners: false,
  favorites: false,
  genresTitle: "",
  sortBy: SortBy.Newest,
  search: "",
};

const GameReducers = createSlice({
  name: "game/reducers",
  initialState,
  reducers: {
    SetMinRating: (state, action: PayloadAction<number>) => {
      state.minRating = action.payload;
    },
    SetMaxRating: (state, action: PayloadAction<number>) => {
      state.maxRating = action.payload;
    },
    setGameId: (state, action: PayloadAction<number>) => {
      state.gameId = action.payload;
    },
    setStatusGetGameID: (state, action: PayloadAction<boolean>) => {
      state.isGetGameId = action.payload;
    },
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
    },
    setPlatforms: (state, action: PayloadAction<Platform[]>) => {
      state.platforms = action.payload;
    },
    setErrorsSizeImage: (state, action: PayloadAction<string | null>) => {
      state.errorsSizeImage = action.payload;
    },
    setPlayNow: (state, action: PayloadAction<boolean>) => {
      state.playNow = action.payload;
    },
    setFreeToPlay: (state, action: PayloadAction<boolean>) => {
      state.freeToPlay = action.payload;
    },
    setAwardWinners: (state, action: PayloadAction<boolean>) => {
      state.awardWinners = action.payload;
    },
    setFavorites: (state, action: PayloadAction<boolean>) => {
      state.favorites = action.payload;
    },
    setGenresTitle: (state, action: PayloadAction<string>) => {
      state.genresTitle = action.payload;
    },
    SetIsDelete: (state) => {
      state.isDelete = false;
    },
    SetIsCreateRate: (state, action: PayloadAction<boolean>) => {
      state.isCreateRate = action.payload;
    },
    SetIsUpdateGame: (state) => {
      state.isUpdate = false;
    },
    SetIsCreateGame: (state) => {
      state.isCreate = false;
    },
    SetStatus: (state) => {
      state.status = false;
    },
    SetSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    SetSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGameReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGameReview.fulfilled, (state) => {
        state.isCreateRate = true;
        state.loading = false;
      })
      .addCase(
        createGameReview.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      )
      .addCase(deleteGame.pending, (state) => {
        state.loading = true;
        state.isDelete = false;
      })
      .addCase(deleteGame.fulfilled, (state) => {
        state.isDelete = true;
        state.loading = false;
      })
      .addCase(deleteGame.rejected, (state, action: PayloadAction<any>) => {
        state.isDelete = false;
        state.error = action.payload as string;
      })
      .addCase(updateGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateGame.fulfilled, (state) => {
        state.isUpdate = true;
        state.loading = false;
      })
      .addCase(updateGame.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGame.fulfilled, (state) => {
        state.isCreate = true;
        state.loading = false;
      })
      .addCase(createGame.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getGameOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getGameOwner.fulfilled,
        (state, action: PayloadAction<ListGame[]>) => {
          state.loading = false;
          state.dataGameOwner = action.payload;
        },
      )
      .addCase(getGameOwner.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Errors";
      })
      .addCase(getGameCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getGameCount.fulfilled,
        (state, action: PayloadAction<GameCount>) => {
          state.loading = false;
          state.dataGameCount = action.payload;
        },
      )
      .addCase(getGameCount.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Errors";
      })
      .addCase(fetchListGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchListGame.fulfilled,
        (state, action: PayloadAction<ListGame[]>) => {
          state.loading = false;
          state.dataListGame = action.payload;
        },
      )
      .addCase(fetchListGame.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Errors";
      })
      .addCase(getGameID.pending, (state) => {
        state.loading = true;
        state.status = false;
      })
      .addCase(
        getGameID.fulfilled,
        (state, action: PayloadAction<ListGame>) => {
          state.loading = false;
          state.dataGetGameId = action.payload;
          state.status = true;
        },
      )
      .addCase(getGameID.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Errors";
        state.status = false;
      });
  },
});
export default GameReducers.reducer;

export const {
  SetMinRating,
  SetMaxRating,
  setGameId,
  setStatusGetGameID,
  setGenres,
  setPlatforms,
  setErrorsSizeImage,
  setPlayNow,
  setAwardWinners,
  setFavorites,
  setFreeToPlay,
  setGenresTitle,
  SetIsCreateRate,
  SetIsDelete,
  SetIsUpdateGame,
  SetStatus,
  SetIsCreateGame,
  SetSortBy,
  SetSearch,
} = GameReducers.actions;
