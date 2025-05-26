"use client";

import { Avatar } from "@components/Info";
import { Text } from "@components/shared";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  Stack,
} from "@mui/material";
import { HistoryProps, useChatAI } from "@store/chatAI";
import { TypeChat } from "@store/chatAI/helper";
import { palette } from "public/material";
import React, { memo, useEffect, useRef, useState } from "react";

import { MdSend } from "react-icons/md";

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
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth={"md"}
      sx={{
        border: "1px solid text.disabled",
      }}
    >
      <DialogTitle>
        <Text color="text.disabled" fontSize={"16px"} fontWeight={500}>
          Ask Gamera AI
        </Text>
      </DialogTitle>
      <DialogContent
        sx={{
          maxHeight: 400,
          minHeight: 400,
          height: "100%",
          overflow: "auto",
          px: 0,
        }}
      >
        <Stack
          direction={"column"}
          gap={2}
          overflow={"auto"}
          px={2}
          mb={2}
          height={"100%"}
          width={"100%"}
        >
          {historyChats.map((item, index) => {
            return (
              <Stack
                key={item.id}
                direction={"row"}
                justifyContent={item.type === TypeChat.AI ? "start" : "end"}
                alignItems={"center"}
                // ref={index === historyChats.length - 1 ? ref : null}
                width={"100%"}
              >
                <Stack
                  direction={"row"}
                  alignItems={"start"}
                  // gap={1}
                  maxWidth={{ md: "70%", xs: "95%" }}
                >
                  {item.type === TypeChat.AI && (
                    <Avatar
                      sx={{
                        bgcolor: palette.avatarAI,
                        width: 40,
                        height: 40,
                      }}
                      variant="square"
                    >
                      <Text>AI</Text>
                    </Avatar>
                  )}
                  <Text
                    ref={index === historyChats.length - 1 ? ref : null}
                    sx={{
                      background:
                        // item.errors && item.type === "ai"
                        //   ? "none"
                        //   :
                        item.type === TypeChat.AI
                          ? // ? palette.colorGray
                            "none"
                          : palette.colorGray,
                      // : palette.bgLinearGradient,
                      width: "max-content",
                      // border:
                      //   item.errors && item.type === "ai"
                      //     ? "1px solid red"
                      //     :
                      //     "none",
                      padding: "4px 16px",
                      borderTopRightRadius: "20px",
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius:
                        item.type === TypeChat.AI ? "4px" : "20px",
                      borderBottomRightRadius:
                        item.type === TypeChat.AI ? "20px" : "4px",

                      display: "block",
                      wordWrap: "break-word",
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                      color:
                        // item.errors && item.type === TypeChat.AI
                        //   ? "red"
                        //   :
                        item.type === TypeChat.AI ? "white" : "black",
                    }}
                  >
                    {item.content}
                  </Text>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack p={2} borderTop={"1px solid"} maxHeight={"50px"} flex={1}>
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
      </DialogActions>
    </Dialog>
  );
};

export default memo(ChatAI);
