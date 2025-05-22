/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddedDateSort, SortBy, StatusBlog, Tag } from "@constant/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateBlog,
  DeleteBlog,
  GetBlog,
  GetBlogId,
  UpdateBlog,
} from "./action";

interface MediaProp {
  id: number;
  type: string;
  url: string;
  blogId: number;
  createAt: string;
  createBy: string;
  updateBy: string;
}

export interface BlogItem {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  slug: string;
  media: MediaProp[];
  status: StatusBlog;
  tags: Tag[];
  publicDate: string;
  createAt: string;
  createBy: string;
  updateBy: string;
  updateAt: string;
}

export interface Blog {
  items: BlogItem[];
  totalItems: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}

export interface BlogState {
  loading: boolean;
  error: string;
  blog: Blog;
  blogId: BlogItem;
  isCreate: boolean;
  isUpdate: boolean;
  isDelete: boolean;
  checkDate: AddedDateSort;
  tags: Tag[];
  sortBy: SortBy;
  search: string;
  status: StatusBlog;
}

const initialState: BlogState = {
  loading: false,
  error: "",
  blog: {
    items: [],
    totalItems: 0,
    pageIndex: 1,
    pageSize: 10,
    totalPages: 0,
  },
  blogId: {} as BlogItem,
  isCreate: false,
  isUpdate: false,
  isDelete: false,
  checkDate: AddedDateSort.AllTime,
  tags: [],
  sortBy: SortBy.Newest,
  search: "",
  status: "" as StatusBlog,
};

const BlogReducer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    SetIsCreateBlog: (state, action: PayloadAction<boolean>) => {
      state.isCreate = action.payload;
    },
    SetIsUpdateBlog: (state, action: PayloadAction<boolean>) => {
      state.isUpdate = action.payload;
    },
    SetIsDeleteBlog: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },
    SetCheckDate: (state, action: PayloadAction<AddedDateSort>) => {
      state.checkDate = action.payload;
    },
    SetTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    SetPageIndex: (state, action: PayloadAction<number>) => {
      state.blog.pageIndex = action.payload;
    },
    SetSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    SetSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    SetStatus: (state, action: PayloadAction<StatusBlog>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(GetBlog.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "";
      })
      .addCase(GetBlogId.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        GetBlogId.fulfilled,
        (state, action: PayloadAction<BlogItem>) => {
          state.loading = false;
          state.blogId = action.payload;
        },
      )
      .addCase(GetBlogId.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "";
      })
      .addCase(CreateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateBlog.fulfilled, (state) => {
        state.loading = false;
        state.isCreate = true;
      })
      .addCase(CreateBlog.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "";
      })
      .addCase(UpdateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateBlog.fulfilled, (state) => {
        state.loading = false;
        state.isCreate = true;
      })
      .addCase(UpdateBlog.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "";
      })
      .addCase(DeleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteBlog.fulfilled, (state) => {
        state.loading = false;
        state.isCreate = true;
      })
      .addCase(DeleteBlog.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "";
      });
  },
});

export default BlogReducer.reducer;

export const {
  SetIsCreateBlog,
  SetIsUpdateBlog,
  SetIsDeleteBlog,
  SetCheckDate,
  SetTags,
  SetPageIndex,
  SetSortBy,
  SetSearch,
  SetStatus,
} = BlogReducer.actions;
