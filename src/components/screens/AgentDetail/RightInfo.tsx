"use client";

import { memo, ReactNode, useMemo } from "react";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import { Heading } from "./components";
import { Socials } from "@components/Info";
import { useTokenDetail } from "@store/token";
import { Text } from "@components/shared";
import { displayPercent, formatNumber, getTicker, shortAddress } from "@utils";
import { BASIS_POINTS, FEE_BPS } from "@constant";

type TokenDataItemProps = {
  label: string;
  percent?: number;
  description: ReactNode;
};

const RightInfo = () => {
  const { token } = useTokenDetail();

  const additionToken = useMemo(() => {
    if (!token) return 0;

    const addToken = token.max_pool_daox - token.pool_daox;
    const fee = (addToken * FEE_BPS) / (BASIS_POINTS - FEE_BPS);

    return addToken + fee;
  }, [token]);

  if (!token) {
    return (
      <Stack
        bgcolor="grey.A700"
        borderRadius={2}
        py={2}
        px={{ xs: 1, lg: 2, elg: 2.5 }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={400}
          width="100%"
        />
      </Stack>
    );
  }

  return (
    <>
      {!token?.complete && (
        <Stack
          bgcolor="grey.A700"
          borderRadius={2}
          py={2}
          px={{ xs: 1, lg: 2, elg: 2.5 }}
        >
          <TokenDataItem
            label="Bonding Curve Progress"
            description={
              <Text variant="body2" color="grey.400">
                An additional{" "}
                <Text variant="inherit" component="span" color="secondary.main">
                  {formatNumber(additionToken, {
                    suffix: getTicker(token?.currency),
                    groupZeroDecimal: false,
                    numberOfFixed: 6,
                  })}
                </Text>{" "}
                are required before all the liquidity from the bonding curve
                will be deposited into Pancake and burnt. Progression increases
                as the price goes up
              </Text>
            }
            percent={token.curvePercent}
          />
        </Stack>
      )}

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        bgcolor="grey.A700"
        borderRadius={2}
        py={2}
        px={{ xs: 1, lg: 2, elg: 2.5 }}
      >
        <Avatar
          variant="circular"
          src="/images/img-logo.png"
          sx={{
            width: 28,
            height: 28,
            border: "1px solid",
            borderColor: "common.white",
          }}
        />
        <Text variant="body2" color="grey.400" sx={{ wordBreak: "break-all" }}>
          {shortAddress(token.sender, 6)}
        </Text>
      </Stack>
    </>
  );
};

export default memo(RightInfo);

const TokenDataItem = (props: TokenDataItemProps) => {
  const { label, percent, description } = props;

  return (
    <Stack width="100%" spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Text textTransform="capitalize" variant="subtitle2">
          {label}
        </Text>
        {typeof percent === "number" && (
          <Text variant="subtitle2" color="secondary.main">
            {displayPercent(percent, { groupZeroDecimal: false })}
          </Text>
        )}
      </Stack>
      {typeof percent === "number" && (
        <Box
          position="relative"
          width="100%"
          bgcolor="grey.700"
          overflow="hidden"
          borderRadius={250}
          height={6}
          sx={{
            "&:after": {
              content: "''",
              position: "absolute",
              width: `${percent}%`,
              height: 6,
              bgcolor: "secondary.main",
              top: 0,
              left: 0,
            },
          }}
        />
      )}
      {description}
    </Stack>
  );
};
