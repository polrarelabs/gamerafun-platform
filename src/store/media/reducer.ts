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
  isUpload: boolean;
  url: string | null;
}

const initialStateGallery: PropsStateGalley = {
  dataGallery: {} as PropsGalleryReducer,
  loadingGallery: false,
  errorGallery: "",
  isUpload: false,
  url: null,
};

const GalleryReducer = createSlice({
  name: "gallery",
  initialState: initialStateGallery,
  reducers: {
    setDataGallery: (state) => {
      state.dataGallery = {} as PropsGalleryReducer;
    },
    setIsUpload: (state, action: PayloadAction<boolean>) => {
      state.isUpload = action.payload;
    },
    SetUrl: (state, action: PayloadAction<string | null>) => {
      state.url = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(upGallery.pending, (state) => {
        state.loadingGallery = false;
        state.isUpload = false;
      })
      .addCase(
        upGallery.fulfilled,
        (state, action: PayloadAction<PropsGalleryReducer>) => {
          state.dataGallery = action.payload;
          state.loadingGallery = false;
          state.isUpload = true;
        },
      )
      .addCase(upGallery.rejected, (state, action: PayloadAction<any>) => {
        state.errorGallery = action.payload as string;
        state.loadingGallery = false;
        state.isUpload = false;
      });
  },
});

export const reducers = {
  gallery: GalleryReducer.reducer,
};

export const { setDataGallery, setIsUpload, SetUrl } = GalleryReducer.actions;
