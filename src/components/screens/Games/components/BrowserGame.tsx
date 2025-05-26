/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Selected from "@components/Selected";
import { SelectOptions, Text } from "@components/shared";
import ButtonFillters from "@components/shared/ButtonFillters";
import CardItem from "@components/shared/CardItem";
import GameIcon from "@icons/web3/GameIcon";
import { SelectChangeEvent, Stack, useMediaQuery } from "@mui/material";
import { useGame } from "@store/game";
import { palette } from "public/material";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { ACCESSTOKEN_COOKIE } from "@constant";
import { useRouter } from "next/navigation";
import { GAME_PATH, LOGIN_PATH } from "@constant/paths";
import { useBlog } from "@store/new";
import { SortBy } from "@constant/enum";
import { getSort } from "@components/helper";
import useBreakpoint from "@hooks/useBreakpoint";
interface Props {
  isLayoutMD: boolean;
  theme: any | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayLayout: string;
  setDisplayLayout: React.Dispatch<React.SetStateAction<string>>;
}

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//   return {
//     fontWeight: personName.includes(name)
//       ? theme.typography.fontWeightMedium
//       : theme.typography.fontWeightRegular,
//   };
// }

const BrowserGame = ({
  isLayoutMD,
  theme,
  setOpen,
  displayLayout,
  setDisplayLayout,
}: Props) => {
  const {
    dataListGame: data,
    fetchGetGame,
    genres,
    platforms,
    getGameId,
    minRating,
    maxRating,
    sortBy,
    setSortBy,
    search,
  } = useGame();
  const { checkDate } = useBlog();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const { isSmSmaller } = useBreakpoint();
  const router = useRouter();

  useEffect(() => {
    fetchGetGame({
      genre: genres,
      platform: platforms,
      minRating: minRating === 0 ? undefined : minRating,
      maxRating: maxRating === 0 ? undefined : maxRating,
      addedDateSort: checkDate,
      sortBy: sortBy,
      search: search === "" ? undefined : search,
    });
  }, [genres, platforms, minRating, maxRating, checkDate, sortBy, search]);

  useEffect(() => {
    if (isSm) setDisplayLayout("no-list");
    else setDisplayLayout("list");
  }, [isSm]);

  const handleOpen = () => {
    setOpen(true);
  };

  // const handleClick = (id: number) => {
  //   const cookie = Cookies.get(ACCESSTOKEN_COOKIE)
  //   if (cookie && cookie !== 'undefined') {
  //     getGameId(id)
  //     router.push(`${GAME_PATH}/${id}`)
  //   } else {
  //     router.push(LOGIN_PATH)
  //   }
  // }

  //  const [blogDisplay, setBlogDisplay] = useState<BlogItem[]>([])
  //   const [blogFake, setBlogFake] = useState<BlogItem[]>([])

  //   useEffect(() => {
  //     if (blog.pageIndex === 1) {
  //       setBlogDisplay(blog.items)
  //     } else setBlogFake(blog.items)
  //   }, [blog.items])

  //   useEffect(() => {
  //     if (blogFake !== blog.items) {
  //       setBlogDisplay([...blogDisplay, ...blogFake])
  //     }

  //   }, [blogFake])

  // const observer = useRef<IntersectionObserver | null>(null);
  // const lastElementRef = useCallback(
  //   (node: HTMLDivElement | null) => {
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         // if (blog.pageIndex < blog.totalPages) {
  //           // const page = blog.pageIndex + 1
  //           // setPageIndex(page)
  //         // }
  //       }
  //     });

  //     if (node) observer.current.observe(node);
  //   },
  //   [blog.items]
  // );

  return (
    <>
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
              <Text
                color={palette.colorGray}
                fontSize={"14px"}
                fontWeight={400}
              >
                {data.length} results
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
          gap={2}
        >
          {data.map((item, index) => {
            // const isLast = index === blogDisplay.length - 1;
            return (
              <CardItem
                // ref={isLast ? lastElementRef : null}
                isSmaller={isSmSmaller}
                key={index}
                index={index}
                data={item}
                title={"Title"}
              />
            );
          })}
        </Stack>
      </Stack>
    </>
  );
};

export default memo(BrowserGame);
