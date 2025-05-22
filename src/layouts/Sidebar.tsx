"use client";

import { memo } from "react";
import { Drawer, drawerClasses, Stack } from "@mui/material";
import { IconButton } from "@components/shared";
import PanelIcon from "@icons/web3/PanelIcon";
import Connect from "@components/Connect";
import { Logo, Navigation } from "./components";
import useBreakpoint from "@hooks/useBreakpoint";
import BarsIcon from "@icons/common/BarsIcon";
import useToggle from "@hooks/useToggle";

const Sidebar = () => {
  const { isMdSmaller } = useBreakpoint();

  const [isShow, onShow, onHide] = useToggle();

  if (!isMdSmaller) return null;

  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <IconButton onClick={onShow} sx={{ display: { md: "none" } }}>
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
        <Navigation directions="column" onHide={onHide} />

        {/* <Connect size="large" /> */}
      </Drawer>
    </Stack>
  );
};

export default memo(Sidebar);
