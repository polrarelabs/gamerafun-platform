import { client, Endpoint } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";

export const getGameCount = createAsyncThunk("game/getCount", async () => {
  try {
    const response = await client.get(Endpoint.GET_GAME_COUNT);
    if (response.status === HttpStatusCode.Ok) return response.data;
  } catch (error) {
    throw error;
  }
});
