import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  createGame,
  createGameReview,
  deleteGame,
  getGame,
  getGameCount,
  getGameID,
  getGameOwner,
  ParamsProp,
  PropsDelete,
  PropsFormik,
  PropsGameReview,
  updateGame,
} from "./action";
import {
  setAwardWinners,
  setErrorsSizeImage,
  setFavorites,
  setFreeToPlay,
  setGameId,
  setGenres,
  setGenresTitle,
  SetIsCreateGame,
  SetIsCreateRate,
  SetIsDelete,
  SetIsUpdateGame,
  setPlatforms,
  setPlayNow,
  SetStatus,
  setStatusGetGameID,
  setValueEditorRating,
  setValueUserRating,
} from "./reducer";

export const useGame = () => {
  const dispatch = useAppDispatch();

  const {
    error,
    loading,
    isCreate,
    isCreateRate,
    isDelete,
    isUpdate,
    dataGameCount,
    dataGameOwner,
    dataGetGameId,
    dataListGame,
    status,
    valueEditorRating,
    valueUserRating,
    gameId,
    isGetGameId,
    genres,
    errorsSizeImage,
    platforms,
    playNow,
    freeToPlay,
    awardWinners,
    favorites,
    genresTitle,
  } = useAppSelector((state) => state.game);

  const fetchGetGame = (param: ParamsProp = {}) => {
    dispatch(getGame(param));
  };
  const setEditorRating = (value: number) => {
    dispatch(setValueEditorRating(value));
  };

  const setUserRating = (value: number) => {
    dispatch(setValueUserRating(value));
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

  const SetErrorsSizeImage = (value: string | null) => {
    dispatch(setErrorsSizeImage(value));
  };
  const SetPlatforms = (value: string[]) => {
    dispatch(setPlatforms(value));
  };

  const SetPlayNow = (value: boolean) => {
    dispatch(setPlayNow(value));
  };
  const SetFreeToPlay = (value: boolean) => {
    dispatch(setFreeToPlay(value));
  };
  const SetAwardWinners = (value: boolean) => {
    dispatch(setAwardWinners(value));
  };
  const SetFavorites = (value: boolean) => {
    dispatch(setFavorites(value));
  };
  const SetGenresTitle = (value: string) => {
    dispatch(setGenresTitle(value));
  };

  const createGameReviews = (body: PropsGameReview) => {
    dispatch(createGameReview(body));
  };

  const setIsCreateRate = (value: boolean) => {
    dispatch(SetIsCreateRate(value));
  };
  const fetchGameCount = () => {
    dispatch(getGameCount());
  };

  const fetchGetGameOwner = (param: ParamsProp = {}) => {
    dispatch(getGameOwner(param));
  };

  const createGames = (params: PropsFormik) => {
    dispatch(createGame(params));
  };

  const setIsCreate = () => {
    dispatch(SetIsCreateGame());
  };
  const updateGames = (params: PropsFormik) => {
    dispatch(updateGame(params));
  };

  const setIsUpdate = () => {
    dispatch(SetIsUpdateGame());
  };
  const getGameId = (gameId: number) => {
    dispatch(getGameID(gameId));
  };

  const setStatusGet = () => {
    dispatch(SetStatus());
  };
  const DeleteGame = (body: PropsDelete) => {
    dispatch(deleteGame(body));
  };

  const setIsDeletes = () => {
    dispatch(SetIsDelete());
  };

  return {
    setIsDeletes,
    DeleteGame,
    setStatusGet,
    getGameId,
    setIsUpdate,
    updateGames,
    setIsCreate,
    createGames,
    fetchGetGameOwner,
    fetchGameCount,
    setIsCreateRate,
    createGameReviews,
    error,
    loading,
    fetchGetGame,
    isCreate,
    isCreateRate,
    isDelete,
    isUpdate,
    dataGameCount,
    dataGameOwner,
    dataGetGameId,
    dataListGame,
    status,
    valueEditorRating,
    valueUserRating,
    gameId,
    isGetGameId,
    genres,
    errorsSizeImage,
    platforms,
    playNow,
    freeToPlay,
    awardWinners,
    favorites,
    genresTitle,
    setEditorRating,
    setUserRating,
    setGameID,
    setGetGameId,
    SetGenres,
    SetErrorsSizeImage,
    SetPlatforms,
    SetAwardWinners,
    SetFavorites,
    SetFreeToPlay,
    SetPlayNow,
    SetGenresTitle,
  };
};
