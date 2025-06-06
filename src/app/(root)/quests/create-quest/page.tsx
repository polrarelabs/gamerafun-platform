import { CreateQuest } from "@components/screens/Quests";
import React, { memo } from "react";
import { generateMetadata } from "@utils/seo";
import { Metadata } from "next";
import { QUESTS_CREATE_PATH } from "@constant/paths";

export const metadata: Metadata = generateMetadata(
  "Create Quest",
  QUESTS_CREATE_PATH,
);

const CreateQuestPage = () => {
  return <CreateQuest />;
};

export default memo(CreateQuestPage);
