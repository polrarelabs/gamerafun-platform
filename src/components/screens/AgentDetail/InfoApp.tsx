"use client";

import { Address, Avatar, Socials } from "@components/Info";
import { Text } from "@components/shared";
import { Skeleton, Stack } from "@mui/material";
import { useTokensPrice } from "@store/app";
import { useTokenDetail } from "@store/token";
import { formatCash, getTicker } from "@utils";
import { formatDistance } from "date-fns";
import { memo, useEffect } from "react";

type DetailItemProps = {
  label: string;
  value: string;
};

const InfoApp = () => {
  const { token, onResetToken } = useTokenDetail();
  const { tokensPrice } = useTokensPrice();

  useEffect(() => {
    return () => {
      onResetToken();
    };
  }, [onResetToken]);

  if (!token) {
    return (
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rounded" width={80} height={80} animation="wave" />
          <Stack spacing={1}>
            <Skeleton variant="text" width={200} height={36} animation="wave" />
            <Skeleton variant="text" width="50%" height={36} animation="wave" />
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Skeleton variant="text" width={148} height={36} animation="wave" />
          <Skeleton variant="text" width={124} height={36} animation="wave" />
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      spacing={2}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Avatar
          src={token.icon_url}
          currency={token?.currency}
          name={token.name}
          size={80}
        />
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Text variant="h3">{token.name}</Text>
            <Text variant="subtitle1" color="grey.400">
              {getTicker(token.symbol)}
            </Text>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <DetailItem
              label="Market Cap (FDV)"
              value={
                formatCash(
                  token?.hasDexData
                    ? token?.marketCap
                    : (token?.marketCap || 0) * tokensPrice[token.currency].usd,
                  {
                    prefix: "$",
                  },
                ) as string
              }
            />
            <DetailItem
              label="Created At"
              value={formatDistance(new Date(token.createdAt), new Date(), {
                addSuffix: true,
              })}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={{ xs: "row", md: "column" }}
        spacing={1}
        alignItems={{ xs: "center", md: "flex-end" }}
        justifyContent={{ xs: "flex-end", md: "flex-start" }}
      >
        <Address
          bgcolor="text.secondary"
          value={token.token_address}
          sliceCount={6}
        />
        <Socials
          itemProps={{
            bgcolor: "text.secondary",
          }}
          data={token}
        />
      </Stack>
    </Stack>
  );
};

export default memo(InfoApp);

const DetailItem = (props: DetailItemProps) => {
  const { label, value } = props;

  return (
    <Stack
      direction="row"
      alignItems="center"
      px={2}
      py={0.6875}
      minWidth={238}
      spacing={2}
      bgcolor="text.secondary"
      justifyContent="space-between"
      borderRadius={1}
    >
      <Text variant="body2" color="grey.400">
        {label}
      </Text>
      <Text variant="subtitle2" color="common.white">
        {value}
      </Text>
    </Stack>
  );
};
