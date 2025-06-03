import { client, Endpoint } from "@api";
import { StatusBlog, Tag } from "@constant/enum";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BlogRequestState, GetBlogProps } from "./type";

export const GetBlog = createAsyncThunk(
  "get/blog",
  async (param: GetBlogProps) => {
    try {
      const response = await client.get(Endpoint.GET_BLOG, param);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const GetBlogSponsored = createAsyncThunk(
  "get/blog-sponsored",
  async (param: GetBlogProps) => {
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
  async (blogId: string) => {
    try {
      const response = await client.get(`${Endpoint.GET_BLOG}/${blogId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const CreateBlog = createAsyncThunk(
  "post/create-blog",
  async (body: BlogRequestState) => {
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
  async (body: BlogRequestState) => {
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
