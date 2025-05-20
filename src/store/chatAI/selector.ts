import { useAppDispatch, useAppSelector } from "@store/hooks";
import { GetHistory, SendMessage, SendMessageProps } from "./action";
import { setIsCall } from "./reducer";

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
    dataSendMessage: threadId,
    loading,
    error,
    isCall,
    dataHistory: history,
  } = useAppSelector((state) => state.chatai);

  return {
    threadId,
    loading,
    error,
    sendMessage,
    getHistory,
    history,
    SetIsCall,
    isCall,
  };
};
