import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  CreateGame,
  // createGame,
  // createGameReview,
  CreateGenres,
  CreateRate,
  DeleteGame,
  DeleteGenres,
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
} from "./action";
import {
  setInDevelopment,
  setErrorsSizeImage,
  setAlpha,
  setBeta,
  setGameId,
  setGenres,
  setGenresTitle,
  SetIsCreateGame,
  SetIsCreateRate,
  SetIsDelete,
  SetIsUpdateGame,
  setPlatforms,
  setPlayable,
  SetStatus,
  setStatusGetGameID,
  SetMaxRating,
  SetMinRating,
  SetSortBy,
  SetSearch,
  SetPageIndex,
  SetPageSize,
  SetStatusAPI,
  setTBA,
  setDiscontinued,
  setStatusGame,
} from "./reducer";
import { Platform, ScheduleStatus, SortByGame } from "@constant/enum";
import {
  FormCreateGameProps,
  GameBlogProps,
  GameDProps,
  GenresCProps,
  GenresProps,
  ParamsGameProps,
  RateProps,
} from "./type";
import { DeleteOwner } from "./action";

export const useGame = () => {
  const dispatch = useAppDispatch();

  const {
    error,
    loading,
    gameCount,
    gameOwner,
    ownerById,
    game,
    gameById,
    genreItems,
    genreById,
    pageIndex,
    pageSize,
    gameBlog,
    tba,
    discontinued,
    statusGame,
    isCreate,
    isCreateRate,
    isDelete,
    isUpdate,
    status,
    minRating,
    maxRating,
    gameId,
    isGetGameId,
    genres,
    errorsSizeImage,
    platforms,
    playable,
    beta,
    inDevelopment,
    alpha,
    genresTitle,
    sortBy,
    search,
  } = useAppSelector((state) => state.game);

  const setStatusAPI = () => {
    dispatch(SetStatusAPI());
  };

  const getGame = (param: ParamsGameProps) => {
    dispatch(GetGame(param));
  };
  const getGameOwner = (param: ParamsGameProps) => {
    dispatch(GetGameOwner(param));
  };
  const getOwnerById = (gameId: number) => {
    dispatch(GetOwnerById(gameId));
  };
  const getGameById = (gameId: number) => {
    dispatch(GetGameById(gameId));
  };
  const createGame = (body: FormCreateGameProps) => {
    dispatch(CreateGame(body));
  };
  const updateGame = (body: FormCreateGameProps) => {
    dispatch(UpdateGame(body));
  };
  const deleteOwner = (body: GameDProps) => {
    dispatch(DeleteOwner(body));
  };
  const deleteGame = (body: GameDProps) => {
    dispatch(DeleteGame(body));
  };
  const createGenres = (body: GenresCProps) => {
    dispatch(CreateGenres(body));
  };
  const updateGenres = (body: GenresCProps) => {
    dispatch(UpdateGenres(body));
  };
  const deleteGenres = (body: number) => {
    dispatch(DeleteGenres(body));
  };
  const createRate = (body: RateProps) => {
    dispatch(CreateRate(body));
  };
  const getGenres = (param: GenresProps) => {
    dispatch(GetGenres(param));
  };
  const getGenresById = (genreId: number) => {
    dispatch(GetGenresById(genreId));
  };
  const setPageIndex = (value: number) => {
    dispatch(SetPageIndex(value));
  };
  const setPageSize = (value: number) => {
    dispatch(SetPageSize(value));
  };

  const getGameCount = () => {
    dispatch(GetGameCount());
  };

  const setMinRating = (value: number) => {
    dispatch(SetMinRating(value));
  };

  const setMaxRating = (value: number) => {
    dispatch(SetMaxRating(value));
  };

  const setGameID = (value: number) => {
    dispatch(setGameId(value));
  };

  const setGetGameId = (value: boolean) => {
    dispatch(setStatusGetGameID(value));
  };

  const SetGenres = (value: string[]) => {
    dispatch(setGenres(value));
  };

  const SetStatusGame = (value: ScheduleStatus[]) => {
    dispatch(setStatusGame(value));
  };

  const SetErrorsSizeImage = (value: string | null) => {
    dispatch(setErrorsSizeImage(value));
  };
  const SetPlatforms = (value: Platform[]) => {
    dispatch(setPlatforms(value));
  };

  const SetPlayable = (value: boolean) => {
    dispatch(setPlayable(value));
  };
  const SetBeta = (value: boolean) => {
    dispatch(setBeta(value));
  };
  const SetInDevelopment = (value: boolean) => {
    dispatch(setInDevelopment(value));
  };
  const SetAlpha = (value: boolean) => {
    dispatch(setAlpha(value));
  };

  const SetDiscontinued = (value: boolean) => {
    dispatch(setDiscontinued(value));
  };

  const SetTBA = (value: boolean) => {
    dispatch(setTBA(value));
  };

  const SetGenresTitle = (value: string) => {
    dispatch(setGenresTitle(value));
  };

  const setIsCreateRate = (value: boolean) => {
    dispatch(SetIsCreateRate(value));
  };

  const setIsCreate = () => {
    dispatch(SetIsCreateGame());
  };

  const setIsUpdate = () => {
    dispatch(SetIsUpdateGame());
  };

  const setStatusGet = () => {
    dispatch(SetStatus());
  };

  const setIsDeletes = () => {
    dispatch(SetIsDelete());
  };

  const setSortBy = (value: SortByGame) => {
    dispatch(SetSortBy(value));
  };

  const setSearch = (value: string) => {
    dispatch(SetSearch(value));
  };

  const getGameBlog = (params: GameBlogProps) => {
    dispatch(GetGameIdTypeBlog(params));
  };

  return {
    getGameBlog,
    gameBlog,
    getGameById,
    getOwnerById,
    getGame,
    ownerById,
    gameById,
    updateGame,
    deleteOwner,
    deleteGame,
    createGenres,
    updateGenres,
    deleteGenres,
    createRate,
    genreItems,
    getGenres,
    genreById,
    getGenresById,
    setPageIndex,
    setPageSize,
    pageIndex,
    pageSize,
    getGameCount,
    createGame,
    setStatusAPI,
    tba,
    discontinued,
    SetDiscontinued,
    SetTBA,
    setStatusGame,

    setSearch,
    search,
    sortBy,
    setSortBy,
    setIsDeletes,
    setStatusGet,
    setIsUpdate,
    setIsCreate,
    getGameOwner,
    setIsCreateRate,
    error,
    loading,
    isCreate,
    isCreateRate,
    isDelete,
    isUpdate,
    gameCount,
    gameOwner,
    game,
    status,
    minRating,
    maxRating,
    gameId,
    isGetGameId,
    genres,
    errorsSizeImage,
    platforms,
    playable,
    beta,
    inDevelopment,
    alpha,
    genresTitle,
    setMinRating,
    setMaxRating,
    setGameID,
    setGetGameId,
    SetGenres,
    SetErrorsSizeImage,
    SetPlatforms,
    SetInDevelopment,
    SetAlpha,
    SetBeta,
    SetPlayable,
    SetGenresTitle,
    SetStatusGame,
    statusGame,
  };
};
