import { useAppDispatch, useAppSelector } from "@store/hooks";
import { GetHistory, SendMessage, SendMessageProps } from "./action";
import { setIsCall } from "./reducer";

// export const useAskAI = () => {
//   const dispatch = useAppDispatch();

//   const setThreadid = (id: string) => {
//     dispatch(setThreadId(id));
//   };

//   const { threadId } = useAppSelector((state) => state.askAI);

//   return {
//     threadId,
//     setThreadid,
//   };
// };

export const useSendMessage = () => {
  const dispatch = useAppDispatch();

  const sendMessage = (message: SendMessageProps) => {
    dispatch(SendMessage(message));
  };

  const getHistory = (params: string) => {
    dispatch(GetHistory(params));
  };

  const SetIsCall = (value: boolean) => {
    dispatch(setIsCall(value));
  };

  const {
    data: threadId,
    loading: loadingThreadId,
    error: errorThreadId,
    isCall,
  } = useAppSelector((state) => state.sendMessage);
  const {
    data: history,
    loading: loadingHistory,
    error: errorHistory,
  } = useAppSelector((state) => state.history);

  return {
    threadId,
    loadingThreadId,
    errorThreadId,
    sendMessage,
    getHistory,
    history,
    loadingHistory,
    errorHistory,
    SetIsCall,
    isCall,
  };
};
