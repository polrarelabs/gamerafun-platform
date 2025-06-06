import {
  Genre,
  OwnerStatus,
  Platform,
  ScheduleStatus,
  SupportChain,
  SupportOs,
} from "@constant/enum";
import { BlogItem } from "@store/new/type";

// game

export interface ScheduleProps {
  alpha: string;
  beta: string;
  release: string;
}

export interface PlatformLinkProps {
  [key: string]: string;
}

export interface RateProps {
  id?: number;
  gameId: number;
  score: number;
  review: string;
  createdAt?: string;
  updatedAt?: string;
  ratedGameCountByUser?: number;
  isLike?: boolean;
  likeCount?: number;
  unLikeCount?: number;
}

export interface GameItems {
  id: number;
  name: string;
  description: string;
  status: number;
  publisher: string;
  developer: string;
  website: string;
  schedule: ScheduleProps;
  platformLink: PlatformLinkProps[];
  support_os: SupportOs[];
  chain: SupportChain[];
  rating: number;
  rates?: RateProps[];
  mediaUrl: string[];
  statusGame: ScheduleStatus;
  playableOnDesktop: boolean;
  review: string | null;
  discord: string;
  telegramChat: string;
  telegramNews: string;
  medium: string;
  twitter: string;
  youtube: string;
  genreName: Genre[];
  contactPhone: string;
  contactEmail: string;
  contactName: string;
  blogs: BlogItem[];
}

export interface GameProps {
  items: GameItems[];
  totalPages: number;
  pageIndex: number;
  pageSize: number;
  totalItems: number;
}

export interface ParamsGameProps {
  pageIndex: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  addedDateSort?: string;
  minRating?: number;
  maxRating?: number;
  genres?: string[];
  platform?: string[];
  statusGame?: ScheduleStatus[];
  playableOnDesktop?: boolean;
  skip?: number;
}

// create game

export interface FormCreateGameProps {
  id?: number;
  name: string; //
  description: string; //
  status: number; //
  website: string; //
  publisher: string; //
  developer: string; //
  schedule: ScheduleProps; //
  support_os: SupportOs[];
  chain: SupportChain[];
  platformLink: PlatformLinkProps[];
  mediaUrl: string[];
  playableOnDesktop: boolean;
  genreName: string[];
  statusGame: ScheduleStatus;
  discord: string;
  telegramChat: string;
  telegramNews: string;
  medium: string;
  twitter: string;
  youtube: string;
  contactPhone: string;
  contactEmail: string;
  contactName: string;
}

export interface GameDProps {
  gameId: number;
}

export interface GenresCProps {
  id?: number;
  name: string;
  shortDescription?: string;
  media: string;
}
export interface GenresDProps {
  genreId: number;
}
export interface OwnerReviewProps {
  name: string;
  shortDescription: string;
  content: string;
  advantage: string;
  disadvantage: string;
  publicDate: string;
  gameId: number;
  status: OwnerStatus;
  id?: string;
}

export interface GenresItems {
  id: number;
  name: string;
  shortDescription: string;
  media: string;
  // createBy?: string;
  // updateBy?: string;
}

export interface GenresProps {
  seaerchName?: string[];
}

interface GameCountItems {
  [key: string]: number;
}

export interface GameCountProps {
  platform: Platform;
  genre: GameCountItems;
  chain: SupportChain;
  support_os: SupportOs;
  status: ScheduleStatus;
}

export interface GameBlogProps {
  gameId: number;
  typeBlog: string;
}

export interface GameBlogItems {
  id: number;
  name: string;
  description: string;
  status: number;
  publisher: string;
  developer: string;
  website: string;
  schedule: ScheduleProps;
  platformLink: PlatformLinkProps[];
  support_os: SupportOs[];
  chain: SupportChain[];
  rating: number;
  rates?: RateProps[];
  mediaUrl: string[];
  statusGame: ScheduleStatus;
  playableOnDesktop: boolean;
  review: string | null;
  discord: string;
  telegramChat: string;
  telegramNews: string;
  medium: string;
  twitter: string;
  youtube: string;
  genreName: Genre[];
  contactPhone: string;
  contactEmail: string;
  contactName: string;
  blogs: BlogItem[];
}
