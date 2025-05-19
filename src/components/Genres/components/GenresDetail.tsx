"use client";

// import useBreakpoint from "@hooks/useBreakpoint";
import { Drawer, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { memo, useState } from "react";
import BrowserGenres from "./BrowserGenres";
import OptionSider from "@components/OptionSider";

const GenresDetail = () => {
  const theme = useTheme();
  const isLayoutMD = useMediaQuery(theme.breakpoints.up("md"));

  const [displayLayout, setDisplayLayout] = useState<string>("list");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Stack direction="row" gap={4}>
      <BrowserGenres
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
          },
        }}
      >
        <OptionSider />
      </Drawer>
    </Stack>
  );
};

export default memo(GenresDetail);
