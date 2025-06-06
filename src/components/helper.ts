import {
  AddedDateSort,
  SortByGame,
  SortByBlog,
  StatusBlog,
} from "@constant/enum";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import { StaticImageData } from "next/image";

dayjs.extend(advancedFormat);

export const getDateSort = (value: string) => {
  switch (value) {
    case AddedDateSort.AllTime:
      return "All Time";
    case AddedDateSort.Days7:
      return "Last 7 days";
    case AddedDateSort.Days30:
      return "Last 30 days";
    case AddedDateSort.Months6:
      return "Last 6 months";
    default:
      return "Last 12 months";
  }
};

export const getSortGame = (value: string) => {
  switch (value) {
    case SortByGame.AZ:
      return "A-Z";
    case SortByGame.TopRated:
      return "Top Rated";
    case SortByGame.Oldest:
      return "Oldest";
    case SortByGame.Newest:
      return "Newest";
    default:
      return "Z-A";
  }
};

export const getSortBlog = (value: string) => {
  switch (value) {
    case SortByBlog.AZ:
      return "A-Z";
    case SortByBlog.Oldest:
      return "Oldest";
    default:
      return "Newest";
  }
};

export const getStatus = (value: string) => {
  switch (value) {
    case StatusBlog.DRAFT:
      return "draft";
    default:
      return "published";
  }
};

export const formatMMMMDoYYYY = (value: string) => {
  return dayjs(value).format("MMMM Do YYYY");
};

export const getImageSrc = (url: string, img: StaticImageData) => {
  if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
    return url;
  }
  return img;
};
