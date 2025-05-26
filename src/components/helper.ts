import { AddedDateSort, SortBy, StatusBlog } from "@constant/enum";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";

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

export const getSort = (value: string) => {
  switch (value) {
    case SortBy.AZ:
      return "A-Z";
    case SortBy.TopRated:
      return "Top Rated";
    case SortBy.Oldest:
      return "Oldest";
    case SortBy.Newest:
      return "Newest";
    default:
      return "Z-A";
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
