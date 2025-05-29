"use client";

import { ClickWrapper, Slider, Text } from "@components/shared";
import CardItem from "@components/shared/CardItem";
import { SCREEN_PX } from "@constant";
import { GAME_PATH, NEWS_PATH } from "@constant/paths";
import ArrowIcon from "@icons/common/ArrowIcon";
import ArrowLongIcon from "@icons/common/ArrowLongIcon";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { useRouter } from "next/navigation";
import { palette } from "public/material";
import { memo, useEffect, useState } from "react";
import { CardBlog } from "./screens/News/components";

interface LatestProps {
  title: string;
  path: string;
  isPadding?: boolean;
  type: string;
  isHome?: boolean;
  widthGame?: number | null;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
}

const Latest = ({
  title,
  path,
  isPadding = true,
  type,
  isHome = false,
  widthGame = null,
  direction = "row",
}: LatestProps) => {
  const { blog, getBlogId, getBlog } = useBlog();
  const { game, getGame, getGameById } = useGame();
  useEffect(() => {
    getBlog({ pageIndex: 1, pageSize: 11 });
    getGame({ pageIndex: 1, pageSize: 11 });
  }, []);

  const router = useRouter();

  const handleClickNew = (id: string) => {
    getBlogId(id);
    router.push(`${path}/${id}`);
  };

  const handleClickGame = (id: number) => {
    // const cookie = Cookies.get(ACCESSTOKEN_COOKIE)
    // if (cookie && cookie !== 'undefined') {
    getGameById(id);
    router.push(`${GAME_PATH}/${id}`);
    // } else {
    // router.push(LOGIN_PATH)
    // }
  };

  const handleViewAll = () => {
    router.push(NEWS_PATH);
  };

  const [hover, setHover] = useState<boolean>(false);

  return (
    <Stack width={"100%"} px={isPadding ? SCREEN_PX : undefined} gap={2}>
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <Text color={"white"} fontWeight={700} fontSize={"24px"}>
          {title}
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
      {type === "new" ? (
        <>
          {blog && blog.totalItems > 4 ? (
            <Slider
              itemWidth={widthGame ? widthGame : 350}
              step={16}
              iconWhite={true}
            >
              {blog &&
                blog.items &&
                blog.items.map((item, index) => {
                  return (
                    <ClickWrapper key={index}>
                      <CardBlog
                        data={item}
                        index={index}
                        displayLayout={"no-list"}
                        handleClick={handleClickNew}
                        isHover={false}
                        widthMax={widthGame ? widthGame : 350}
                      />
                    </ClickWrapper>
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
                      isHover={false}
                      widthMax={widthGame ? widthGame : 350}
                    />
                  );
                })}
            </Stack>
          )}
        </>
      ) : (
        <>
          {game && game.totalItems > 8 ? (
            <Slider
              itemWidth={widthGame ? widthGame : 350}
              step={16}
              iconWhite={true}
            >
              {game &&
                game.items &&
                game.items.map((item, index) => {
                  return (
                    <ClickWrapper key={index}>
                      <CardItem
                        isSmaller={false}
                        index={index}
                        data={item}
                        title={"Title"}
                        handleClick={handleClickGame}
                        widthMax={widthGame ? widthGame : 350}
                        isHome={isHome}
                      />
                    </ClickWrapper>
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
                    />
                  );
                })}
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};

export default memo(Latest);
