/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Latest from "@components/Latest";
import { Text } from "@components/shared";
import CardItem from "@components/shared/CardItem";
import { GAME_PATH, NEWS_PATH } from "@constant/paths";
import ArrowIcon from "@icons/common/ArrowIcon";
import ArrowLongIcon from "@icons/common/ArrowLongIcon";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { useParams, useRouter } from "next/navigation";
import { palette } from "public/material";
import { memo, useEffect, useState } from "react";

interface RelatedProps {
  relateBy: string;
  isSmaller?: boolean;
  title: string;
  isViewAll?: boolean;
  dataGame?: any[];
}

const Related = ({
  relateBy,
  title,
  isViewAll = true,
  dataGame,
}: RelatedProps) => {
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

  const [listGame, setListGame] = useState<any[]>([]);

  useEffect(() => {
    if (dataGame && dataGame.length > 0) setListGame(dataGame);
    else setListGame(game.items);
  }, []);

  const handleViewAll = () => {
    if (relateBy === "game") return router.push(GAME_PATH);
    else return router.push(NEWS_PATH);
  };
  const [hover, setHover] = useState<boolean>(false);
  return (
    <>
      {relateBy === "game" ? (
        <Stack direction={"column"} gap={2}>
          {listGame && (
            <>
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                <Text color={"white"} fontWeight={700} fontSize={"24px"}>
                  {title}
                </Text>
                {isViewAll && (
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
                )}
              </Stack>
              <Stack direction={"column"} gap={2} width={"100%"}>
                {listGame.map((item, index) => {
                  return (
                    <CardItem
                      key={index}
                      data={item}
                      index={index}
                      displayLayout={"no-list"}
                      isSmaller={true}
                      isHover={true}
                      widthMax={150}
                      title="title"
                    />
                  );
                })}
              </Stack>
            </>
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
