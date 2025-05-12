import { SCREEN_PX } from "@constant";
import { Breadcrumbs, Stack } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@components/Link";
import { Text } from "@components/shared";
import LayoutGenres from "./components/LayoutGenres";

const Genres = () => {
  return (
    <Stack px={SCREEN_PX} py={4} direction={"column"} gap={4}>
      <Stack direction={"column"} gap={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{
            color: "#FFFFFFA5",
          }}
        >
          <Link underline="hover" color="inherit" href="/">
            <Text sx={{ color: "text.primary" }}>HOME</Text>
          </Link>

          <Text sx={{ color: "text.primary" }}>GENRES</Text>
        </Breadcrumbs>

        <Stack direction={"column"}>
          <Text
            color="white"
            fontWeight={700}
            fontSize={"74px"}
            textTransform={"uppercase"}
          >
            Genres
          </Text>
          <Text color="#F9FAFB" fontWeight={500} fontSize={"20px"} mb={4}>
            Dive into the various blockchain gaming genres and find the perfect
            game you are looking for in your favorite play and earn gaming
            genre.
          </Text>
          <Text color="#9CA3AF" fontWeight={500} fontSize={"14px"}>
            If you are looking for that one blockchain game that fits your niche
            coming over from traditional gaming, this is where you will find it.
            Our various genres include casual blockchain games, card NFT games,
            battle royale blockchain games, auto battler NFT games, crypto
            shooter games, multiplayer NFT games, simulation web3 games, sports
            NFT games, RPG blockchain games, strategy blockchain games, racing
            NFT games, adventure web3 games, free-to-play crypto games, and
            MMORPG play and earn games. You are guaranteed to find the perfect
            game that suits your preferred genre. The web3 gaming landscape has
            grown at an incredible rate that sometimes you might feel
            overwhelmed when looking for games within your favorite genre.
          </Text>
        </Stack>

        <LayoutGenres />
      </Stack>
    </Stack>
  );
};

export default Genres;
