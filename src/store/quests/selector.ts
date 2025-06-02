import { useAppDispatch, useAppSelector } from "@store/hooks";
import { QuestProps } from "./type";
import { GetQuest } from "./action";

export const useQuest = () => {
  const dispatch = useAppDispatch();

  const getQuest = (params: QuestProps) => {
    dispatch(GetQuest(params));
  };

  const { error, loading, quest } = useAppSelector((state) => state.quest);

  return {
    error,
    loading,
    quest,
    getQuest,
  };
};
