"use client";

import { LayoutGenres } from "@components/screens/Genres";
import { Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX } from "@constant";
import { HOME_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { useBlog } from "@store/new";
import { palette } from "public/material";
import { useEffect } from "react";

const Genres = () => {
  const { setEditorRating, setUserRating, SetPlatforms, SetGenres } = useGame();
  const { setTags, setCheckDate } = useBlog();

  useEffect(() => {
    setCheckDate("all");
    SetPlatforms([]);
    setUserRating(0);
    setEditorRating(0);
    SetGenres([]);
    setTags([]);
  }, []);

  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: HOME_PATH,
      title: "HOME",
    },
    {
      title: "GENRES",
    },
  ];

  return (
    <Stack px={SCREEN_PX} py={4} direction={"column"} gap={4}>
      <Stack direction={"column"} gap={2}>
        <Breadcumbs breadcumbs={breadcrumbs} />
        <Stack direction={"column"}>
          <Text
            color="white"
            fontWeight={700}
            fontSize={"74px"}
            textTransform={"uppercase"}
          >
            Genres
          </Text>
          <Text
            color={palette.textWhite}
            fontWeight={500}
            fontSize={"20px"}
            mb={4}
          >
            Dive into the various blockchain gaming genres and find the perfect
            game you are looking for in your favorite play and earn gaming
            genre.
          </Text>
          <Text color={palette.colorGray} fontWeight={500} fontSize={"14px"}>
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
