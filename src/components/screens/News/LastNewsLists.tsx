/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SelectOptions, Text } from "@components/shared";
import { SelectChangeEvent, Stack } from "@mui/material";
import img from "public/images/img-logo.png";
import { palette } from "public/material";
import React, { memo, useEffect, useState } from "react";
import ButtonFillters from "@components/shared/ButtonFillters";
import { CardBlog } from "./components";
import { useBlog } from "@store/new";
import { useRouter } from "next/navigation";
import { GENRES_PATH, NEWS_PATH } from "@constant/paths";

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
  const [hover, setHover] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

  const { getBlogId, blog, getBlog } = useBlog();

  useEffect(() => {
    getBlog({ pageIndex: blog.pageIndex, pageSize: blog.pageSize });
  }, [blog.pageIndex]);

  const names = ["OptionSelect1", "OptionSelect2", "OptionSelect3"];

  const [selected, setSelected] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };
  useEffect(() => {
    if (isLayoutMD) setDisplayLayout("no-list");
    else setDisplayLayout("list");
  }, [isLayoutMD]);

  const handleOpen = () => {
    setOpen(true);
  };

  const router = useRouter();

  const handleClick = (id: number) => {
    console.log("click r", `${NEWS_PATH}/${id}`);

    getBlogId(id);
    router.push(`${NEWS_PATH}/${id}`);
  };

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
            selected={selected}
            handleChange={handleChange}
            options={names}
          />

          <ButtonFillters handleOpen={handleOpen} />
        </Stack>
      )}
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
        {blog.items.map((item, index) => {
          return (
            <CardBlog
              key={index}
              hover={hover}
              setHover={setHover}
              img={img}
              setId={setId}
              data={item}
              index={index}
              id={id}
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
