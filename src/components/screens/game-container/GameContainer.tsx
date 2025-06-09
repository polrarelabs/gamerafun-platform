"use client";

import { Drawer, Stack, useMediaQuery, useTheme } from "@mui/material";
import { memo, useState } from "react";
import BrowserGame from "./BrowserGame";
import OptionSider from "@components/OptionSider";

const GameContainer = () => {
  const theme = useTheme();
  const isLayoutMD = useMediaQuery(theme.breakpoints.up("md"));

  const [displayLayout, setDisplayLayout] = useState<string>("list");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Stack direction="row" gap={4}>
      <BrowserGame
        setDisplayLayout={setDisplayLayout}
        displayLayout={displayLayout}
        isLayoutMD={isLayoutMD}
        theme={theme}
        setOpen={setOpen}
      />
      {isLayoutMD && <OptionSider />}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            width: "300px",
            padding: "8px 16px",
            backgroundImage: "none",
          },
        }}
      >
        <OptionSider />
      </Drawer>
    </Stack>
  );
};

export default memo(GameContainer);
