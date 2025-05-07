import { client, Endpoint } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";

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
      if ((response.status = HttpStatusCode.Ok)) return response.data;
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
      if ((response.status = HttpStatusCode.Ok)) return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export interface PropsLoginX {
  id: string;
  sessionId: string;
}

export const loginX = createAsyncThunk(
  "post/loginX",
  async (params: PropsLoginX) => {
    try {
      const response = await client.post(Endpoint.LOGIN_X, params);

      if ((response.status = HttpStatusCode.Ok)) return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export interface LoginGoogle {
  email: string;
}

export const loginGoogle = createAsyncThunk(
  "post/loginGoogle",
  async (body: LoginGoogle) => {
    try {
      const response = await client.post(Endpoint.LOGIN_GOOGLE, body);

      if (response.status === HttpStatusCode.Ok) return response.data;
    } catch (error) {
      throw error;
    }
  },
);
