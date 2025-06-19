/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Stack } from "@mui/material";
import React, { memo } from "react";
import { SelectOptions } from "./shared";
import ButtonFillters from "./shared/ButtonFillters";

interface GroupButtonFillters {
  sortBy: any;
  setSelected: (value: any) => void;
  options: any[];
  getSort: (value: any) => React.ReactNode;
  handleOpen: () => void;
}

const GroupButtonFillters = ({
  sortBy,
  setSelected,
  options,
  getSort,
  handleOpen,
}: GroupButtonFillters) => {
  return (
    <Stack
      alignItems={"center"}
      gap={2}
      height={"100%"}
      display={"grid"}
      gridTemplateColumns={"repeat(2,1fr)"}
    >
      <SelectOptions
        selected={sortBy}
        setSelected={setSelected}
        options={options}
        getSort={getSort}
      />

      <ButtonFillters handleOpen={handleOpen} />
    </Stack>
  );
};

export default memo(GroupButtonFillters);
