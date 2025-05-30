/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { getSort } from "@components/helper";
import Selected from "@components/Selected";
import { SelectOptions, Text } from "@components/shared";
import ButtonFillters from "@components/shared/ButtonFillters";
import CardItem from "@components/shared/CardItem";
import { SortBy } from "@constant/enum";
import useBreakpoint from "@hooks/useBreakpoint";
import GameIcon from "@icons/web3/GameIcon";
import { Stack, useMediaQuery } from "@mui/material";
import { useGame } from "@store/game";
import { GameItems } from "@store/game/type";
import { useBlog } from "@store/new";
import { palette } from "public/material";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { ACCESSTOKEN_COOKIE } from "@constant";
import { GAME_PATH, LOGIN_PATH } from "@constant/paths";
import { useRouter } from "next/navigation";

interface Props {
  isLayoutMD: boolean;
  theme: any | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayLayout: string;
  setDisplayLayout: React.Dispatch<React.SetStateAction<string>>;
}

const BrowserGame = ({
  isLayoutMD,
  theme,
  setOpen,
  setDisplayLayout,
}: Props) => {
  const {
    game,
    getGame,
    genres,
    sortBy,
    setSortBy,
    search,
    pageIndex,
    pageSize,
    setPageIndex,
    getGameById,
    platforms,
  } = useGame();
  const { checkDate } = useBlog();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const { isSmSmaller } = useBreakpoint();

  const router = useRouter();

  useEffect(() => {
    getGame({
      pageIndex: pageIndex,
      pageSize: pageSize,
      genre: genres,
      addedDateSort: checkDate,
      sortBy: sortBy,
      search: search === "" ? undefined : search,
      platform: platforms,
    });
  }, [genres, checkDate, sortBy, search, pageIndex, pageSize, platforms]);

  useEffect(() => {
    if (isSm) setDisplayLayout("no-list");
    else setDisplayLayout("list");
  }, [isSm]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = (id: number) => {
    const cookie = Cookies.get(ACCESSTOKEN_COOKIE);
    if (cookie && cookie !== "undefined") {
      getGameById(id);
      router.push(`${GAME_PATH}/${id}`);
    } else {
      router.push(LOGIN_PATH);
    }
  };

  const [gameDisplay, setGameDisplay] = useState<GameItems[]>([]);
  const [gameFake, setGameFake] = useState<GameItems[]>([]);

  useEffect(() => {
    if (game.pageIndex === 1) {
      setGameDisplay(game.items);
    } else setGameFake(game.items);
  }, [game.items]);

  useEffect(() => {
    if (gameFake !== game.items) {
      setGameDisplay([...gameDisplay, ...gameFake]);
    }
  }, [gameFake]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (game.pageIndex < game.totalPages) {
            const page = game.pageIndex + 1;
            setPageIndex(page);
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [game.items],
  );

  return (
    <Stack direction={"column"} gap={2} flex={{ lg: 5, xs: 4 }}>
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <GameIcon sx={{ color: palette.colorGray }} />
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Stack direction={"row"} alignItems={"end"} gap={2}>
            <Text color="white" fontSize={"20px"} fontWeight={700}>
              Browse Games
            </Text>
            <Text color={palette.colorGray} fontSize={"14px"} fontWeight={400}>
              {game.totalItems} results
            </Text>
          </Stack>

          <Stack>
            <SelectOptions
              selected={sortBy}
              setSelected={setSortBy}
              options={Object.keys(SortBy)}
              getSort={getSort}
            />
          </Stack>
        </Stack>
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
            setSelected={setSortBy}
            options={Object.keys(SortBy)}
            getSort={getSort}
          />

          <ButtonFillters handleOpen={handleOpen} />
        </Stack>
      )}
      <Selected />
      <Stack
        display={"grid"}
        gridTemplateColumns={{
          xl: "repeat(6, 1fr)",
          lg: "repeat(4, 1fr)",
          sm: "repeat(2, 1fr)",
        }}
        gap={2.5}
      >
        {gameDisplay &&
          gameDisplay.map((item, index) => {
            const isLast = index === gameDisplay.length - 1;
            return (
              <CardItem
                ref={isLast ? lastElementRef : null}
                isSmaller={isSmSmaller}
                key={index}
                index={index}
                data={item}
                title={"Title"}
                handleClick={handleClick}
              />
            );
          })}
      </Stack>
    </Stack>
  );
};

export default memo(BrowserGame);
