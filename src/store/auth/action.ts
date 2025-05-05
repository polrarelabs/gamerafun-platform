import { client, Endpoint } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface PropsSignMessage {
  nonce: string;
  wallet: string;
}

export interface AuthSignMessage {
  wallet: string;
  signature: string;
  publicKey: string;
  refBy?: string;
}

export const petraSignMessage = createAsyncThunk(
  "post/signmessage",
  async (body: PropsSignMessage) => {
    try {
      const response = await client.post(Endpoint.AUTH_SIGNMESSAGE, body);
      // const loginId = response.data.split("loginId:")[1]?.trim();
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const authSignMessage = createAsyncThunk(
  "auth/signmessage",
  async (body: AuthSignMessage) => {
    try {
      const response = await client.post(Endpoint.AUTH_SIGNMESSAGEV1, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
