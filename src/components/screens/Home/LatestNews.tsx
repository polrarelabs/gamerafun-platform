"use client";

import { Slider, Text } from "@components/shared";
import { Stack } from "@mui/material";
import { useBlog } from "@store/new";
import { palette } from "public/material";
import React, { memo, useEffect, useState } from "react";
import { CardBlog } from "../News/components";
import { NEWS_PATH } from "@constant/paths";
import { useRouter } from "next/navigation";
import { SCREEN_PX } from "@constant";
import ArrowLongIcon from "@icons/common/ArrowLongIcon";
import ArrowIcon from "@icons/common/ArrowIcon";

const LatestNews = () => {
  const { blog, getBlogId, getBlog } = useBlog();

  useEffect(() => {
    getBlog({ pageIndex: 1, pageSize: 11 });
  }, []);

  const router = useRouter();

  const handleClick = (id: string) => {
    getBlogId(id);
    router.push(`${NEWS_PATH}/${id}`);
  };

  const handleViewAll = () => {
    router.push(NEWS_PATH);
  };

  const [hover, setHover] = useState<boolean>(false);

  return (
    <Stack width={"100%"} px={SCREEN_PX} gap={2}>
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <Text color={"white"} fontWeight={700} fontSize={"24px"}>
          Latest News
        </Text>
        <Stack
          direction={"row"}
          alignItems={"center"}
          color={palette.greenColorText}
        >
          <Text
            fontSize={"14px"}
            fontWeight={500}
            color={palette.greenColorText}
            sx={{
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
            onClick={handleViewAll}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            View All
          </Text>
          {hover ? (
            <ArrowLongIcon
              sx={{
                rotate: "180deg",
              }}
            />
          ) : (
            <ArrowIcon
              sx={{
                fontSize: 15,
                rotate: "-90deg",
              }}
            />
          )}
        </Stack>
      </Stack>
      {blog.items && blog.items.length > 4 ? (
        <Slider itemWidth={323} step={16} iconWhite={true}>
          {blog.items &&
            blog.items.map((item, index) => {
              return (
                <CardBlog
                  key={index}
                  data={item}
                  index={index}
                  displayLayout={"no-list"}
                  handleClick={handleClick}
                  isHover={false}
                  widthMax={323}
                />
              );
            })}
        </Slider>
      ) : (
        <Stack
          display={"grid"}
          gridTemplateColumns={"repeat(5,1fr)"}
          gap={4}
          width={"100%"}
        >
          {blog.items &&
            blog.items.map((item, index) => {
              if (index < blog.items.length - 2) {
                return (
                  <CardBlog
                    key={index}
                    data={item}
                    index={index}
                    displayLayout={"no-list"}
                    handleClick={handleClick}
                    isHover={false}
                  />
                );
              }
            })}
        </Stack>
      )}
    </Stack>
  );
};

export default memo(LatestNews);
