import { client } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EndPointChatAi } from "./helper";
import axios from "axios";

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
    }
    return arrChunk[0];
  } finally {
    reader.releaseLock();
  }
};

export interface SendMessageProps {
  threadId?: string;
  question: string;
}

export const SendMessage = createAsyncThunk(
  "sendMessage",
  async (sendBody: SendMessageProps) => {
    try {
      const response = await fetch(EndPointChatAi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendBody),
      });
      const stream = response.body as ReadableStream;
      const data = await readStream(stream);
      return JSON.parse(data).threadId;
    } catch (error) {
      throw error;
    }
  },
);

export const GetHistory = createAsyncThunk(
  "get/history",
  async (threadId: string) => {
    try {
      const response = await axios.get(
        `${EndPointChatAi}/${threadId}/histories`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
