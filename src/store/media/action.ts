import { client, Endpoint } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const upGallery = createAsyncThunk(
  "upload/gallery",
  async (formData: FormData) => {
    try {
      const response = await client.post(Endpoint.GALLERY, formData, {
        headers: {
          "Content-Type": undefined,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
