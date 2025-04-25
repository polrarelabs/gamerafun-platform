"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import { IconButton } from "@components/shared";
import MenuIcon from "@icons/MenuIcon";
import GridIcon from "@icons/GridIcon";
import { useTokens, ViewMode } from "@store/token";
import { Tag } from "./components";
import { DEFAULT_PAGING } from "@constant";
import { AgentState } from "@constant/enum";
import BarsIcon from "@icons/BarsIcon";

type FiltersProps = {};

const Filters = (props: FiltersProps) => {
  const { viewMode, onUpdateViewMode, filters, onGetTokens } = useTokens();

  const onChangeViewMode = (newMode: ViewMode) => () => {
    onUpdateViewMode(newMode);
  };

  const onChangeType = (newState) => () => {
    onGetTokens({ ...filters, ...DEFAULT_PAGING, agentState: newState });
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
        {TYPE_OPTIONS.map((type) => (
          <Tag
            onClick={onChangeType(type.value)}
            label={type.label}
            key={type.label}
            active={
              filters?.agentState
                ? type.value === filters?.agentState
                : type.value === TYPE_OPTIONS[0].value
            }
          />
        ))}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        borderRadius={1}
        bgcolor="grey.A700"
      >
        {[ViewMode.LIST, ViewMode.GRID].map((value) => (
          <IconButton
            key={value}
            onClick={onChangeViewMode(value)}
            className={viewMode === value ? "active" : ""}
            sx={sx.viewOption}
          >
            {value === ViewMode.LIST ? <BarsIcon /> : <GridIcon />}
          </IconButton>
        ))}
      </Stack>
    </Stack>
  );
};

export default memo(Filters);

const TYPE_OPTIONS = [
  { label: "All", value: "" },
  { label: "Listed", value: AgentState.SENTIENT },
  { label: "New Pairs", value: AgentState.PROTOTYPE },
];

const sx = {
  viewOption: {
    px: 1.1875,
    py: 0.5,
    borderRadius: 1,
    height: 32,
    fontSize: 24,
    color: "grey.400",
    "&.active": {
      bgcolor: "primary.dark",
      color: "primary.main",
    },
  },
};
