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
  upGallery,
} from "./action";
import {
  setDataGallery,
  setGameId,
  setIsCreateGame,
  setIsDelete,
  setIsUpdateGame,
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

  const { valueUserRating, valueEditorRating, gameId, isGetGameId } =
    useAppSelector((state) => state.gameReducers);

  return {
    gameId,
    setEditorRating,
    setUserRating,
    valueEditorRating,
    valueUserRating,
    setGameID,
    isGetGameId,
    setGetGameId,
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

export const useGallery = () => {
  const dispatch = useAppDispatch();

  const uploadGallery = (body: FormData) => {
    dispatch(upGallery(body));
  };

  const resetGallery = () => {
    dispatch(setDataGallery());
  };

  const { dataGallery, loadingGallery, errorGallery } = useAppSelector(
    (state) => state.gallery,
  );

  return {
    dataGallery,
    loadingGallery,
    errorGallery,
    uploadGallery,
    resetGallery,
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
