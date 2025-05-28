import { client, Endpoint } from "@api";
import { StatusBlog, Tag } from "@constant/enum";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface GetBlogProps {
  pageIndex: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortBydate?: string;
  tags?: Tag[];
  skip?: number;
  status?: string;
}

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

export interface BlogCreateProps {
  id?: string;
  title: string;
  content: string;
  tags: Tag[];
  status: StatusBlog;
  thumbnailUrl: string;
  author: string;
  metaTitle: string;
  metaDescription: string;
  slug?: string;
  publicDate?: string;
  gameIds?: number[];
}

export const CreateBlog = createAsyncThunk(
  "post/create-blog",
  async (body: BlogCreateProps) => {
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
  async (body: BlogCreateProps) => {
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
