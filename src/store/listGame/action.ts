import { client, Endpoint } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";

export const getListGame = createAsyncThunk("get/listGame", async () => {
  try {
    const response = await client.get(Endpoint.GET_GAME);
    if (response?.status === HttpStatusCode.Ok) {
      // return {
      //     ...response.data,
      //     items: response.data.items.map((item) => rawDataSwapToReadable(item)),
      // };
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});
