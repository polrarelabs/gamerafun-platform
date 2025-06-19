"use client";

import { Avatar } from "@components/Info";
import { Text } from "@components/shared";
import { HistoryProps } from "@store/chatAI";
import { TypeChat } from "@store/chatAI/helper";
import { palette } from "public/material";
import React, { forwardRef, memo } from "react";

interface MessageProps {
  historyChats: HistoryProps[];
  index: number;
  item: HistoryProps;
}

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ historyChats, index, item }, ref) => {
    return (
      <>
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
            background: item.type === TypeChat.AI ? "none" : palette.colorGray,
            width: "max-content",
            padding: "4px 16px",
            borderTopRightRadius: "20px",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: item.type === TypeChat.AI ? "4px" : "20px",
            borderBottomRightRadius: item.type === TypeChat.AI ? "20px" : "4px",
            display: "block",
            wordWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            color: item.type === TypeChat.AI ? "white" : "black",
          }}
        >
          {item.content}
        </Text>
      </>
    );
  },
);

Message.displayName = "Message";

export default memo(Message);
