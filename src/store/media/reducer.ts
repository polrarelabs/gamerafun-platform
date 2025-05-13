/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { upGallery } from "./action";

export interface PropsGalleryReducer {
  id: string;
  name: string;
  description: string;
  fileName: string;
  url: string;
  cdn: string;
  md5: string;
  dimension: string;
  ratio: number;
  mimetype: string;
  createdBy: string;
  createdAt: string;
}

interface PropsStateGalley {
  dataGallery: PropsGalleryReducer;
  loadingGallery: boolean;
  errorGallery: string;
}

const initialStateGallery: PropsStateGalley = {
  dataGallery: {} as PropsGalleryReducer,
  loadingGallery: false,
  errorGallery: "",
};

const GalleryReducer = createSlice({
  name: "gallery",
  initialState: initialStateGallery,
  reducers: {
    setDataGallery: (state) => {
      state.dataGallery = {} as PropsGalleryReducer;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(upGallery.pending, (state) => {
        state.loadingGallery = false;
      })
      .addCase(
        upGallery.fulfilled,
        (state, action: PayloadAction<PropsGalleryReducer>) => {
          state.dataGallery = action.payload;
          state.loadingGallery = false;
        },
      )
      .addCase(upGallery.rejected, (state, action: PayloadAction<any>) => {
        state.errorGallery = action.payload as string;
        state.loadingGallery = false;
      });
  },
});

export const reducers = {
  gallery: GalleryReducer.reducer,
};

export const { setDataGallery } = GalleryReducer.actions;
