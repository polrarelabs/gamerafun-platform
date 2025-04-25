"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import { Button, ButtonProps, Text } from "@components/shared";
import Image from "next/image";
import FireGif from "public/images/fire.gif";
import { useTokens } from "@store/token";
import { DEFAULT_PAGING, NOCTRA_COIN_TYPE } from "@constant";
import { AgentState } from "@constant/enum";

const TrendingTopic = () => {
  const { filters, onGetTokens } = useTokens();

  const onChoose = (key: string, value) => () => {
    onGetTokens({ ...filters, ...DEFAULT_PAGING, [key]: value });
  };

  return (
    <Stack mt={2} direction="row" spacing={1.5} alignItems="center">
      <Text variant={{ xs: "subtitle2", sm: "subtitle1" }}>Trending Topic</Text>
      <Stack direction="row" spacing={{ xs: 1, sm: 1.5 }} alignItems="center">
        {DATA.map((item) => (
          <Item key={item.label} onClick={onChoose(item.key, item.value)}>
            {item.label}
          </Item>
        ))}
      </Stack>
    </Stack>
  );
};

export default memo(TrendingTopic);

const Item = (props: ButtonProps) => {
  return (
    <Button
      variant="contained"
      sx={{
        height: 28,
        px: 1,
        borderRadius: 1,
        textTransform: "initial",
        fontSize: { xs: 12, sm: 14 },
      }}
      css={{ backgroundColor: "common.white", color: "text.secondary" }}
      // startIcon={<Image src={FireGif} width={14} height={14} alt="" />}
      {...props}
    />
  );
};

const DATA = [
  { label: "Listed", key: "agentState", value: AgentState.SENTIENT },
  { label: "New Pairs", key: "agentState", value: AgentState.PROTOTYPE },
  { label: "Noctra", key: "poolType", value: NOCTRA_COIN_TYPE },
];
