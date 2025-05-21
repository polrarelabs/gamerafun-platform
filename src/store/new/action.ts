import { client, Endpoint } from "@api";
import { StatusBlog, Tag } from "@constant/enum";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface GetBlogProps {
  search?: string;
  sortBy?: string;
  sortBydate?: string;
}

export const GetBlog = createAsyncThunk(
  "get/blog",
  async (param: GetBlogProps = {}) => {
    try {
      const response = await client.get(Endpoint.GET_BLOG, param);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const GetBlogId = createAsyncThunk(
  "get/blog-id",
  async (blogId: number) => {
    try {
      const response = await client.get(`${Endpoint.GET_BLOG}/${blogId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

interface MediaProp {
  type: string;
  url: string;
}

export interface CreateBlogProps {
  id?: number;
  title: string;
  shortDescription: string;
  content: string;
  tags: Tag[];
  media: MediaProp[];
  status: StatusBlog;
  slug: string;
  publicDate: string;
}

export const CreateBlog = createAsyncThunk(
  "post/create-blog",
  async (body: CreateBlogProps) => {
    try {
      const response = await client.post(Endpoint.POST_CREATE_BLOG, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const UpdateBlog = createAsyncThunk(
  "patch/update-blog",
  async (body: CreateBlogProps) => {
    try {
      const response = await client.patch(Endpoint.PATCH_UPDATE_BLOG, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const DeleteBlog = createAsyncThunk(
  "delete/blog",
  async (blogId: number) => {
    try {
      const response = await client.delete(`${Endpoint.DELETE_BLOG}/${blogId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
