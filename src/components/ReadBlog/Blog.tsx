"use client";

import { TabItem } from "@components/shared/Tab";
import { Stack } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import NavigationBlog from "./NavigationBlog";
import { BlogProps } from "./type";

const Blog = ({ content }: BlogProps) => {
  const blogRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<TabItem[]>([]);

  useEffect(() => {
    if (blogRef.current) {
      const nodeHeadings = blogRef.current.querySelectorAll("h2");
      const extracted: TabItem[] = [];
      nodeHeadings.forEach((el) => {
        extracted.push({
          id: el.id,
          label: el.textContent || "",
        });
      });
      setHeadings(extracted);
    }
  }, [content]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      gap={4}
      position={"relative"}
    >
      <Stack
        flex={2}
        sx={{
          position: "sticky",
          top: 80,
          height: "fit-content",
          alignSelf: "flex-start",
        }}
      >
        <NavigationBlog data={headings} handleClick={scrollToHeading} />
      </Stack>
      <Stack flex={5} ref={blogRef}>
        <Stack dangerouslySetInnerHTML={{ __html: content }} />
      </Stack>
    </Stack>
  );
};

export default memo(Blog);
