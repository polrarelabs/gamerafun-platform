import { useAppDispatch, useAppSelector } from "@store/hooks";
import { GetHistory, SendMessage, MessageProps } from "./action";
import { setIsCall } from "./reducer";

export const useChatAI = () => {
  const dispatch = useAppDispatch();

  const sendMessage = (message: MessageProps) => {
    dispatch(SendMessage(message));
  };

  const getHistory = (params: string) => {
    dispatch(GetHistory(params));
  };

  const SetIsCall = (value: boolean) => {
    dispatch(setIsCall(value));
  };

  const {
    message: threadId,
    loading,
    error,
    isCall,
    histories,
  } = useAppSelector((state) => state.chatai);

  return {
    threadId,
    loading,
    error,
    sendMessage,
    getHistory,
    histories,
    SetIsCall,
    isCall,
  };
};
