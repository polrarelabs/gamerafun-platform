import { client, Endpoint } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { JoinRequest, QuestCreationRequest, QuestProps } from "./type";

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

export const GetQuestById = createAsyncThunk(
  "get/quest/id",
  async (params: number) => {
    try {
      const response = await client.get(`${Endpoint.GET_QUEST}/${params}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const CreateQuest = createAsyncThunk(
  "create/quest",
  async (body: QuestCreationRequest) => {
    try {
      const response = await client.post(Endpoint.CREATE_QUEST, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const JoinQuest = createAsyncThunk(
  "post/join",
  async (body: JoinRequest) => {
    try {
      const response = await client.post(Endpoint.JOIN_QUEST, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
