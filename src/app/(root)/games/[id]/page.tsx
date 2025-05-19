"use client";

import { Breadcrumbs, Link, Stack, Typography, Box } from "@mui/material";
import { useGetGameId } from "@store/game";
import { Image } from "@components/shared";
import { useParams } from "next/navigation";
import { TabContents, TabHeaders, useCustomTabs } from "@components/shared/Tab";
import { useEffect } from "react";
import bgSlider from "public/images/banner.webp";
import { Guides, News, Overview, Review } from "@components/Games";
const LayoutGameDetail = () => {
  const { id } = useParams();
  const { getGameId, data } = useGetGameId();
  useEffect(() => {
    if (id) {
      const gameId = Array.isArray(id) ? Number(id[0]) : Number(id);
      getGameId(gameId);
    }
  }, [id]);
  console.log("data of game detail", data);
  console.log("id game", id);
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
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="white" href="/games">
                Games
              </Link>
              <Link underline="hover" color="white" href="/games/${data.id}">
                {data.name}
              </Link>
              <Typography color="text.while">OverView</Typography>
            </Breadcrumbs>
            <h1>{data.name}</h1>
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
