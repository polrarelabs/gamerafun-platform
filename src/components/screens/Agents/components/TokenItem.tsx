"use client";

import Link from "@components/Link";
import { Image, Text } from "@components/shared";
import { CONFIG_BY_CURRENCY } from "@constant";
import { AgentType } from "@constant/enum";
import { AGENT_DETAIL_PATH } from "@constant/paths";
import { Token } from "@constant/types";
import useWindowSize from "@hooks/useWindowSize";
import { Box, Skeleton, Stack, Avatar } from "@mui/material";
import { useTokensPrice } from "@store/app";
import { formatCash, getMaxLinesCss, getTicker, shortAddress } from "@utils";
import { typography } from "public/material";
import { memo, Ref, useLayoutEffect, useMemo, useRef, useState } from "react";
import StringFormat from "string-format";

type TokenItemProps = {
  item: Token;
  skeleton?: boolean;
};

const TokenItem = (props: TokenItemProps) => {
  const { item, skeleton } = props;

  const ref = useRef<HTMLDivElement | HTMLLinkElement | null>(null);
  const { width } = useWindowSize();
  const [size, setSize] = useState<number>(MIN_SIZE);

  const { tokensPrice } = useTokensPrice();

  const imageHeight = useMemo(() => (size * 9) / 16, [size]);
  const marketCap = useMemo(() => {
    if (!item?.marketCap || !item?.currency) return;
    return item?.hasDexData
      ? item?.marketCap
      : item?.marketCap * tokensPrice[item.currency].usd;
  }, [item?.hasDexData, item?.marketCap, tokensPrice, item?.currency]);

  useLayoutEffect(() => {
    setSize(ref.current?.offsetWidth ?? MIN_SIZE);
  }, [width]);

  if (skeleton) {
    return (
      <Stack
        flex={1}
        bgcolor="background.paper"
        borderRadius={2}
        border="1px solid"
        borderColor="background.paper"
        ref={ref as Ref<HTMLDivElement>}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={imageHeight}
          animation="wave"
        />
        <Stack flex={1} p={2} width="100%" spacing={0.5}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={6}
            animation="wave"
          />
          <Skeleton variant="text" width="40%" height={21} animation="wave" />
          <Skeleton variant="text" width="80%" height={24} animation="wave" />
          <Skeleton variant="text" width="50%" height={21} animation="wave" />
          <Skeleton variant="text" width="100%" height={42} animation="wave" />
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack
      flex={1}
      component={Link}
      href={StringFormat(AGENT_DETAIL_PATH, { token: item.pool_id })}
      bgcolor="background.paper"
      borderRadius={2}
      border="1px solid"
      borderColor="background.paper"
      sx={{
        "&:hover": {
          borderColor: "rgba(131, 248, 88, 0.8)",
        },
      }}
      overflow="hidden"
      ref={ref as Ref<HTMLAnchorElement>}
    >
      <Stack
        sx={{ aspectRatio: 16 / 9 }}
        borderBottom="1px solid"
        borderColor="grey.800"
        borderRadius={1}
        width="100%"
        position="relative"
      >
        <Avatar
          src={item.icon_url}
          variant="square"
          sx={{
            width: "100%",
            height: imageHeight,
            bgcolor: "grey.A700",
            color: "common.white",
            borderRadius: 1,
            ...typography.h1,
            fontSize: 48,
          }}
        >
          {item.name
            ?.split(" ")
            .reduce((out, word) => out + word.slice(0, 1), "")
            .toUpperCase()}
        </Avatar>
        <Stack
          direction="row"
          alignItems="center"
          width="100%"
          position="absolute"
          spacing={0.5}
          bottom={-12}
          zIndex={1}
          left={0}
          sx={{
            "& img": {
              bgcolor: "grey.A700",
              borderRadius: "50%",
              p: 0.25,
              ml: "16px!important",
            },
          }}
        >
          <Image
            src={CONFIG_BY_CURRENCY[item.currency].icon}
            width={24}
            height={24}
            alt={item.name}
          />
          <Text
            sx={{
              background: "linear-gradient(90deg, #1CD6CE 0%, #83F858 100%)",
            }}
            borderRadius={250}
            variant="subtitle2"
            px={1.25}
            py={0.125}
            color="text.secondary"
          >
            {item?.style || AgentType.DEFI}
          </Text>
        </Stack>
      </Stack>
      <Stack flex={1} p={2}>
        <Box
          position="relative"
          width="100%"
          bgcolor="grey.700"
          overflow="hidden"
          borderRadius={250}
          mt={1}
          height={6}
          sx={{
            "&:after": {
              content: "''",
              position: "absolute",
              width: `${item.complete ? 100 : item.curvePercent}%`,
              height: 6,
              background: "linear-gradient(90deg, #1CD6CE 0%, #83F858 100%)",
              top: 0,
              left: 0,
            },
          }}
        />
        <Text color="success.main" mt={1}>
          {formatCash(marketCap, { prefix: "MCAP: $" })}
        </Text>
        <Stack direction="row" mt={0.5} alignItems="center" spacing={1}>
          <Text variant="subtitle1" color="grey.400">
            {getTicker(item.symbol)}
          </Text>
          <Text
            noWrap
            variant="subtitle2"
            bgcolor="grey.600"
            py={0.25}
            px={0.75}
            borderRadius={1}
            tooltip={item.name}
          >
            {item.name}
          </Text>
        </Stack>
        <Text mt={0.5} variant="body2" color="grey.400">
          By{" "}
          <Text variant="inherit" component="span">
            {shortAddress(item.sender)}
          </Text>
        </Text>
        <Text
          mt={1}
          variant="body2"
          minHeight={63}
          sx={getMaxLinesCss(3)}
          color="grey.400"
        >
          {item.description}
        </Text>
      </Stack>
    </Stack>
  );
};

export default memo(TokenItem);

const MIN_SIZE = 200;
