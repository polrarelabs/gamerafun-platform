"use client";

import {
  Guides,
  InfoOverview,
  News,
  Overview,
  Review,
  UserReviews,
} from "@components/screens/Games";
import { Image } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { TabContents, TabHeaders, useCustomTabs } from "@components/shared/Tab";
import { Stack } from "@mui/material";
import { useParams } from "next/navigation";
import bgSlider from "public/images/banner.webp";
import { useEffect } from "react";

import Latest from "@components/Latest";
import {
  FooterTabContants,
  GroupButtons,
} from "@components/screens/Games/components";
import { SCREEN_PX, SCREEN_PY } from "@constant";
import { AddedDateSort, SortBy } from "@constant/enum";
import { GAME_PATH } from "@constant/paths";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { palette } from "public/material";
import useBreakpoint from "@hooks/useBreakpoint";

const LayoutGameDetail = () => {
  const { id } = useParams();
  const {
    setMinRating,
    setMaxRating,
    SetPlatforms,
    SetGenres,
    getGameById,
    getGameBlog,
    gameById,
    setSearch: searchGame,
    setSortBy: sortGame,
    gameBlog,
  } = useGame();
  const { setTags, setCheckDate, setSortBy, setSearch } = useBlog();

  useEffect(() => {
    if (id) {
      const gameId = Array.isArray(id) ? Number(id[0]) : Number(id);
      getGameById(gameId);
    }
    setCheckDate(AddedDateSort.AllTime);
    SetPlatforms([]);
    setMaxRating(0);
    setMinRating(0);
    SetGenres([]);
    setTags([]);
    setSearch("");
    searchGame("");
    setSortBy(SortBy.Newest);
    sortGame(SortBy.Newest);
  }, [id]);

  // useEffect(() => {
  //   console.log("gameById", gameById);
  // }, [gameById]);

  const tabItems = [
    { label: "Overview", content: <Overview />, disabled: false },
    { label: "Review", content: <Review />, disabled: true },
    { label: "Guides", content: <Guides />, disabled: true },
    { label: "News", content: <News />, disabled: true },
    { label: "Analysis", content: <div>Analysis</div>, disabled: true },
    { label: "Live Stream", content: <div>Live Stream</div>, disabled: true },
    { label: "Community", content: <div>Community</div>, disabled: true },
    {
      label: "User Reviews",
      content: <UserReviews />,
      disabled: gameById.rates && gameById.rates.length > 0 ? false : true,
    },
  ];
  const { value, handleChange } = useCustomTabs();

  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: GAME_PATH,
      title: "Games",
    },
    {
      title: gameById.name,
    },
    {
      title: "OverView",
    },
  ];

  const param = useParams();

  useEffect(() => {
    getGameById(Number(param.slug));
    getGameBlog({ gameId: Number(param.slug), typeBlog: "overview" });
  }, [param.slug]);

  const { isLgSmaller, isXsSmaller } = useBreakpoint();

  return (
    <Stack direction={"column"} gap={2}>
      <Stack
        position="relative"
        width="100%"
        sx={{
          borderBottom: `1px solid ${palette.colorRelate?.colorBorderBottom}`,
        }}
      >
        <Stack
          position={"absolute"}
          top={0}
          left={0}
          width={"100%"}
          height={"100%"}
          zIndex={2}
          sx={{
            background: palette.colorRelate?.linearOverview,
            // opacity: 0.5,
          }}
        />
        <Stack
          position={"absolute"}
          top={0}
          left={0}
          width={"100%"}
          height={"100%"}
          zIndex={2}
          sx={{
            background: palette.colorRelate?.linearOverview1,
            // opacity: 0.5,
          }}
        />
        <Image
          src={
            gameById && gameById.mediaUrl && gameById.mediaUrl.length > 0
              ? gameById.mediaUrl[0]
              : bgSlider
          }
          alt={`img-${bgSlider}`}
          size="100%"
          aspectRatio={1905 / 450}
          sizes={`1920px`}
          containerProps={{
            sx: {
              width: `100%`,
              height: 450,
              overflow: "hidden",
              // opacity: ,
              border: "1px",
              "& img": {
                objectFit: "cover",
                objectPosition: "center",
              },
            },
          }}
        />
        {isXsSmaller && (
          <Stack
            position={"absolute"}
            top={0}
            left={0}
            px={SCREEN_PX}
            py={SCREEN_PY}
          >
            <Breadcumbs breadcumbs={breadcrumbs} />
          </Stack>
        )}
        <Stack
          position="absolute"
          bottom={0}
          left={0}
          px={SCREEN_PX}
          zIndex={2}
        >
          {!isXsSmaller && <Breadcumbs breadcumbs={breadcrumbs} />}
          <h1>{gameById.name}</h1>
          <TabHeaders
            tabs={tabItems}
            value={value}
            handleChange={handleChange}
          />
        </Stack>
      </Stack>
      <Stack px={SCREEN_PX} mt={4} direction={"row"} gap={6}>
        <Stack flex={6} gap={2}>
          {isLgSmaller && <GroupButtons />}
          <Stack width={"100%"}>
            <TabContents tabs={tabItems} value={value} />
          </Stack>
          <FooterTabContants />
          {isLgSmaller && <InfoOverview />}
        </Stack>
        {!isLgSmaller && (
          <Stack flex={2} position={"relative"}>
            <InfoOverview />
          </Stack>
        )}
      </Stack>
      <Stack my={8}>
        <Latest
          title="Related Games"
          path={GAME_PATH}
          type="game"
          widthGame={224}
          isReview={true}
          isStar={false}
        />
      </Stack>
    </Stack>
  );
};

export default LayoutGameDetail;
