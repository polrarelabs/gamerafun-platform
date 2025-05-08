import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setThreadId } from "./reducer";
import { GetChatAI } from "./action";

export const useAskAI = () => {
  const dispatch = useAppDispatch();

  const setThreadid = (id: string) => {
    dispatch(setThreadId(id));
  };

  const { threadId } = useAppSelector((state) => state.askAI);

  return {
    threadId,
    setThreadid,
  };
};

export const useMessageChat = () => {
  const dispatch = useAppDispatch();

  const getMessage = (id: string) => {
    dispatch(GetChatAI(id));
  };

  const { data, loading, error } = useAppSelector((state) => state.messageChat);

  return {
    data,
    loading,
    error,
    getMessage,
  };
};
