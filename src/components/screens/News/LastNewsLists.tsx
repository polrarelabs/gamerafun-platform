/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getSort } from "@components/helper";
import Selected from "@components/Selected";
import { SelectOptions, Text } from "@components/shared";
import ButtonFillters from "@components/shared/ButtonFillters";
import { SortBy } from "@constant/enum";
import { NEWS_PATH } from "@constant/paths";
import { SelectChangeEvent, Stack } from "@mui/material";
import { useBlog } from "@store/new";
import { useRouter } from "next/navigation";
import { palette } from "public/material";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { CardBlog } from "./components";
import { BlogItem } from "@store/new/type";

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
  // const [hover, setHover] = useState<boolean>(false);
  // const [id, setId] = useState<number | null>(null);

  const {
    getBlogId,
    blog,
    getBlog,
    tags,
    setPageIndex,
    sortBy,
    setSortBy,
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
      // sortBydate: checkDate,
    });
  }, [blog.pageIndex, tags, sortBy, search, checkDate]);

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SortBy);
  };
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
    } else setBlogFake(blog.items);
  }, [blog.items]);

  useEffect(() => {
    if (blogFake !== blog.items) {
      setBlogDisplay([...blogDisplay, ...blogFake]);
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
    <Stack flex={5} direction={"column"} gap={4}>
      <Stack>
        <Text color={palette.textWhite} fontWeight={700} fontSize={"31px"}>
          Latest News
        </Text>
      </Stack>
      {!isLayoutMD && (
        <Stack
          alignItems={"center"}
          gap={2}
          height={"100%"}
          display={"grid"}
          gridTemplateColumns={"repeat(2,1fr)"}
        >
          <SelectOptions
            selected={sortBy}
            options={Object.keys(SortBy)}
            setSelected={setSortBy}
            getSort={getSort}
          />

          <ButtonFillters handleOpen={handleOpen} />
        </Stack>
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
        gap={4}
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
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default memo(LastNewsLists);
