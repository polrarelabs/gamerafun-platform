/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGame as fetchListGame, getGameCount, getGameOwner } from "./action";
import { Genre, Platform, ScheduleStatus, SupportOs } from "@constant/enum";

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
}

const initialStateGameReducers: PropsGameReducers = {
  valueEditorRating: 0,
  valueUserRating: 0,
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
  },
});

export const reducers = {
  game: getGameSlice.reducer,
  gameCount: gameCountSlice.reducer,
  gameOwner: getGameOwnerSlice.reducer,
  gameReducers: GameReducers.reducer,
};

export const { setValueEditorRating, setValueUserRating } =
  GameReducers.actions;
