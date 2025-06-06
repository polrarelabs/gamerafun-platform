"use client";

import { Slider, Text } from "@components/shared";
import CardItem from "@components/shared/CardItem";
import { SCREEN_PX } from "@constant";
import { Tag } from "@constant/enum";
import ArrowIcon from "@icons/common/ArrowIcon";
import ArrowLongIcon from "@icons/common/ArrowLongIcon";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { useQuest } from "@store/quests";
import { useRouter } from "next/navigation";
import { palette } from "public/material";
import { memo, useEffect, useState } from "react";
import { CardBlog } from "./screens/News/components";
import { CardQuest } from "./screens/Quests/components";
import useBreakpoint from "@hooks/useBreakpoint";

interface LatestProps {
  title: string;
  path?: string;
  isPadding?: boolean;
  type: string;
  isHome?: boolean;
  widthGame?: number | null;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  isReview?: boolean;
  tags?: Tag | null;
  isShow?: boolean;
  isStar?: boolean;
}

const Latest = ({
  title,
  path,
  isPadding = true,
  type,
  isHome = false,
  isReview = false,
  widthGame = null,
  direction = "row",
  tags = null,
  isShow = true,
  isStar = true,
}: LatestProps) => {
  const { blog, getBlogId, getBlog } = useBlog();
  const { game, getGame, getGameById } = useGame();
  const { quest, getQuest } = useQuest();

  const { isXsSmaller, isSmSmaller, isMdSmaller, isLgSmaller } =
    useBreakpoint();

  const SizeSliderGame = () => {
    if (isXsSmaller) return 2;
    if (isSmSmaller) return 3;
    if (isMdSmaller) return 5;
    return 8;
  };
  const SizeSliderBlog = () => {
    if (isSmSmaller) return 2;
    if (isMdSmaller) return 3;
    return 5;
  };

  const SizeSliderQuest = () => {
    if (isSmSmaller) return 2;
    if (isMdSmaller) return 3;
    return 4;
  };

  useEffect(() => {
    if (type === "new") {
      if (tags) {
        getBlog({ pageIndex: 1, pageSize: 11, tags: [tags] });
      } else getBlog({ pageIndex: 1, pageSize: 11 });
    } else if (type === "game") {
      getGame({ pageIndex: 1, pageSize: 11 });
    } else if (type === "quest") {
      getQuest({});
    }
  }, [tags]);

  const router = useRouter();

  const handleClickNew = (id: string) => {
    getBlogId(id);
    router.push(`${path}/${id}`);
  };

  const handleClickGame = (id: number) => {
    getGameById(id);
    router.push(`${path}/${id}`);
  };

  const handleViewAll = () => {
    if (path) router.push(path);
  };

  const [hover, setHover] = useState<boolean>(false);

  return (
    <Stack
      width={"100%"}
      px={isPadding ? SCREEN_PX : undefined}
      gap={2}
      zIndex={3}
    >
      <Stack direction={"row"} gap={2} alignItems={"center"} zIndex={1}>
        <Text color={"white"} fontWeight={700} fontSize={"24px"}>
          {title}
        </Text>
        {isShow && (
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
      {(type === "game" || type === "new") && (
        <Stack zIndex={2} py={1}>
          {type === "new" ? (
            <>
              {blog && blog.totalItems > SizeSliderBlog() ? (
                <Slider
                  itemWidth={widthGame ? widthGame : 350}
                  step={16}
                  // iconWhite={true}
                >
                  {blog &&
                    blog.items &&
                    blog.items.map((item, index) => {
                      return (
                        <CardBlog
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
                </Slider>
              ) : (
                <Stack direction={direction} gap={2}>
                  {blog &&
                    blog.items &&
                    blog.items.map((item, index) => {
                      return (
                        <CardBlog
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
            </>
          ) : (
            <>
              {game && game.totalItems > SizeSliderGame() ? (
                <Slider
                  itemWidth={widthGame ? widthGame : 350}
                  step={16}
                  // iconWhite={true}
                >
                  {game &&
                    game.items &&
                    game.items.map((item, index) => {
                      return (
                        <CardItem
                          key={index}
                          isSmaller={false}
                          index={index}
                          data={item}
                          title={"Title"}
                          handleClick={handleClickGame}
                          widthMax={widthGame ? widthGame : 350}
                          isHome={isHome}
                          isReview={isReview}
                          isStar={isStar}
                        />
                      );
                    })}
                </Slider>
              ) : (
                <Stack direction={direction} gap={2}>
                  {game &&
                    game.items &&
                    game.items.map((item, index) => {
                      return (
                        <CardItem
                          isSmaller={false}
                          key={index}
                          index={index}
                          data={item}
                          title={"Title"}
                          handleClick={handleClickGame}
                          widthMax={widthGame ? widthGame : 350}
                          isHome={isHome}
                          isReview={isReview}
                          isStar={isStar}
                        />
                      );
                    })}
                </Stack>
              )}
            </>
          )}
        </Stack>
      )}
      {type === "quest" && (
        <Stack zIndex={2} py={1}>
          {quest && quest.length > SizeSliderQuest() ? (
            <Slider
              itemWidth={widthGame ? widthGame : 350}
              step={16}
              // iconWhite={true}
            >
              {quest &&
                quest.map((item, index) => {
                  return (
                    <CardQuest
                      key={index}
                      data={item}
                      sx={{
                        border: `0.2px solid ${palette.colorReview?.colorBorder}`,
                        borderRadius: "16px",
                        padding: "4px",
                      }}
                      witdhMax={widthGame}
                    />
                  );
                })}
            </Slider>
          ) : (
            <Stack direction={direction} gap={2}>
              {quest &&
                quest.map((item, index) => {
                  return (
                    <CardQuest
                      key={index}
                      data={item}
                      sx={{
                        border: `0.2px solid ${palette.colorReview?.colorBorder}`,
                        borderRadius: "16px",
                        padding: "4px",
                      }}
                      witdhMax={widthGame}
                    />
                  );
                })}
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default memo(Latest);
