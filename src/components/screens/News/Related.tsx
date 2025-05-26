"use client";
import { Text } from "@components/shared";
import CardItem from "@components/shared/CardItem";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { palette } from "public/material";
import React, { memo, useEffect } from "react";
import { CardBlog } from "./components";
import { useParams, useRouter } from "next/navigation";
import { GAME_PATH, NEWS_PATH } from "@constant/paths";

interface RelatedProps {
  relateBy: string;
  isSmaller?: boolean;
  title: string;
  isViewAll?: boolean;
}

const Related = ({ relateBy, title, isViewAll = true }: RelatedProps) => {
  const router = useRouter();

  const { blogId, blog, getBlog, getBlogId } = useBlog();

  const { dataListGame: game, fetchGetGame } = useGame();
  const param = useParams();

  const handleClick = (id: string) => {
    getBlogId(id);
    router.push(`${NEWS_PATH}/${id}`);
  };

  useEffect(() => {
    getBlog({
      tags: blogId.tags,
      pageIndex: 1,
      pageSize: 10,
    });
  }, [blogId.tags]);

  useEffect(() => {
    console.log("game", game);
    console.log("news", blog.items);
  }, [game, blog.items]);

  const handleViewAll = () => {
    if (relateBy === "game") return router.push(GAME_PATH);
    else return router.push(NEWS_PATH);
  };

  return (
    <Stack direction={"column"} gap={2}>
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <Text color={"white"} fontWeight={700} fontSize={"24px"}>
          {title}
        </Text>
        {isViewAll && (
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
          >
            View All
          </Text>
        )}
      </Stack>
      <Stack direction={relateBy === "game" ? "column" : "row"} gap={2}>
        {relateBy === "game" ? (
          <>
            {game &&
              game.map((item, index) => {
                return (
                  <CardItem
                    key={index}
                    isSmaller={true}
                    index={index}
                    data={item}
                    title="title"
                  />
                );
              })}
          </>
        ) : (
          <>
            {blog.items &&
              blog.items.map((item, index) => {
                const id = param.token as string;
                if (item.id !== id) {
                  return (
                    <CardBlog
                      key={index}
                      data={item}
                      index={index}
                      displayLayout={"no-list"}
                      handleClick={handleClick}
                    />
                  );
                }
              })}
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default memo(Related);
