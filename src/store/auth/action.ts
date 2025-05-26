import { client, Endpoint } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthAptos {
  wallet: string;
  signature: string;
  publicKey: string;
  refBy?: string;
}

export const authAptos = createAsyncThunk(
  "auth/signmessage",
  async (body: AuthAptos) => {
    try {
      const response = await client.post(Endpoint.AUTH_WALLET, body);
      return response.data;
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

      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export interface LoginGoogle {
  email: string;
}

export const loginGoogle = createAsyncThunk(
  "post/loginGoogles",
  async (body: LoginGoogle) => {
    try {
      const response = await client.post(Endpoint.LOGIN_GOOGLE, body);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export interface LoginAccount {
  userName: string;
  password: string;
}

export const loginAccount = createAsyncThunk(
  "post/loginAccount",
  async (body: LoginAccount) => {
    try {
      const response = await axios.post(Endpoint.LOGIN_ACCOUNT, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getProfile = createAsyncThunk("get/profile", async () => {
  try {
    const response = await axios.get(Endpoint.GET_PROFILE);
    return response.data;
  } catch (error) {
    throw error;
  }
});
