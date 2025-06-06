import { useAppDispatch, useAppSelector } from "@store/hooks";
import { JoinRequest, QuestCreationRequest, QuestProps } from "./type";
import { CreateQuest, GetQuest, GetQuestById, JoinQuest } from "./action";
import { SetCreate, SetJoin } from "./reducer";

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

  const joinQuest = (body: JoinRequest) => {
    dispatch(JoinQuest(body));
  };

  const setCreate = () => {
    dispatch(SetCreate());
  };

  const setJoin = () => {
    dispatch(SetJoin());
  };

  const { error, loading, quest, questById, isCreate, isJoin } = useAppSelector(
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
    joinQuest,
    isJoin,
    setJoin,
  };
};
