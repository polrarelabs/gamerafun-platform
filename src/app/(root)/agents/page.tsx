import { Metadata } from "next";
import { AGENTS_PATH } from "@constant/paths";
import { generateMetadata } from "@utils/seo";
import { Stack } from "@mui/material";
import { Overview, Filters, AgentList } from "@components/screens/Agents";
import { MIN_HEIGHT_SCREEN, SCREEN_PX } from "@constant";
import {
  Banner,
  ArbitrumCatalogue,
} from "@components/screens/BannerSlider.tsx";

export const metadata: Metadata = generateMetadata("Agents", AGENTS_PATH);

export default function Home() {
  return (
    <Stack
      flex={1}
      minHeight={MIN_HEIGHT_SCREEN}
      alignItems="center"
      spacing={4}
    >
      <Banner />

      <Overview />

      {/* <ArbitrumCatalogue /> */}
      <Stack width="100%" spacing={3} pb={14} px={SCREEN_PX}>
        <Filters />
        <AgentList />
      </Stack>
    </Stack>
  );
}
