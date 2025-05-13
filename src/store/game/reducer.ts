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
import { Genre, Platform, SupportChain, SupportOs } from "@constant/enum";

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
  rates: Rate[];
}

export interface AsyncState<T> {
  loading: boolean;
  data: T;
  error: string;
  status?: boolean;
}

const initialStateGetGameID: AsyncState<ListGame> = {
  loading: false,
  data: {} as ListGame,
  error: "",
  status: false,
};

const getGameIdSlice = createSlice({
  name: "game/getByIdReducer",
  initialState: initialStateGetGameID,
  reducers: {
    setStatus: (state) => {
      state.status = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGameID.pending, (state) => {
        state.loading = true;
        state.status = false;
      })
      .addCase(
        getGameID.fulfilled,
        (state, action: PayloadAction<ListGame>) => {
          state.loading = false;
          state.data = action.payload;
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

const initialStateGame: AsyncState<ListGame[]> = {
  loading: false,
  data: [],
  error: "",
};

const getGameSlice = createSlice({
  name: "game/list",
  initialState: initialStateGame,
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
        state.error = action.payload?.message || "Errors";
      });
  },
});

export interface GameCount {
  platform: PlatformProps;
  genre: GenreProps;
  support_os: SupportOsProps;
  schedule_status: ScheduleStatusProps;
}

const initialStateCount: AsyncState<GameCount> = {
  loading: false,
  data: {} as GameCount,
  error: "",
};

const gameCountSlice = createSlice({
  name: "game/count",
  initialState: initialStateCount,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGameCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getGameCount.fulfilled,
        (state, action: PayloadAction<GameCount>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(getGameCount.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Errors";
      });
  },
});

const initialStateOwner: AsyncState<ListGame[]> = {
  loading: false,
  data: [],
  error: "",
};

const getGameOwnerSlice = createSlice({
  name: "game/owner",
  initialState: initialStateOwner,
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
        state.error = action.payload?.message || "Errors";
      });
  },
});

interface PropsCreateGame {
  isCreate: boolean;
  loadingCreate: boolean;
  errorCreate: string;
}

const initialStateCreateGame: PropsCreateGame = {
  isCreate: false,
  loadingCreate: false,
  errorCreate: "",
};

const CreateGameReducer = createSlice({
  name: "game/createGameReducers",
  initialState: initialStateCreateGame,
  reducers: {
    setIsCreateGame: (state) => {
      state.isCreate = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGame.pending, (state) => {
        state.loadingCreate = true;
      })
      .addCase(createGame.fulfilled, (state) => {
        state.isCreate = true;
        state.loadingCreate = false;
      })
      .addCase(createGame.rejected, (state, action: PayloadAction<any>) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload as string;
      });
  },
});

interface PropsUpdateGame {
  isUpdate: boolean;
  loadingUpdate: boolean;
  errorUpdate: string;
}

const initialStateUpdateGame: PropsUpdateGame = {
  isUpdate: false,
  loadingUpdate: false,
  errorUpdate: "",
};

const UpdateGameReducer = createSlice({
  name: "game/updateGameReducers",
  initialState: initialStateUpdateGame,
  reducers: {
    setIsUpdateGame: (state) => {
      state.isUpdate = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateGame.pending, (state) => {
        state.loadingUpdate = true;
      })
      .addCase(updateGame.fulfilled, (state) => {
        state.isUpdate = true;
        state.loadingUpdate = false;
      })
      .addCase(updateGame.rejected, (state, action: PayloadAction<any>) => {
        state.loadingUpdate = false;
        state.errorUpdate = action.payload as string;
      });
  },
});

export interface PropsDeleteReducer {
  isDelete: boolean;
  loadingDelete: boolean;
  errorDelete: string;
}

const initialStateDelete: PropsDeleteReducer = {
  isDelete: false,
  loadingDelete: false,
  errorDelete: "",
};

const DeleteGameReducer = createSlice({
  name: "game/delete",
  initialState: initialStateDelete,
  reducers: {
    setIsDelete: (state) => {
      state.isDelete = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteGame.pending, (state) => {
        state.loadingDelete = true;
        state.isDelete = false;
      })
      .addCase(deleteGame.fulfilled, (state) => {
        state.isDelete = true;
        state.loadingDelete = false;
      })
      .addCase(deleteGame.rejected, (state, action: PayloadAction<any>) => {
        state.isDelete = false;
        state.errorDelete = action.payload as string;
      });
  },
});
export interface PropsCreateGameReview {
  isCreate: boolean;
  loadingCreate: boolean;
  errorCreate: string;
}
const initialStateCreateGameReview: PropsCreateGameReview = {
  isCreate: false,
  loadingCreate: false,
  errorCreate: "",
};

const CreateGameReviewReducer = createSlice({
  name: "game/createGameReview",
  initialState: initialStateCreateGameReview,
  reducers: {
    setIsCreateGameReview: (state) => {
      state.isCreate = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGameReview.pending, (state) => {
        state.loadingCreate = true;
      })
      .addCase(createGameReview.fulfilled, (state) => {
        state.isCreate = true;
        state.loadingCreate = false;
      })
      .addCase(
        createGameReview.rejected,
        (state, action: PayloadAction<any>) => {
          state.loadingCreate = false;
          state.errorCreate = action.payload as string;
        },
      );
interface PropsGameReducers {
  valueEditorRating: number;
  valueUserRating: number;
  gameId: number;
  isGetGameId: boolean;
  genres: string[];
  platforms: string[];
  errorsSizeImage: string | null;
  playNow: boolean;
  freeToPlay: boolean;
  awardWinners: boolean;
  favorites: boolean;
  genresTitle: string;
  // status: string[],
}

const initialStateGameReducers: PropsGameReducers = {
  valueEditorRating: 0,
  valueUserRating: 0,
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
  // status: [],
};

const GameReducers = createSlice({
  name: "game/reducers",
  initialState: initialStateGameReducers,
  reducers: {
    setValueEditorRating: (state, action: PayloadAction<number>) => {
      state.valueEditorRating = action.payload;
    },
    setValueUserRating: (state, action: PayloadAction<number>) => {
      state.valueUserRating = action.payload;
    },
    setGameId: (state, action: PayloadAction<number>) => {
      state.gameId = action.payload;
    },
    setStatusGetGameID: (state, action: PayloadAction<boolean>) => {
      state.isGetGameId = action.payload;
    },
    setGenres: (state, action: PayloadAction<string[]>) => {
      state.genres = action.payload;
    },
    setPlatforms: (state, action: PayloadAction<string[]>) => {
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
    // setStatus: (state, action: PayloadAction<string[]>) => {
    //   state.status = action.payload;
    // },
  },
});

export const reducers = {
  game: getGameSlice.reducer,
  gameCount: gameCountSlice.reducer,
  gameOwner: getGameOwnerSlice.reducer,
  gameReducers: GameReducers.reducer,
  createGame: CreateGameReducer.reducer,
  updateGame: UpdateGameReducer.reducer,
  getGameId: getGameIdSlice.reducer,
  deleteGame: DeleteGameReducer.reducer,
  createGameReview: CreateGameReviewReducer.reducer,
};

export const {
  setValueEditorRating,
  setValueUserRating,
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
  // setStatus
} = GameReducers.actions;
export const { setIsCreateGame } = CreateGameReducer.actions;
export const { setIsUpdateGame } = UpdateGameReducer.actions;
export const { setStatus } = getGameIdSlice.actions;

export const { setIsDelete } = DeleteGameReducer.actions;

export const { setIsCreateGameReview } = CreateGameReviewReducer.actions;
