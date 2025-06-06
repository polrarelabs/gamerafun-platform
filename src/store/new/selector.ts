import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  CreateBlog,
  DeleteBlog,
  GetBlog,
  GetBlogId,
  GetBlogSponsored,
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
  SetStatusAPI,
  SetTags,
} from "./reducer";
import { AddedDateSort, SortByBlog, StatusBlog, Tag } from "@constant/enum";
import { BlogRequestState, GetBlogProps } from "./type";

export const useBlog = () => {
  const dispatch = useAppDispatch();

  const getBlog = (param: GetBlogProps) => {
    dispatch(GetBlog(param));
  };

  const getBlogId = (blogId: string) => {
    dispatch(GetBlogId(blogId));
  };

  const createBlog = (body: BlogRequestState) => {
    dispatch(CreateBlog(body));
  };

  const updateBlog = (body: BlogRequestState) => {
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

  const setSortByBlog = (value: SortByBlog) => {
    dispatch(SetSortBy(value));
  };

  const setSearch = (value: string) => {
    dispatch(SetSearch(value));
  };

  const setStatus = (value: StatusBlog) => {
    dispatch(SetStatus(value));
  };

  const setStatusAPI = () => {
    dispatch(SetStatusAPI());
  };

  const getBlogSponsored = (param: GetBlogProps) => {
    dispatch(GetBlogSponsored(param));
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
    blogSponsored,
  } = useAppSelector((state) => state.blog);

  return {
    getBlogSponsored,
    blogSponsored,
    setStatusAPI,
    sortBy,
    setSortByBlog,
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
