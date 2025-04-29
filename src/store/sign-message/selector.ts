import { useAppDispatch, useAppSelector } from "@store/hooks";
import { petraSignMessage, PropsSignMessage } from "./action";

export const useSignMessage = () => {
  const dispatch = useAppDispatch();

  const petraMessage = (body: PropsSignMessage) => {
    dispatch(petraSignMessage(body));
  };

  const { data, loading, error } = useAppSelector((state) => state.signmessage);

  return {
    data,
    loading,
    error,
    petraMessage,
  };
};
