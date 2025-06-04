import { useAppDispatch, useAppSelector } from "@store/hooks";
import { QuestCreationRequest, QuestProps } from "./type";
import { CreateQuest, GetQuest, GetQuestById } from "./action";
import { SetCreate } from "./reducer";

export const useQuest = () => {
  const dispatch = useAppDispatch();

  const getQuest = (params: QuestProps) => {
    dispatch(GetQuest(params));
  };

  const getQuestById = (params: number) => {
    dispatch(GetQuestById(params));
  };

  const createQuest = (body: QuestCreationRequest) => {
    dispatch(CreateQuest(body));
  };

  const setCreate = () => {
    dispatch(SetCreate());
  };

  const { error, loading, quest, questById, isCreate } = useAppSelector(
    (state) => state.quest,
  );

  return {
    createQuest,
    isCreate,
    setCreate,
    error,
    loading,
    quest,
    getQuest,
    getQuestById,
    questById,
  };
};
