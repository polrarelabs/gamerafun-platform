import { AddedDateSort, SortBy, StatusBlog, Tag } from "@constant/enum";
import { GameItems } from "@store/game/type";

export interface BlogItem {
  id: string;
  title: string;
  content: string;
  slug: string;
  thumbnailUrl: string;
  publicDate: string;
  status: StatusBlog;
  tags: Tag[];
  author: string;
  metaTitle: string;
  metaDescription: string;
  game: GameItems[];
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
