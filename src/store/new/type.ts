import {
  AddedDateSort,
  SortBy,
  StatusBlog,
  Tag,
  TypeBlog,
} from "@constant/enum";
import { GameItems } from "@store/game/type";

export interface BlogItem {
  id: string; //
  title: string; //
  content: string; //
  slug: string; //
  thumbnailUrl: string; //
  type: TypeBlog; //
  publicDate: string; //
  status: number; //
  tags: Tag[]; //
  author: string; //
  metaTitle: string; //
  metaDescription: string; //
  game?: GameItems[];
  gameIds: number[]; //
  createAt?: string;
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
  error: string | null;
  blog: Blog;
  blogId: BlogItem;
  blogSponsored: Blog;
  isCreate: boolean;
  isUpdate: boolean;
  isDelete: boolean;
  checkDate: AddedDateSort;
  tags: Tag[];
  sortBy: SortBy;
  search: string;
  status: StatusBlog;
}

export interface BlogRequestState {
  id?: string;
  title: string;
  content: string;
  tags: Tag[];
  status: number;
  thumbnailUrl: string;
  author: string;
  metaTitle: string;
  metaDescription: string;
  gameIds: number[];
  type: TypeBlog;
  publicDate?: string;
  slug?: string;
}
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
