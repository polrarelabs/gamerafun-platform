/* eslint-disable @typescript-eslint/no-explicit-any */
import { Platform, ScheduleStatus, SortByGame } from "@constant/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateGame,
  // createGame,
  // createGameReview,
  CreateGenres,
  CreateOwnerReview,
  CreateRate,
  DeleteGame,
  // deleteGame,
  DeleteGenres,
  DeleteOwner,
  GetGame,
  GetGameById,
  GetGameCount,
  GetGameIdTypeBlog,
  // getGameID,
  GetGameOwner,
  GetGenres,
  GetGenresById,
  GetOwnerById,
  UpdateGame,
  UpdateGenres,
  UpdateOwnerReview,
} from "./action";
import {
  GameBlogItems,
  GameCountProps,
  GameItems,
  GameProps,
  GenresItems,
} from "./type";

interface PropsGameReducers {
  loading: boolean;
  error: string | null;

  gameOwner: GameProps;
  gameCount: GameCountProps;
  game: GameProps;
  gameById: GameItems;
  ownerById: GameItems;
  genreItems: GenresItems[];
  genreById: GenresItems;
  gameBlog: GameBlogItems;

  pageIndex: number;
  pageSize: number;

  isCreateRate: boolean;
  isDelete: boolean;
  isUpdate: boolean;
  isCreate: boolean;
  status: boolean;
  minRating: number;
  maxRating: number;
  gameId: number;
  isGetGameId: boolean;
  genres: string[];
  platforms: Platform[];
  statusGame: ScheduleStatus[];
  errorsSizeImage: string | null;
  playable: boolean;
  beta: boolean;
  inDevelopment: boolean;
  alpha: boolean;
  discontinued: boolean;
  tba: boolean;
  genresTitle: string;
  sortBy: SortByGame;
  search: string;
  // status: string[],
}

const initialState: PropsGameReducers = {
  loading: false,
  error: null,
  isCreateRate: false,
  isDelete: false,
  isUpdate: false,
  isCreate: false,
  gameOwner: {} as GameProps,
  gameCount: {} as GameCountProps,
  ownerById: {} as GameItems,
  game: {} as GameProps,
  gameById: {} as GameItems,
  genreById: {} as GenresItems,
  gameBlog: {} as GameBlogItems,
  genreItems: [],
  status: false,
  minRating: 0,
  maxRating: 0,
  gameId: 0,
  isGetGameId: false,
  genres: [],
  statusGame: [],
  errorsSizeImage: null,
  platforms: [],
  playable: false,
  beta: false,
  inDevelopment: false,
  alpha: false,
  discontinued: false,
  tba: false,
  genresTitle: "",
  sortBy: SortByGame.Newest,
  search: "",
  pageIndex: 1,
  pageSize: 24,
};

