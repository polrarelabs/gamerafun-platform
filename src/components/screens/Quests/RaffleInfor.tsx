"use client";

import { Text } from "@components/shared";
import { Stack } from "@mui/material";
import { palette } from "public/material";
import React, { memo } from "react";
import { Clock } from "./components";

const RaffleInfor = () => {
  return (
    <Stack mt={2} gap={2}>
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <Text color="white" fontSize={"21px"} fontWeight={700}>
          Raffle Information
        </Text>
        <Text
          color={palette.colorReview?.textCopy}
          fontSize={"14px"}
          fontWeight={400}
        >
          75 seats available
        </Text>
      </Stack>
      <Text color="white" fontSize={"21px"} fontWeight={500}>
        Join our Quest raffle for exclusive gaming rewards! Winners will be
        randomly selected and rewards distributed at the end of the Quest. Stay
        tuned to claim your prize.
      </Text>

      <Clock day={5} second={4} />
    </Stack>
  );
};

export default memo(RaffleInfor);
