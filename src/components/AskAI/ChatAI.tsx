"use client";

import { Text } from "@components/shared";
import { CircularProgress, IconButton, InputBase, Stack } from "@mui/material";
import { MessageChat, useAskAI, useMessageChat } from "@store/chatAI";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";

import { MdSend } from "react-icons/md";

interface AskAI {
  threadId: string;
  question: string;
}

const ChatAI = () => {
  const { data, getMessage } = useMessageChat();

  const [value, setvalue] = useState<string>("");

  const [isCall, setIsCall] = useState<boolean>(false);

  const [dataHistorychat, setDataHistorychat] = useState<MessageChat[]>([]);

  const [errors, setError] = useState<string | null>(null);

  const { setThreadid, threadId } = useAskAI();
  const [sendBody, setSendBody] = useState<AskAI>({
    threadId: "",
    question: "",
  });

  const ref = useRef<HTMLDivElement>(null);

  const scrolltoView = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  const handleSetBody = useCallback(
    (message: string) => {
      if (message.length > 0) {
        setError(null);
        setSendBody({
          threadId: threadId,
          question: message,
        });

        const arrnew: MessageChat[] = [
          ...dataHistorychat,
          {
            id: dataHistorychat.length,
            content: message,
            type: "humman",
          },
        ];
        setvalue("");
        setDataHistorychat(arrnew);
        setTimeout(() => {
          const updatedArr = [
            ...arrnew,
            {
              id: arrnew.length,
              content: <CircularProgress color="inherit" size="15px" />,
              type: "ai",
            },
          ];
          setDataHistorychat(updatedArr);
        }, 200);
      }
    },
    [dataHistorychat, threadId],
  );

  const readStream = async (stream: ReadableStream) => {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    const arrChunk: string[] = [];
    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value);
        arrChunk.push(chunk);
        const lines = chunk.split("\n").filter((line) => line.trim());

        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            if (data.messages) {
              console.log("dataaa", data);
            }
          } catch (e) {
            console.error("Error parsing JSON:", e);
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
    if (arrChunk.length > 0) {
      const t = JSON.parse(arrChunk[0]);
      setThreadid(t.threadId);
      setIsCall(true);
    }
  };
  const ask = async () => {
    const response = await fetch(`https://ask-service.sentism.ai/api/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBody),
    });

    if (!response.ok) {
      const errors = new Error(`HTTP error! status: ${response.status}`);
      setError(errors.message);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const stream = response.body as ReadableStream;

    return await readStream(stream);
  };

  useEffect(() => {
    if (sendBody && sendBody.question.length > 0) {
      ask();
    }
  }, [sendBody]);

  useEffect(() => {
    if (isCall) {
      getMessage(threadId);
      setIsCall(false);
    }
  }, [isCall]);

  useEffect(() => {
    setDataHistorychat(data);
  }, [data]);

  useEffect(() => {
    scrolltoView();
  }, [dataHistorychat]);

  useEffect(() => {
    const setErrorsMessage = () => {
      if (errors !== null) {
        const arr: MessageChat[] = [...dataHistorychat];

        arr.pop();

        arr.push({
          id: dataHistorychat.length,
          content: errors,
          type: "ai",
          errors: true,
        });
      }
    };

    setTimeout(setErrorsMessage, 5000);
  }, [errors]);

  return (
    <Stack
      border={"1px solid #9ca3af"}
      borderRadius={"8px"}
      height={"100%"}
      width={"100%"}
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        py={2}
        sx={{
          background: "linear-gradient(90deg, #1CD6CE 0%, #83F858 100%)",
          borderTopRightRadius: "8px",
          borderTopLeftRadius: "8px",
        }}
      >
        <Text color="black" fontSize={"20px"} fontWeight={700}>
          Ask AI
        </Text>
      </Stack>
      <Stack
        direction={"column"}
        gap={2}
        overflow={"auto"}
        px={2}
        mb={2}
        height={"100%"}
        width={"100%"}
      >
        {dataHistorychat.map((item, index) => {
          return (
            <Stack
              key={item.id}
              direction={"row"}
              justifyContent={item.type === "ai" ? "start" : "end"}
              alignItems={"center"}
              ref={index === dataHistorychat.length - 1 ? ref : null}
            >
              <Text
                sx={{
                  background:
                    item.errors && item.type === "ai"
                      ? "none"
                      : item.type === "ai"
                        ? "#9ca3af"
                        : "linear-gradient(90deg, #1CD6CE 0%, #83F858 100%)",
                  width: "max-content",
                  border:
                    item.errors && item.type === "ai"
                      ? "1px solid red"
                      : "none",
                  padding: "4px 16px",
                  borderTopRightRadius: "20px",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: item.type === "ai" ? "4px" : "20px",
                  borderBottomRightRadius: item.type === "ai" ? "20px" : "4px",
                  maxWidth: "70%",
                  display: "block",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  color:
                    item.errors && item.type === "ai"
                      ? "red"
                      : item.type === "ai"
                        ? "white"
                        : "black",
                }}
              >
                {item.content}
              </Text>
            </Stack>
          );
        })}
      </Stack>
      <Stack p={2} borderTop={"1px solid"}>
        <InputBase
          placeholder="Chat with AI"
          value={value}
          onChange={(e) => setvalue(e.target.value)}
          endAdornment={
            <IconButton
              onClick={() => handleSetBody(value)}
              disabled={value.length > 0 ? false : true}
            >
              <MdSend />
            </IconButton>
          }
          onKeyDown={(key) => {
            if (key.key === "Enter") handleSetBody(value);
          }}
          autoFocus
        />
      </Stack>
    </Stack>
  );
};

export default memo(ChatAI);
