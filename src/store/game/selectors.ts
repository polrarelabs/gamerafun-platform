import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  createGame,
  getGame,
  getGameCount,
  getGameOwner,
  ParamsProp,
  PropsFormik,
  upGallery,
} from "./action";
import {
  setGameId,
  setIsCreateGame,
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

  const { valueUserRating, valueEditorRating, gameId } = useAppSelector(
    (state) => state.gameReducers,
  );

  return {
    gameId,
    setEditorRating,
    setUserRating,
    valueEditorRating,
    valueUserRating,
    setGameID,
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

export const useGallery = () => {
  const dispatch = useAppDispatch();

  const uploadGallery = (body: FormData) => {
    dispatch(upGallery(body));
  };

  const { dataGallery, loadingGallery, errorGallery } = useAppSelector(
    (state) => state.gallery,
  );

  return {
    dataGallery,
    loadingGallery,
    errorGallery,
    uploadGallery,
  };
};
