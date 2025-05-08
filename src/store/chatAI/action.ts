import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetChatAI = createAsyncThunk("get/message", async (id: string) => {
  try {
    const response = await axios.get(
      `https://ask-service.sentism.ai/api/ask/${id}/histories`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
});
