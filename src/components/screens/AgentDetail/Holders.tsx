"use client";

import { Text, Tooltip } from "@components/shared";
import { Stack } from "@mui/material";
import { useHolders, useTokenDetail } from "@store/token";
import { formatNumber, shortAddress } from "@utils";
import { memo, useEffect } from "react";
import { Heading } from "./components";
import BotImg from "public/images/img-bot.png";
import Image from "next/image";
import useAptosWallet from "@hooks/useAptosWallet";

const Holders = () => {
  const { onGetHolders, items, isSucceeded } = useHolders();
  const { address } = useAptosWallet();
  const { token } = useTokenDetail();

  useEffect(() => {
    if (!token?.token_address || !token?.pool_id) return;
    onGetHolders(token.token_address, token.pool_id);
  }, [onGetHolders, token?.token_address, token?.pool_id]);

  return (
    <Stack width="100%" spacing={2} flex={1}>
      <Heading>{`Holder Distribution: ${formatNumber(Array.isArray(items) && isSucceeded ? items.length : token?.holders, { emptyText: "(N/A Holders)" })}`}</Heading>
      <Stack
        maxHeight={848}
        minHeight={200}
        flex={1}
        overflow="auto"
        width="100%"
        borderRadius={2}
        bgcolor="grey.A700"
      >
        {Boolean(!items.length && isSucceeded) && (
          <Stack alignItems={"center"} flex={1} justifyContent={"center"}>
            <Image src={BotImg} width={64} height={64} alt="" />
            <Text mt={1} variant="subtitle2">
              No holder can be displayed
            </Text>
          </Stack>
        )}
        {items.map((item, index) => {
          const isMe = address?.toLowerCase() === item.address.toLowerCase();
          return (
            <Tooltip key={item.address} title={isMe ? "You" : undefined}>
              <Stack
                px={2}
                py={1.25}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                bgcolor={isMe ? "primary.dark" : undefined}
                borderLeft="1px solid transparent"
                borderColor={isMe ? "primary.main" : undefined}
              >
                <Text variant="body2">{`${index + 1}. ${shortAddress(item.address, 6)}`}</Text>
                <Text variant="body2" color="grey.400">
                  {formatNumber(
                    (Number(item.balance ?? 0) / Number(token?.total_supply)) *
                      100,
                    {
                      suffix: "%",
                      space: false,
                      numberOfFixed: 6,
                    },
                  )}
                </Text>
              </Stack>
            </Tooltip>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default memo(Holders);
