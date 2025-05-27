"use client";

import { Guides, News, Overview, Review } from "@components/screens/Games";
import { Image } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { TabContents, TabHeaders, useCustomTabs } from "@components/shared/Tab";
import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import bgSlider from "public/images/banner.webp";
import { useEffect } from "react";

import { AddedDateSort, SortBy } from "@constant/enum";
import { GAME_PATH, HOME_PATH } from "@constant/paths";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";

const LayoutGameDetail = () => {
  const { id } = useParams();
  const {
    setMinRating,
    setMaxRating,
    SetPlatforms,
    SetGenres,
    getGameById,
    gameById,
    setSearch: searchGame,
    setSortBy: sortGame,
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
  const tabItems = [
    { label: "Overview", content: <Overview /> },
    { label: "Review", content: <Review /> },
    { label: "Guides", content: <Guides /> },
    { label: "News", content: <News /> },
    { label: "Analysis", content: <div>Analysis</div>, disabled: true },
    { label: "Live Stream", content: <div>Live Stream</div> },
    { label: "Community", content: <div>Community</div> },
    { label: "User Reviews", content: <div>User Reviews</div> },
  ];
  const { value, handleChange } = useCustomTabs();

  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: HOME_PATH,
      title: "HOME",
    },
    {
      href: GAME_PATH,
      title: "Games",
    },
    {
      title: gameById.name,
    },
  ];

  return (
    <>
      <Stack>
        <Box position="relative" width="100%">
          <Image
            src={bgSlider}
            alt={`img - ${bgSlider}`}
            size="100%"
            width={"100%"}
            height={"300px"}
            containerProps={{
              sx: {
                borderRadius: "10px",
                overflow: "hidden",
              },
            }}
          />
          <Stack p={8} position="absolute" top={"275px"} left={0}>
            <Breadcumbs breadcumbs={breadcrumbs} />
            <Typography color="text.while">OverView</Typography>
            <h1>{gameById.name}</h1>
            <TabHeaders
              tabs={tabItems}
              value={value}
              handleChange={handleChange}
            />
          </Stack>
        </Box>
        <Box px={8}>
          <TabContents tabs={tabItems} value={value} />
        </Box>
      </Stack>
    </>
  );
};

export default LayoutGameDetail;
