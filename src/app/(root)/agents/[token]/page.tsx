import { Metadata } from "next";
import { AGENT_DETAIL_PATH } from "@constant/paths";
import { generateMetadata } from "@utils/seo";
import { Stack } from "@mui/material";
import { InfoApp, Tabs, TradingView } from "@components/screens/AgentDetail";
import Wrapper from "@components/screens/AgentDetail/Wrapper";
import { MIN_HEIGHT_SCREEN, SCREEN_PX } from "@constant";

export const metadata: Metadata = generateMetadata(
  "Agent Detail",
  AGENT_DETAIL_PATH,
);

export default function Home() {
  return (
    <Stack
      flex={1}
      overflow="auto"
      direction={{ xs: "column", lg: "row" }}
      px={SCREEN_PX}
      minHeight={MIN_HEIGHT_SCREEN}
      pt={2}
    >
      <Stack
        flex={{ xs: 1, lg: 2 }}
        maxWidth={{ xs: "100%", lg: "66.6%" }}
        px={{ xs: 1, lg: 2, elg: 3 }}
      >
        <Stack
          flex={1}
          bgcolor="grey.A700"
          borderRadius={2}
          py={2}
          px={2.5}
          spacing={2.5}
        >
          <InfoApp />
          <TradingView />
        </Stack>
        <Tabs />
      </Stack>
      <Wrapper />
    </Stack>
  );
}
