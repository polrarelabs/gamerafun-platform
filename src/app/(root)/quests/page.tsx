import { LayoutQuest, QuestBreadcumb } from "@components/screens/Quests";
import { Stack } from "@mui/material";
import { memo } from "react";
import { generateMetadata } from "@utils/seo";
import { Metadata } from "next";
import { QUESTS_PATH } from "@constant/paths";

export const metadata: Metadata = generateMetadata("Quests", QUESTS_PATH);

const RequestsPage = () => {
  return (
    <Stack direction={"column"} gap={2}>
      <QuestBreadcumb />
      <LayoutQuest />
    </Stack>
  );
};

export default memo(RequestsPage);
