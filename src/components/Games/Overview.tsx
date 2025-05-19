"use client";

import { Carousel } from "@components/screens/Carousel";
import { Box, Grid2, Typography, useMediaQuery } from "@mui/material";
import Iframe from "react-iframe";
import CreateReview from "./components/CreateReview";
import RelatedGames from "./components/RelatedGames";
import About from "./components/About";
import Share from "./components/Share";
import { memo } from "react";
import { YOUTOBE_URL } from "./helper";
const Overview = () => {
  const xs = ASPECT_RATIO.xs;
  const md = ASPECT_RATIO.md;
  const lg = ASPECT_RATIO.lg;
  return (
    <>
      <Box sx={{ px: { xs: 2, md: 4, lg: 8 }, py: 4 }}>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 6, lg: 8 }}>
            {!useMediaQuery((theme) => theme.breakpoints.up("lg")) && (
              <CreateReview />
            )}
            <Typography variant="h2" component="h2" gutterBottom sx={{ my: 2 }}>
              Introduce
            </Typography>
            <Carousel />
            <Typography variant="h2" component="h2" gutterBottom sx={{ my: 2 }}>
              OverView
            </Typography>
            <iframe
              width="100%"
              height="100%"
              src={YOUTOBE_URL}
              style={{ display: "block", position: "relative" }}
            />
            <Typography variant="h2" component="h2" gutterBottom sx={{ my: 2 }}>
              How to Get Started
            </Typography>
            <About />
            {!useMediaQuery((theme) => theme.breakpoints.up("lg")) && <Share />}
            <RelatedGames />
          </Grid2>
          {useMediaQuery((theme) => theme.breakpoints.up("lg")) && (
            <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
              <Box
                sx={{
                  position: "sticky",
                  top: 0,
                  height: "100vh",
                  overflowY: "auto",
                  padding: 2,
                }}
              >
                <CreateReview />
                <Share />
              </Box>
            </Grid2>
          )}
        </Grid2>
      </Box>
    </>
  );
};

export default memo(Overview);

const ASPECT_RATIO = { xs: 4 / 2, md: 1000 / 600, lg: 1920 / 800 };
