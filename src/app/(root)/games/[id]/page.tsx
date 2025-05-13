"use client";

import { Breadcrumbs, Link, Stack, Typography, Box } from "@mui/material";
import { useGetGameId } from "@store/game";
import { Button, Image } from "@components/shared";
import { useParams } from "next/navigation";
import { TabContents, TabHeaders, useCustomTabs } from "@components/shared/Tab";
import { useEffect } from "react";
import LayoutOverview from "./components/LayoutOverview";
import LayoutReview from "./components/LayoutReview";
import LayoutGuides from "./components/LayoutGuides";
import LayoutNews from "./components/LayoutNews";
import bgSlider from "public/images/Riftstorm_banner1_b0eb3c12c2.webp";
const LayoutGameDetail = () => {
  const { id } = useParams();
  const { getGameId, data, error, loading } = useGetGameId();
  useEffect(() => {
    if (id) {
      const gameId = Array.isArray(id) ? Number(id[0]) : Number(id);
      getGameId(gameId);
    }
  }, [id]);
  console.log("data of game detail", data);
  console.log("id game", id);
  const tabItems = [
    { label: "Overview", content: <LayoutOverview /> },
    { label: "Review", content: <LayoutReview /> },
    { label: "Guides", content: <LayoutGuides /> },
    { label: "News", content: <LayoutNews /> },
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
            containerProps={{
              sx: {
                height: "300px",
                width: "100%",
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
