"use client";

import Link from "@components/Link";
import { Button, Text } from "@components/shared";
import { STUDIO_URL } from "@constant/links";
import { CREATE_AGENT_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import Image from "next/image";
import AptosTextImg from "public/images/agents/img-aptos-text.png";
import { memo } from "react";
import { SearchAgents, TrendingTopic } from "./components";

type OverviewProps = {};

const Overview = (props: OverviewProps) => {
  // const { data: gameData, fetchGetGame } = useGame()
  // const { data: gameCount, fetchGameCount } = useGameCount()
  // const { data: gameOwner, fetchGetGameOwner } = useGameOwner()

  // useEffect(() => {
  //   fetchGetGame()
  //   fetchGameCount()
  //   fetchGetGameOwner()
  // }, [])

  // console.log('fetch data game', gameData);
  // console.log('fetch data gane count', gameCount);
  // console.log('fetch data gane owner', gameOwner);
  return (
    <Stack
      sx={{
        background: "url('/images/agents/img-banner-bg.png') no-repeat center",
        backgroundSize: "cover",
      }}
      py={4}
      px={2}
      flex={1}
      width="100%"
      alignItems="center"
    >
      <Text
        variant="h1"
        fontWeight={500}
        fontSize={{ xs: 24, md: 32, lg: 40, xl: 48 }}
        textTransform="capitalize"
        lineHeight={1.1}
      >
        Agent Launch Platform
      </Text>
      <Stack direction="row" mb={3} mt={1} alignItems="center" spacing={0.5}>
        <Text variant="h3" fontWeight={500} textTransform="uppercase">
          Powered by
        </Text>
        <Image src={AptosTextImg} height={25.26} alt="Aptos" />
      </Stack>
      <SearchAgents />
      <TrendingTopic />
      <Stack
        mt={4}
        direction="row"
        maxWidth={336}
        alignItems="center"
        spacing={2}
        width="100%"
      >
        <Button
          fullWidth
          LinkComponent={Link}
          href={CREATE_AGENT_PATH}
          variant="contained"
          size="large"
        >
          Launch Agent
        </Button>
        <Button
          LinkComponent={Link}
          href={STUDIO_URL}
          target="_blank"
          fullWidth
          variant="contained"
          css={{ backgroundColor: "common.white" }}
          size="large"
        >
          Get Started
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(Overview);
