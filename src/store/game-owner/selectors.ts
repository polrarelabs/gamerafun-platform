import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getGameOwner } from "./action";
import { ParamsProp } from "@store/game/action";

export const useGameOwner = () => {
  const dispatch = useAppDispatch();

  const fetchGetGameOwner = (param: ParamsProp = {}) => {
    dispatch(getGameOwner(param));
  };

  const { error, loading, data } = useAppSelector(
    (state) => state.getGameOwner,
  );

  return {
    error,
    loading,
    data,
    fetchGetGameOwner,
  };
};
