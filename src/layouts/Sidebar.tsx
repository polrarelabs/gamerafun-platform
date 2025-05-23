"use client";

import { memo } from "react";
import { Drawer, drawerClasses, Stack } from "@mui/material";
import { IconButton } from "@components/shared";
import PanelIcon from "@icons/PanelIcon";
import Connect from "@components/Connect";
import { Logo, Navigation } from "./components";
import useBreakpoint from "@hooks/useBreakpoint";
import BarsIcon from "@icons/BarsIcon";
import useToggle from "@hooks/useToggle";

const Sidebar = () => {
  const { isSmSmaller } = useBreakpoint();

  const [isShow, onShow, onHide] = useToggle();

  if (!isSmSmaller) return null;

  return (
    <>
      <IconButton onClick={onShow} sx={{ display: { sm: "none" } }}>
        <BarsIcon />
      </IconButton>
      <Drawer
        open={isShow}
        onClose={onHide}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            bgcolor: "background.default",
            width: "60%",
            minWidth: 260,
            p: 2,
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2.5}
          width="100%"
          mb={6}
        >
          <Logo type="long" />
          <IconButton onClick={onHide} noPadding>
            <PanelIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Stack>
        <Navigation direction="column" />

        <Connect size="large" />
      </Drawer>
    </>
  );
};

export default memo(Sidebar);
