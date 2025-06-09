/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import GroupButtonFillters from "@components/GroupButtonFillters";
import { getSortBlog } from "@components/helper";
import Selected from "@components/Selected";
import { Text } from "@components/shared";
import { SortByBlog } from "@constant/enum";
import { NEWS_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { useBlog } from "@store/new";
import { BlogItem } from "@store/new/type";
import { useRouter } from "next/navigation";
import { palette } from "public/material";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import CardBlog from "./CardBlog";

interface Props {
  isLayoutMD: boolean;
  theme: any | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayLayout: string;
  setDisplayLayout: React.Dispatch<React.SetStateAction<string>>;
}

const LastNewsLists = ({
  isLayoutMD,
  setOpen,
  displayLayout,
  setDisplayLayout,
}: Props) => {
  const {
    getBlogId,
    blog,
    getBlog,
    tags,
    setPageIndex,
    sortBy,
    setSortByBlog,
    search,
    checkDate,
  } = useBlog();

  useEffect(() => {
    getBlog({
      pageIndex: blog.pageIndex,
      pageSize: blog.pageSize,
      tags: tags,
      sortBy: sortBy,
      search: search === "" ? undefined : search,
    });
  }, [blog.pageIndex, tags, sortBy, search, checkDate]);

  useEffect(() => {
    if (isLayoutMD) setDisplayLayout("no-list");
    else setDisplayLayout("list");
  }, [isLayoutMD]);

  const handleOpen = () => {
    setOpen(true);
  };

  const router = useRouter();

  const handleClick = (id: string) => {
    getBlogId(id);
    router.push(`${NEWS_PATH}/${id}`);
  };

  const [blogDisplay, setBlogDisplay] = useState<BlogItem[]>([]);
  const [blogFake, setBlogFake] = useState<BlogItem[]>([]);

  useEffect(() => {
    if (blog.pageIndex === 1) {
      setBlogDisplay(blog.items);
    }
    setBlogFake(blog.items);
  }, [blog.items]);

  useEffect(() => {
    if (blogFake !== blogDisplay) {
      const arr: BlogItem[] = [...blogDisplay, ...blogFake];
      setBlogDisplay(arr);
      setBlogFake(arr);
    }
  }, [blogFake]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (blog.pageIndex < blog.totalPages) {
            const page = blog.pageIndex + 1;
            setPageIndex(page);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [blog.items],
  );

  return (
    <Stack flex={5} direction={"column"} gap={1}>
      <Stack>
        <Text color={palette.textWhite} fontWeight={700} fontSize={"31px"}>
          Latest News
        </Text>
      </Stack>
      {!isLayoutMD && (
        <GroupButtonFillters
          sortBy={sortBy}
          setSelected={setSortByBlog}
          options={Object.keys(SortByBlog)}
          getSort={getSortBlog}
          handleOpen={handleOpen}
        />
      )}
      <Selected />
      <Stack
        display={"grid"}
        gridTemplateColumns={{
          xl: displayLayout === "list" ? "repeat(1,1fr)" : "repeat(4,1fr)",
          lg: displayLayout === "list" ? "repeat(1,1fr)" : "repeat(3,1fr)",
          md: displayLayout === "list" ? "repeat(1,1fr)" : "repeat(2,1fr)",
          xs: displayLayout === "list" ? "repeat(1,1fr)" : "repeat(1,1fr)",
        }}
        gap={2}
      >
        {blogDisplay.map((item, index) => {
          const isLast = index === blogDisplay.length - 1;
          return (
            <CardBlog
              ref={isLast ? lastElementRef : null}
              key={index}
              data={item}
              index={index}
              displayLayout={displayLayout}
              handleClick={handleClick}
              isBg={true}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default memo(LastNewsLists);
