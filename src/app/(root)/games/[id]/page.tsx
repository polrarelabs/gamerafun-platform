"use client";

import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { useGetGameId } from "@store/game";
import { Button, Image } from "@components/shared";
import { useParams } from "next/navigation";
const LayoutGameDetail = () => {
  const { id } = useParams();
  const { getGameId, data, error, loading } = useGetGameId();
  console.log("data of game detail", data);
  console.log("id game", id);
  return (
    <>
      <Stack>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/games">
            Games
          </Link>
          <Link underline="hover" color="inherit" href="/games/${data.id}">
            {data.name}
          </Link>
          <Typography color="text.while">OverView</Typography>
        </Breadcrumbs>
        <h1>{data.name}</h1>
        <Breadcrumbs aria-label="breadcrumb" separator=" ">
          <Button
            sx={{
              padding: "5px",
              color: "gray",
              "&:hover": {
                color: "white",
                borderBottom: "1px gray",
              },
            }}
          >
            Overviews
          </Button>
          <Button
            sx={{
              padding: "5px",
              color: "gray",
              "&:hover": {
                borderBottom: "1px gray",
              },
            }}
          >
            Review
          </Button>
          <Button
            sx={{
              padding: "5px",
              color: "gray",
              "&:hover": {
                color: "white",
                borderBottom: "1px gray",
              },
            }}
          >
            Guides
          </Button>
          <Button
            sx={{
              padding: "5px",
              color: "gray",
              "&:hover": {
                color: "white",
                borderBottom: "1px gray",
              },
            }}
          >
            News
          </Button>
          <Button>Analytics</Button>
          <Button
            sx={{
              padding: "5px",
              color: "gray",
              "&:hover": {
                color: "white",
                borderBottom: "1px gray",
              },
            }}
          >
            Live streams
          </Button>
          <Button
            sx={{
              padding: "5px",
              color: "gray",
              "&:hover": {
                color: "white",
                borderBottom: "1px gray",
              },
            }}
          >
            Community
          </Button>
          <Button
            sx={{
              padding: "5px",
              color: "gray",
              "&:hover": {
                color: "white",
                borderBottom: "1px gray",
              },
            }}
          >
            User reviews
          </Button>
        </Breadcrumbs>
      </Stack>
      <Button
        sx={{
          backgroundColor: "white",
          color: "black",
          "&:hover": {
            backgroundColor: "gray",
          },
        }}
      >
        Write a Review
      </Button>
    </>
  );
};

export default LayoutGameDetail;
