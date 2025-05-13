import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  createGame,
  deleteGame,
  getGame,
  getGameCount,
  getGameID,
  getGameOwner,
  ParamsProp,
  PropsDelete,
  PropsFormik,
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
  setIsCreateGame,
  setIsDelete,
  setIsUpdateGame,
  setPlatforms,
  setPlayNow,
  setStatus,
  setStatusGetGameID,
  setValueEditorRating,
  setValueUserRating,
} from "./reducer";

export const useGame = () => {
  const dispatch = useAppDispatch();

  const fetchGetGame = (param: ParamsProp = {}) => {
    dispatch(getGame(param));
  };

  const { error, loading, data } = useAppSelector((state) => state.game);

  return {
    error,
    loading,
    data,
    fetchGetGame,
  };
};

export const useGameCount = () => {
  const dispatch = useAppDispatch();

  const fetchGameCount = () => {
    dispatch(getGameCount());
  };

  const { error, loading, data } = useAppSelector((state) => state.gameCount);

  return {
    error,
    loading,
    data,
    fetchGameCount,
  };
};

export const useGameOwner = () => {
  const dispatch = useAppDispatch();

  const fetchGetGameOwner = (param: ParamsProp = {}) => {
    dispatch(getGameOwner(param));
  };

  const { error, loading, data } = useAppSelector((state) => state.gameOwner);

  return {
    error,
    loading,
    data,
    fetchGetGameOwner,
  };
};

export const useGameReducers = () => {
  const dispatch = useAppDispatch();

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

  const {
    valueUserRating,
    valueEditorRating,
    gameId,
    isGetGameId,
    genres,
    errorsSizeImage,
    platforms,
    playNow,
    awardWinners,
    freeToPlay,
    favorites,
    genresTitle,
  } = useAppSelector((state) => state.gameReducers);

  return {
    gameId,
    setEditorRating,
    setUserRating,
    valueEditorRating,
    valueUserRating,
    setGameID,
    isGetGameId,
    setGetGameId,
    genres,
    SetGenres,
    errorsSizeImage,
    SetErrorsSizeImage,
    SetPlatforms,
    SetAwardWinners,
    SetFavorites,
    SetFreeToPlay,
    SetPlayNow,
    platforms,
    playNow,
    awardWinners,
    freeToPlay,
    favorites,
    genresTitle,
    SetGenresTitle,
  };
};

export const useCreateGame = () => {
  const dispatch = useAppDispatch();

  const createGames = (params: PropsFormik) => {
    dispatch(createGame(params));
  };

  const setIsCreate = () => {
    dispatch(setIsCreateGame());
  };

  const { isCreate, loadingCreate, errorCreate } = useAppSelector(
    (state) => state.createGame,
  );

  return {
    isCreate,
    loadingCreate,
    errorCreate,
    createGames,
    setIsCreate,
  };
};

export const useUpdateGame = () => {
  const dispatch = useAppDispatch();

  const updateGames = (params: PropsFormik) => {
    dispatch(updateGame(params));
  };

  const setIsUpdate = () => {
    dispatch(setIsUpdateGame());
  };

  const { isUpdate, loadingUpdate, errorUpdate } = useAppSelector(
    (state) => state.updateGame,
  );

  return {
    isUpdate,
    loadingUpdate,
    errorUpdate,
    updateGames,
    setIsUpdate,
  };
};

export const useGetGameId = () => {
  const dispatch = useAppDispatch();

  const getGameId = (gameId: number) => {
    dispatch(getGameID(gameId));
  };

  const setStatusGet = () => {
    dispatch(setStatus());
  };

  const { data, loading, error, status } = useAppSelector(
    (state) => state.getGameId,
  );

  return {
    data,
    loading,
    error,
    getGameId,
    setStatusGet,
    status,
  };
};

export const useDeleteGame = () => {
  const dispatch = useAppDispatch();

  const DeleteGame = (body: PropsDelete) => {
    dispatch(deleteGame(body));
  };

  const setIsDeletes = () => {
    dispatch(setIsDelete());
  };

  const { isDelete, loadingDelete, errorDelete } = useAppSelector(
    (state) => state.deleteGame,
  );

  return {
    isDelete,
    loadingDelete,
    errorDelete,
    DeleteGame,
    setIsDeletes,
  };
};
