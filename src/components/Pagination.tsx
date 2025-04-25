"use client";

import { memo } from "react";
import {
  Pagination as MuiPagination,
  PaginationProps as MuiPaginationProps,
  StackProps,
  paginationItemClasses,
} from "@mui/material";

export type PaginationProps = Omit<MuiPaginationProps, "count"> & {
  totalPages?: number;
  totalItems?: number;
  pageSize: number;
  onChangePage: (newPage: number) => void;
  containerProps?: StackProps;
};

const Pagination = (props: PaginationProps) => {
  const {
    totalPages,
    totalItems,
    pageSize,
    containerProps,
    sx,
    onChangePage,
    ...rest
  } = props;

  const onChange = (_, newPage: number) => {
    onChangePage(newPage);
  };

  if (!totalPages || !totalItems) return null;

  return (
    <MuiPagination
      count={totalPages}
      variant="outlined"
      shape="rounded"
      onChange={onChange}
      hidePrevButton={rest?.page === 1}
      hideNextButton={rest?.page === totalPages}
      sx={{
        [`& .${paginationItemClasses.root}`]: {
          fontSize: 16,
          fontWeight: 700,
          borderRadius: 2,
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "background.paper",
          height: 36,
          width: 36,
          color: "rgba(255, 255, 255, 0.5)",
        },
        [`& .${paginationItemClasses.selected}`]: {
          border: "1px solid",
          backgroundColor: "grey.A700",
          borderColor: "rgba(255, 255, 255, 0.6)",
          color: "common.white",
        },
        ...sx,
      }}
      {...rest}
    />
  );
};

export default memo(Pagination);
