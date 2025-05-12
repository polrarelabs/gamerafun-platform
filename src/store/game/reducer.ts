/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createGame,
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
  upGallery,
} from "./action";
import { Genre, Platform, SupportChain, SupportOs } from "@constant/enum";

export interface ScheduleProps {
  beta: string;
  alpha: string;
  release: string;
}
interface SupportOsProps {
  WINDOWS: number;
  MAC: number;
  WEB: number;
  ANDROID: number;
  IOS: number;
}

interface FlatformProps {
  EPIC: number;
  STEAM: number;
}

interface ScheduleStatusProps {
  PLAYABLE: number;
  BETA: number;
  ALPHA: number;
  INDEVELOPMENT: number;
}

interface GenreProps {
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
  platform: FlatformProps;
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

interface PropsGameReducers {
  valueEditorRating: number;
  valueUserRating: number;
  gameId: number;
  isGetGameId: boolean;
}

const initialStateGameReducers: PropsGameReducers = {
  valueEditorRating: 0,
  valueUserRating: 0,
  gameId: 0,
  isGetGameId: false,
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

export interface PropsGalleryReducer {
  id: string;
  name: string;
  description: string;
  fileName: string;
  url: string;
  cdn: string;
  md5: string;
  dimension: string;
  ratio: number;
  mimetype: string;
  createdBy: string;
  createdAt: string;
}

interface PropsStateGalley {
  dataGallery: PropsGalleryReducer;
  loadingGallery: boolean;
  errorGallery: string;
}

const initialStateGallery: PropsStateGalley = {
  dataGallery: {} as PropsGalleryReducer,
  loadingGallery: false,
  errorGallery: "",
};

const GalleryReducer = createSlice({
  name: "gallery",
  initialState: initialStateGallery,
  reducers: {
    setDataGallery: (state) => {
      state.dataGallery = {} as PropsGalleryReducer;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(upGallery.pending, (state) => {
        state.loadingGallery = false;
      })
      .addCase(
        upGallery.fulfilled,
        (state, action: PayloadAction<PropsGalleryReducer>) => {
          state.dataGallery = action.payload;
          state.loadingGallery = false;
        },
      )
      .addCase(upGallery.rejected, (state, action: PayloadAction<any>) => {
        state.errorGallery = action.payload as string;
        state.loadingGallery = false;
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

export const reducers = {
  game: getGameSlice.reducer,
  gameCount: gameCountSlice.reducer,
  gameOwner: getGameOwnerSlice.reducer,
  gameReducers: GameReducers.reducer,
  createGame: CreateGameReducer.reducer,
  gallery: GalleryReducer.reducer,
  updateGame: UpdateGameReducer.reducer,
  getGameId: getGameIdSlice.reducer,
  deleteGame: DeleteGameReducer.reducer,
};

export const {
  setValueEditorRating,
  setValueUserRating,
  setGameId,
  setStatusGetGameID,
} = GameReducers.actions;
export const { setIsCreateGame } = CreateGameReducer.actions;
export const { setIsUpdateGame } = UpdateGameReducer.actions;
export const { setStatus } = getGameIdSlice.actions;

export const { setDataGallery } = GalleryReducer.actions;

export const { setIsDelete } = DeleteGameReducer.actions;
