import { client, Endpoint } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface PropsSignMessage {
  nonce: string;
  wallet: string;
}

export const petraSignMessage = createAsyncThunk(
  "signmessage/post",
  async (body: PropsSignMessage) => {
    try {
      const response = await client.post(Endpoint.AUTH_SIGNMESSAGE, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
