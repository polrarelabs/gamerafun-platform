import { client, Endpoint } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuestProps } from "./type";

export const GetQuest = createAsyncThunk(
  "get/quest",
  async (params: QuestProps = {}) => {
    try {
      const response = await client.get(Endpoint.GET_QUEST, params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
