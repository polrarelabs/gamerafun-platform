import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  CreateBlog,
  BlogCreateProps,
  DeleteBlog,
  GetBlog,
  GetBlogId,
  GetBlogProps,
  UpdateBlog,
} from "./action";
import {
  SetCheckDate,
  SetIsCreateBlog,
  SetIsDeleteBlog,
  SetIsUpdateBlog,
  SetPageIndex,
  SetSearch,
  SetSortBy,
  SetStatus,
  SetTags,
} from "./reducer";
import { AddedDateSort, SortBy, StatusBlog, Tag } from "@constant/enum";

export const useBlog = () => {
  const dispatch = useAppDispatch();

  const getBlog = (param: GetBlogProps) => {
    dispatch(GetBlog(param));
  };

  const getBlogId = (blogId: string) => {
    dispatch(GetBlogId(blogId));
  };

  const createBlog = (body: BlogCreateProps) => {
    dispatch(CreateBlog(body));
  };

  const updateBlog = (body: BlogCreateProps) => {
    dispatch(UpdateBlog(body));
  };

  const deleteBlog = (blogId: number) => {
    dispatch(DeleteBlog(blogId));
  };

  const setIsCreateBlog = (value: boolean) => {
    dispatch(SetIsCreateBlog(value));
  };
  const setIsUpdateBlog = (value: boolean) => {
    dispatch(SetIsUpdateBlog(value));
  };
  const setIsDeleteBlog = (value: boolean) => {
    dispatch(SetIsDeleteBlog(value));
  };

  const setCheckDate = (value: AddedDateSort) => {
    dispatch(SetCheckDate(value));
  };

  const setTags = (value: Tag[]) => {
    dispatch(SetTags(value));
  };

  const setPageIndex = (value: number) => {
    dispatch(SetPageIndex(value));
  };

  const setSortBy = (value: SortBy) => {
    dispatch(SetSortBy(value));
  };

  const setSearch = (value: string) => {
    dispatch(SetSearch(value));
  };

  const setStatus = (value: StatusBlog) => {
    dispatch(SetStatus(value));
  };

  const {
    loading,
    error,
    blog,
    blogId,
    isCreate,
    isUpdate,
    isDelete,
    checkDate,
    tags,
    sortBy,
    search,
    status,
  } = useAppSelector((state) => state.blog);

  return {
    sortBy,
    setSortBy,
    getBlog,
    loading,
    error,
    blog,
    blogId,
    getBlogId,
    isCreate,
    isUpdate,
    isDelete,
    setIsCreateBlog,
    setIsUpdateBlog,
    setIsDeleteBlog,
    updateBlog,
    createBlog,
    deleteBlog,
    setCheckDate,
    checkDate,
    setTags,
    tags,
    setPageIndex,
    setSearch,
    search,
    setStatus,
    status,
  };
};
