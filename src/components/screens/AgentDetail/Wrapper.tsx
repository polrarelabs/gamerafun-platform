"use client";

import { memo } from "react";
import { Box, NoSsr, Stack } from "@mui/material";
import { useTokenDetail } from "@store/token";
import { Text } from "@components/shared";
import RightInfo from "./RightInfo";
import SentientTokenData from "./SentientTokenData";
import Swap from "./Swap";
import PrototypeSwap from "./PrototypeSwap";

type WrapperProps = {};

const Wrapper = (props: WrapperProps) => {
  const { token } = useTokenDetail();

  return (
    <Stack
      flex={1}
      maxWidth={{ xs: "100%", lg: "33.3%" }}
      spacing={3}
      height="fit-content"
    >
      {token?.complete ? (
        <Stack flex={1} height="fit-content" p={0.5} bgcolor="grey.A700">
          <NoSsr>
            <Swap token={token.token_address} />
          </NoSsr>

          <SentientTokenData />
        </Stack>
      ) : (
        <PrototypeSwap />
      )}

      <RightInfo />
    </Stack>
  );
};

export default memo(Wrapper);
