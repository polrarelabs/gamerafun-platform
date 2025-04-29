import { client, Endpoint } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParamsProp } from "@store/game/action";
import { HttpStatusCode } from "axios";

export const getGameOwner = createAsyncThunk(
  "game/getOwner",
  async (params: ParamsProp) => {
    try {
      const respon = await client.get(Endpoint.GET_GAME_OWNER, params);
      if (respon?.status === HttpStatusCode.Ok) {
        return respon.data;
      }
    } catch (error) {
      throw error;
    }
  },
);
