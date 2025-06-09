"use client";

import { Slider, Text } from "@components/shared";
import { Tag } from "@constant/enum";
import { NEWS_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { useBlog } from "@store/new";
import { Blog, BlogItem, GetBlogProps } from "@store/new/type";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { CardBlog } from "../new-container";

interface LastNewSliderProps {
  title: string;
  tags: Tag;
  widthGame?: number | null;
  fetch?: (param: GetBlogProps) => void;
  data?: Blog;
}

const LastNewSlider = ({
  title,
  tags,
  widthGame = null,
  data,
  fetch,
}: LastNewSliderProps) => {
  const router = useRouter();

  const { getBlogId } = useBlog();

  useEffect(() => {
    if (fetch && data) {
      fetch({
        pageIndex: data.pageIndex,
        pageSize: data.pageSize,
        tags: [tags],
      });
    }
  }, [tags]);

  const [sponsore, setSponsore] = useState<BlogItem[]>([]);
  const [sponsoreFake, setSponsoreFake] = useState<BlogItem[]>([]);

  useEffect(() => {
    if (data) {
      if (data.pageIndex === 1) {
        setSponsore(data.items);
        setSponsoreFake(data.items);
      } else if (sponsoreFake !== data.items) {
        const arr: BlogItem[] = [...sponsore, ...data.items];
        setSponsore(arr);
        setSponsoreFake(data.items);
      }
    }
  }, [data]);

  const handleClickNew = (id: string) => {
    getBlogId(id);
    router.push(`${NEWS_PATH}/${id}`);
  };
  return (
    <Stack width={"100%"} gap={2} zIndex={3}>
      <Stack direction={"row"} gap={2} alignItems={"center"} zIndex={1}>
        <Text color={"white"} fontWeight={700} fontSize={"24px"}>
          {title}
        </Text>
      </Stack>
      <Stack py={1}>
        {sponsore && sponsore.length > 5 ? (
          <Slider
            itemWidth={widthGame ? widthGame : 350}
            step={16}
            iconWhite={true}
          >
            {sponsore.map((item, index) => {
              return (
                <CardBlog
                  key={index}
                  data={item}
                  index={index}
                  displayLayout={"no-list"}
                  handleClick={handleClickNew}
                  isHover={true}
                  widthMax={widthGame ? widthGame : 350}
                  isBg={true}
                />
              );
            })}
          </Slider>
        ) : (
          <Stack direction={"row"} gap={2}>
            {sponsore &&
              sponsore.map((item, index) => {
                return (
                  <CardBlog
                    isBg={true}
                    key={index}
                    data={item}
                    index={index}
                    displayLayout={"no-list"}
                    handleClick={handleClickNew}
                    isHover={true}
                    widthMax={widthGame ? widthGame : 350}
                  />
                );
              })}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default memo(LastNewSlider);
