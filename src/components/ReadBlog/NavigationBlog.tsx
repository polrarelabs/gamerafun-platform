"use client";

import React, { memo, useEffect, useState } from "react";
import { NavBlogProps } from "./type";
import { Stack } from "@mui/material";
import { TabHeaders, TabHeadersProps, TabItem } from "@components/shared/Tab";

const NavigationBlog = ({ data, handleClick }: NavBlogProps) => {
  const [tabsList, setTablist] = useState<TabItem[]>([]);

  useEffect(() => {
    if (data) {
      const arr: TabItem[] = [];
      for (const item of data) {
        arr.push({
          id: item.id,
          label: item.label,
        });
      }
      setTablist(arr);
    }
  }, [data]);

  return (
    <Stack>
      <TabHeaders
        tabs={tabsList}
        handleClick={handleClick}
        orientation="vertical"
        sx={{
          alignItems: "start",
          "& .MuiButtonBase-root": {
            whiteSpace: "none !important",
          },
        }}
      />
    </Stack>
  );
};

export default memo(NavigationBlog);
