"use client";

import { memo, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { TabList } from "./components";
import { TabType } from "./helpers";
import Summary from "./Summary";
import { useTokenDetail } from "@store/token";
import { useParams } from "next/navigation";
import Holders from "./Holders";
import HistoriesSwap from "./HistoriesSwap";

const Tabs = () => {
  const { onGetToken, token: tokenDetail } = useTokenDetail();

  const { token } = useParams() as { token: string };

  const [tab, setTab] = useState<TabType>(TabType.TRANSACTIONS);

  const onChange = (newTab: TabType) => {
    setTab(newTab);
  };

  const renderContent = () => {
    switch (tab) {
      case TabType.HOLDERS:
        return <Holders />;
      case TabType.SUMMARY:
        return <Summary />;
      case TabType.TRANSACTIONS:
      default:
        return <HistoriesSwap />;
    }
  };

  useEffect(() => {
    if (!token) return;
    onGetToken(token);
  }, [onGetToken, token]);

  useEffect(() => {
    if (!tokenDetail?.complete) return;
    setTab(TabType.TRANSACTIONS);
  }, [tokenDetail?.complete]);

  return (
    <Stack width="100%" pb={2.5} flex={1}>
      <TabList selected={tab} onChange={onChange} />
      {renderContent()}
    </Stack>
  );
};

export default memo(Tabs);
