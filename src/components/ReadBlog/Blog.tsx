"use client";

import { TabItem } from "@components/shared/Tab";
import { Stack } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import NavigationBlog from "./NavigationBlog";
import RenderBlog from "./RenderBlog";

export interface BlogProps {
  content: string;
}

const Blog = ({ content }: BlogProps) => {
  const blogRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<TabItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (blogRef.current) {
      const nodeHeadings = blogRef.current.querySelectorAll("h2[id]");
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

  useEffect(() => {
    const handleScroll = () => {
      if (!blogRef.current) return;

      const headings = Array.from(
        blogRef.current.querySelectorAll("h2[id]"),
      ) as HTMLElement[];

      const scrollPosition = window.scrollY + 90;

      let currentId = "";
      for (let i = 0; i < headings.length; i++) {
        const headingTop = headings[i].offsetTop;
        if (headingTop <= scrollPosition) {
          currentId = headings[i].id;
        } else {
          break;
        }
      }
      if (currentId && currentId !== activeId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId]);

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
        <NavigationBlog
          data={headings}
          handleClick={scrollToHeading}
          activeId={activeId}
        />
      </Stack>
      <Stack flex={5} ref={blogRef}>
        <RenderBlog content={content} />
      </Stack>
    </Stack>
  );
};

export default memo(Blog);