const GameReducers = createSlice({
  name: "game/reducers",
  initialState,
  reducers: {
    SetStatusAPI: (state) => {
      state.error = null;
      state.loading = false;
    },
    SetPageIndex: (state, action: PayloadAction<number>) => {
      state.pageIndex = action.payload;
    },
    SetPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
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
    setGenres: (state, action: PayloadAction<string[]>) => {
      state.genres = action.payload;
    },
    setStatusGame: (state, action: PayloadAction<ScheduleStatus[]>) => {
      state.statusGame = action.payload;
    },
    setPlatforms: (state, action: PayloadAction<Platform[]>) => {
      state.platforms = action.payload;
    },
    setErrorsSizeImage: (state, action: PayloadAction<string | null>) => {
      state.errorsSizeImage = action.payload;
    },
    setPlayable: (state, action: PayloadAction<boolean>) => {
      state.playable = action.payload;
    },
    setBeta: (state, action: PayloadAction<boolean>) => {
      state.beta = action.payload;
    },
    setInDevelopment: (state, action: PayloadAction<boolean>) => {
      state.inDevelopment = action.payload;
    },
    setAlpha: (state, action: PayloadAction<boolean>) => {
      state.alpha = action.payload;
    },
    setDiscontinued: (state, action: PayloadAction<boolean>) => {
      state.discontinued = action.payload;
    },
    setTBA: (state, action: PayloadAction<boolean>) => {
      state.tba = action.payload;
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
    SetSortBy: (state, action: PayloadAction<SortByGame>) => {
      state.sortBy = action.payload;
    },
    SetSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // game
      .addCase(GetGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetGame.fulfilled, (state, action: PayloadAction<GameProps>) => {
        state.loading = false;
        state.game = action.payload;
        state.error = null;
      })
      .addCase(GetGame.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Errors";
      })
      // game by id
      .addCase(GetGameById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetGameById.fulfilled,
        (state, action: PayloadAction<GameItems>) => {
          state.loading = false;
          state.gameById = action.payload;
          state.error = null;
        },
      )
      .addCase(GetGameById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Errors";
      })
      // game owner
      .addCase(GetGameOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetGameOwner.fulfilled,
        (state, action: PayloadAction<GameProps>) => {
          state.loading = false;
          state.gameOwner = action.payload;
          state.error = null;
        },
      )
      .addCase(GetGameOwner.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Errors";
      })
      // game owner by id
      .addCase(GetOwnerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetOwnerById.fulfilled,
        (state, action: PayloadAction<GameItems>) => {
          state.loading = false;
          state.ownerById = action.payload;
          state.error = null;
        },
      )
      .addCase(GetOwnerById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Errors";
      })
      // game count
      .addCase(GetGameCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetGameCount.fulfilled,
        (state, action: PayloadAction<GameCountProps>) => {
          state.loading = false;
          state.gameCount = action.payload;
          state.error = null;
        },
      )
      .addCase(GetGameCount.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Errors";
      })

      // create game
      .addCase(CreateGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateGame.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(CreateGame.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // update game
      .addCase(UpdateGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateGame.fulfilled, (state) => {
        // state.isUpdate = true;
        state.loading = false;
        state.error = "";
      })
      .addCase(UpdateGame.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // delete owner
      .addCase(DeleteOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteOwner.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(DeleteOwner.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // delete game
      .addCase(DeleteGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteGame.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(DeleteGame.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // get genres
      .addCase(GetGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetGenres.fulfilled,
        (state, action: PayloadAction<GenresItems[]>) => {
          state.genreItems = action.payload;
          state.loading = false;
          state.error = "";
        },
      )
      .addCase(GetGenres.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // get genres by id
      .addCase(GetGenresById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetGenresById.fulfilled,
        (state, action: PayloadAction<GenresItems>) => {
          state.genreById = action.payload;
          state.loading = false;
          state.error = "";
        },
      )
      .addCase(GetGenresById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // create genres
      .addCase(CreateGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateGenres.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(CreateGenres.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // update genres
      .addCase(UpdateGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateGenres.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(UpdateGenres.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // delte genres
      .addCase(DeleteGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteGenres.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(DeleteGenres.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // create rate
      .addCase(CreateRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateRate.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(CreateRate.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // create owner review
      .addCase(CreateOwnerReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateOwnerReview.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(
        CreateOwnerReview.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      )
      // update owner review
      .addCase(UpdateOwnerReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateOwnerReview.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(
        UpdateOwnerReview.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      )
      //gameblog
      .addCase(GetGameIdTypeBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetGameIdTypeBlog.fulfilled,
        (state, action: PayloadAction<GameBlogItems>) => {
          state.loading = false;
          state.error = "";
          state.gameBlog = action.payload;
        },
      )
      .addCase(
        GetGameIdTypeBlog.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      );
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
  setPlayable,
  setInDevelopment,
  setAlpha,
  setBeta,
  setGenresTitle,
  SetIsCreateRate,
  SetIsDelete,
  SetIsUpdateGame,
  SetStatus,
  SetIsCreateGame,
  SetSortBy,
  SetSearch,
  SetPageSize,
  SetPageIndex,
  SetStatusAPI,
  setDiscontinued,
  setTBA,
  setStatusGame,
} = GameReducers.actions;
