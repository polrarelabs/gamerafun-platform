import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getGame, ParamsProp } from "./action";

export const useGame = () => {
  const dispatch = useAppDispatch();

  const fetchGetGame = (param: ParamsProp = {}) => {
    dispatch(getGame(param));
  };

  const { error, loading, data } = useAppSelector((state) => state.getGame);

  return {
    error,
    loading,
    data,
    fetchGetGame,
  };
};
