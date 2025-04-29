import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getGameCount } from "./action";

export const useGameCount = () => {
  const dispatch = useAppDispatch();

  const fetchGameCount = () => {
    dispatch(getGameCount());
  };

  const { error, loading, data } = useAppSelector(
    (state) => state.getGameCount,
  );

  return {
    error,
    loading,
    data,
    fetchGameCount,
  };
};
