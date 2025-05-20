import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  CreateBlog,
  CreateBlogProps,
  DeleteBlog,
  GetBlog,
  GetBlogId,
  GetBlogProps,
  UpdateBlog,
} from "./action";
import { SetIsCreateBlog, SetIsDeleteBlog, SetIsUpdateBlog } from "./reducer";

export const useGetBlog = () => {
  const dispatch = useAppDispatch();

  const getBlog = (param: GetBlogProps) => {
    dispatch(GetBlog(param));
  };

  const getBlogId = (blogId: number) => {
    dispatch(GetBlogId(blogId));
  };

  const createBlog = (body: CreateBlogProps) => {
    dispatch(CreateBlog(body));
  };

  const updateBlog = (body: CreateBlogProps) => {
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

  const {
    loading,
    error,
    dataBlog: blog,
    dataBlogId: blogId,
    isCreate,
    isUpdate,
    isDelete,
  } = useAppSelector((state) => state.blog);

  return {
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
  };
};
