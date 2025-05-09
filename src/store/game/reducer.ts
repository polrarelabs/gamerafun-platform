/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createGame,
  getGame as fetchListGame,
  getGameCount,
  getGameOwner,
  upGallery,
} from "./action";

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

export interface AsyncState<T> {
  loading: boolean;
  data: T;
  error: string;
}

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
}

const initialStateGameReducers: PropsGameReducers = {
  valueEditorRating: 0,
  valueUserRating: 0,
  gameId: 0,
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
  reducers: {},
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

export const reducers = {
  game: getGameSlice.reducer,
  gameCount: gameCountSlice.reducer,
  gameOwner: getGameOwnerSlice.reducer,
  gameReducers: GameReducers.reducer,
  createGame: CreateGameReducer.reducer,
  gallery: GalleryReducer.reducer,
};

export const { setValueEditorRating, setValueUserRating, setGameId } =
  GameReducers.actions;
export const { setIsCreateGame } = CreateGameReducer.actions;
