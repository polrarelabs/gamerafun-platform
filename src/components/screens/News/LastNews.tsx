"use client";

import { Drawer, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo, useState } from "react";
import LastNewsOptions from "./LastNewsOptions";
import LastNewsLists from "./LastNewsLists";

const LayoutLastNews = () => {
  const theme = useTheme();
  const isLayoutMD = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState<boolean>(false);
  const [displayLayout, setDisplayLayout] = useState<string>("list");

  return (
    <Stack direction={{ md: "row", xs: "column" }} gap={4}>
      <LastNewsLists
        setDisplayLayout={setDisplayLayout}
        displayLayout={displayLayout}
        isLayoutMD={isLayoutMD}
        theme={theme}
        setOpen={setOpen}
      />
      {isLayoutMD && (
        <LastNewsOptions
          isLayoutMD={isLayoutMD}
          setDisplayLayout={setDisplayLayout}
          displayLayout={displayLayout}
        />
      )}
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
        <LastNewsOptions
          isLayoutMD={isLayoutMD}
          setDisplayLayout={setDisplayLayout}
          displayLayout={displayLayout}
        />
      </Drawer>
    </Stack>
  );
};

export default memo(LayoutLastNews);
