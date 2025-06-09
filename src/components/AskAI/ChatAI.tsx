/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import DialogLayout from "@components/DialogLayout";
import { Text } from "@components/shared";
import { CircularProgress, IconButton, InputBase, Stack } from "@mui/material";
import { HistoryProps, useChatAI } from "@store/chatAI";
import { TypeChat } from "@store/chatAI/helper";
import { memo, useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import Message from "./Message";

interface PropChatAI {
  handleClose: () => void;
  open: boolean;
}

const ChatAI = ({ handleClose, open }: PropChatAI) => {
  const { threadId, sendMessage, histories, getHistory, isCall, SetIsCall } =
    useChatAI();

  const [value, setvalue] = useState<string>("");

  const [historyChats, setHistoryChats] = useState<HistoryProps[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  const scrolltoView = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isCall) {
      getHistory(threadId);
      SetIsCall(false);
    }
  }, [isCall]);

  useEffect(() => {
    if (histories) {
      setHistoryChats(histories);
    }
  }, [histories]);
  useEffect(() => {
    scrolltoView();
  }, [historyChats]);

  const handleSendMessage = () => {
    if (value.length > 0) {
      sendMessage({
        threadId: threadId,
        question: value,
      });
      const arrnew: HistoryProps[] = [
        ...historyChats,
        {
          id: historyChats.length,
          content: value,
          type: TypeChat.HUMAN,
        },
      ];
      setvalue("");
      setHistoryChats(arrnew);
      setTimeout(() => {
        const updatedArr = [
          ...arrnew,
          {
            id: arrnew.length,
            content: <CircularProgress color="inherit" size="15px" />,
            type: TypeChat.AI,
          },
        ];
        setHistoryChats(updatedArr);
      }, 200);
    }
  };

  return (
    <DialogLayout
      fullWidth
      open={open}
      onClose={handleClose}
      sx={{
        border: "1px solid text.disabled",
      }}
    >
      <Text color="text.disabled" fontSize={"16px"} fontWeight={500}>
        Ask Gamera AI
      </Text>

      <Stack
        direction={"column"}
        gap={2}
        overflow={"auto"}
        pr={2}
        mb={2}
        height={"100%"}
        width={"100%"}
        maxHeight={400}
        minHeight={400}
      >
        {historyChats.map((item, index) => {
          return (
            <Stack
              key={item.id}
              direction={"row"}
              justifyContent={item.type === TypeChat.AI ? "start" : "end"}
              alignItems={"center"}
              width={"100%"}
            >
              <Stack
                direction={"row"}
                alignItems={"start"}
                maxWidth={{ md: "70%", xs: "95%" }}
              >
                <Message
                  index={index}
                  item={item}
                  historyChats={historyChats}
                  ref={ref}
                />
              </Stack>
            </Stack>
          );
        })}
      </Stack>
      <Stack px={2} borderTop={"1px solid"} maxHeight={"40px"} flex={1}>
        <InputBase
          placeholder="Chat with AI"
          value={value}
          onChange={(e) => setvalue(e.target.value)}
          endAdornment={
            <IconButton
              onClick={() => handleSendMessage()}
              disabled={value.length > 0 ? false : true}
            >
              <MdSend />
            </IconButton>
          }
          onKeyDown={(key) => {
            if (key.key === "Enter") handleSendMessage();
          }}
          autoFocus
        />
      </Stack>
    </DialogLayout>
  );
};

export default memo(ChatAI);
