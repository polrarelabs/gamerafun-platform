"use client";

import { Drawer, Stack, useMediaQuery, useTheme } from "@mui/material";
import { memo, useState } from "react";
import OptionGame from "./OptionGame";
import BrowserGame from "./BrowserGame";

const LayoutBrowserGame = () => {
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
      {isLayoutMD && <OptionGame />}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            width: "300px",
            padding: "8px 16px",
          },
        }}
      >
        <OptionGame />
      </Drawer>
    </Stack>
  );
};

export default memo(LayoutBrowserGame);
