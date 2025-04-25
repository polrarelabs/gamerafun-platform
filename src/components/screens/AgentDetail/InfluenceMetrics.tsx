"use client";

import { memo, ReactNode } from "react";
import { Avatar, AvatarGroup, Stack } from "@mui/material";
import { Heading } from "./components";
import { Text } from "@components/shared";
import { formatNumber } from "@utils";
import { useTokenDetail } from "@store/token";
import { AgentState } from "@constant/enum";

type InfluenceMetricsProps = {};

type ItemProps = {
  label: string;
  children: ReactNode;
};

const InfluenceMetrics = (props: InfluenceMetricsProps) => {
  const { token } = useTokenDetail();

  if (!token?.complete) return null;

  return (
    <Stack width="100%" spacing={2} mt={4}>
      <Heading>Influence Metrics</Heading>
      <Stack
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          xl: "repeat(6, 1fr)",
        }}
        gap={2}
      >
        <Item label="Mineshare">
          {formatNumber(0.324392, { suffix: "%", space: false })}
        </Item>
        <Item label="Impressions">{formatNumber(39046)}</Item>
        <Item label="Engagement">{formatNumber(634)}</Item>
        <Item label="Followers">{formatNumber(8190)}</Item>
        <Item label="Smart Followers">{formatNumber(130)}</Item>
        <Item label="Top Tweets">
          <AvatarGroup spacing={8} sx={{ width: "fit-content" }}>
            <Avatar
              alt="Remy Sharp"
              sx={{ ...sx.avatar, zIndex: 1 }}
              src="/images/img-bot.png"
            />
            <Avatar
              alt="Remy Sharp"
              sx={{ ...sx.avatar, zIndex: 2 }}
              src="/images/img-bot.png"
            />
            <Avatar
              alt="Remy Sharp"
              sx={{ ...sx.avatar, zIndex: 3 }}
              src="/images/img-bot.png"
            />
          </AvatarGroup>
        </Item>
      </Stack>
    </Stack>
  );
};

export default memo(InfluenceMetrics);

const Item = (props: ItemProps) => {
  const { children, label } = props;

  return (
    <Stack borderRadius={2} p={1.5} bgcolor="background.paper" spacing={1}>
      <Text fontWeight={500} letterSpacing="2%" color="grey.400">
        {label}
      </Text>
      {typeof children === "string" ? (
        <Text variant="subtitle2" color="success.light">
          {children}
        </Text>
      ) : (
        children
      )}
    </Stack>
  );
};

const sx = {
  avatar: {
    width: 24,
    height: 24,
    border: "1px solid!important",
    borderColor: "common.white!important",
    bgcolor: "grey.800",
  },
};
