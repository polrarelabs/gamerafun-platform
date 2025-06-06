"use client";

import React, { memo, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { TabHeaders, TabItem } from "@components/shared/Tab";

interface NavBlogProps {
  data: TabItem[];
  handleClick: (id: string) => void;
  activeId?: string;
}

const NavigationBlog = ({ data, handleClick, activeId }: NavBlogProps) => {
  const [tabsList, setTablist] = useState<TabItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setTablist(data);
    }
  }, [data]);

  useEffect(() => {
    if (!activeId) return;
    const index = tabsList.findIndex((tab) => tab.id === activeId);
    if (index !== -1 && index !== selectedIndex) {
      setSelectedIndex(index);
    }
  }, [activeId, tabsList, selectedIndex]);

  const handleTabClick = (id: string) => {
    const index = tabsList.findIndex((tab) => tab.id === id);
    if (index !== -1) {
      setSelectedIndex(index);
      handleClick(id);
    }
  };

  return (
    <Stack>
      <TabHeaders
        tabs={tabsList}
        value={selectedIndex}
        handleClick={handleTabClick}
        orientation="vertical"
        tabIndicatorSx={{
          left: 0,
          right: "unset",
          width: "2px",
          height: "100%",
          backgroundColor: "#1976d2",
        }}
        sx={{
          alignItems: "start",
          whiteSpace: "nowrap",
        }}
      />
    </Stack>
  );
};

export default memo(NavigationBlog);
