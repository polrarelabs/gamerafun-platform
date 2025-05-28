"use client";
import Latest from "@components/Latest";
import { Text } from "@components/shared";
import CardItem from "@components/shared/CardItem";
import { GAME_PATH, NEWS_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { useParams, useRouter } from "next/navigation";
import { palette } from "public/material";
import { memo, useEffect } from "react";

interface RelatedProps {
  relateBy: string;
  isSmaller?: boolean;
  title: string;
  isViewAll?: boolean;
}

const Related = ({ relateBy, title, isViewAll = true }: RelatedProps) => {
  const router = useRouter();

  const { blogId, blog, getBlog, getBlogId } = useBlog();

  const { game, getGame } = useGame();
  const param = useParams();

  const handleClick = (id: string) => {
    getBlogId(id);
    router.push(`${NEWS_PATH}/${id}`);
  };

  useEffect(() => {
    getGame({ pageIndex: 1, pageSize: 10 });
  }, []);

  useEffect(() => {
    getBlog({
      tags: blogId.tags,
      pageIndex: 1,
      pageSize: 10,
    });
  }, [blogId.tags]);

  // useEffect(() => {
  //   console.log("game", game);
  //   console.log("news", blog.items);
  // }, [game, blog.items]);

  const handleViewAll = () => {
    if (relateBy === "game") return router.push(GAME_PATH);
    else return router.push(NEWS_PATH);
  };

  return (
    <>
      {relateBy === "game" ? (
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
          {game && game.items && (
            <Stack direction={"column"} gap={2}>
              {game.items.map((item, index) => {
                return (
                  <CardItem
                    key={index}
                    data={item}
                    index={index}
                    displayLayout={"no-list"}
                    // handleClick={handleClick}
                    isSmaller={true}
                    isHover={true}
                    widthMax={323}
                    title="title"
                  />
                );
              })}
            </Stack>
          )}
        </Stack>
      ) : (
        <Latest
          title="Related News"
          path={NEWS_PATH}
          isPadding={false}
          type="new"
        />
      )}
    </>
  );
};

export default memo(Related);
