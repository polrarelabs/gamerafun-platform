"use client";

import { MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import React, { memo } from "react";
import Text from "./Text";
import { palette } from "public/material";

interface SelectedProps {
  selected: string;
  handleChange: (event: SelectChangeEvent) => void;
  options: string[];
}

const SelectOptions = ({ options, selected, handleChange }: SelectedProps) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        // width: 250,
      },
    },
  };

  return (
    <Select
      displayEmpty
      value={selected}
      onChange={handleChange}
      renderValue={(selected) => {
        if (selected === "") {
          return (
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Text
                fontWeight={500}
                fontSize={"12px"}
                color={palette.colorGray}
              >
                Sort by:
              </Text>
              <Text
                fontWeight={500}
                fontSize={"14px"}
                color={palette.textWhite}
              >
                Any
              </Text>
            </Stack>
          );
        }
        return (
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Text fontWeight={500} fontSize={"12px"} color={palette.colorGray}>
              Sort by:
            </Text>
            <Text fontWeight={500} fontSize={"14px"} color={palette.textWhite}>
              {selected}
            </Text>
          </Stack>
        );
      }}
      MenuProps={MenuProps}
      inputProps={{ "aria-label": "Without label" }}
      size="small"
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: `1px solid ${palette.borderMenu}`,
        },
        "& .mui-1hhzsab-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
          {
            backgroundColor: palette.bgMenu,
          },
        "&:hover": {
          "& .mui-1hhzsab-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
            {
              backgroundColor: palette.bgMenuHover,
            },
        },
      }}
    >
      {options.map((name) => (
        <MenuItem key={name} value={name}>
          <Text fontWeight={500} fontSize={"14px"} color={palette.colorGray}>
            {name}
          </Text>
        </MenuItem>
      ))}
    </Select>
  );
};

export default memo(SelectOptions);
