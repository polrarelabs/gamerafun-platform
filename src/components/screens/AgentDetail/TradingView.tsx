"use client";

import { memo } from "react";
import { Box, Skeleton } from "@mui/material";
import { useTokenDetail } from "@store/token";
import PrototypeChart from "./PrototypeChart";
import { APP_ENVIRONMENT } from "@constant";

const TradingView = () => {
  const { token } = useTokenDetail();

  switch (true) {
    case !token:
      return (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            height: 400,
            minHeight: 400,
          }}
          width="100%"
        />
      );
    case Boolean(token?.complete && APP_ENVIRONMENT === "production"):
      return (
        <Box
          component="iframe"
          id="dextools-widget"
          title="DEXTools Trading Chart"
          minHeight={400}
          height={400}
          maxHeight={400}
          border="1px solid"
          borderColor="divider"
          borderRadius={2}
          width="100%"
          frameBorder="0"
          src={`https://dexscreener.com/sui/${token?.cetus_pair}?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15`}
        />
      );
    default:
      return <PrototypeChart />;
  }
};

export default memo(TradingView);
