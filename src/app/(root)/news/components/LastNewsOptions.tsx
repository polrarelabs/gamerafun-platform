"use client";

import { Text } from "@components/shared";
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React, { memo, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const LastNewsOptions = () => {
  const theme = useTheme();
  const names = ["OptionSelect1", "OptionSelect2", "OptionSelect3"];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <Stack flex={1} direction={"column"} gap={4}>
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <FormControl
          sx={{ m: 1, width: 300, mt: 3, border: "none !important" }}
        >
          <Select
            multiple
            displayEmpty
            value={personName}
            onChange={handleChange}
            sx={{
              border: "none !important",
              backgroundColor: "transparent !important",
            }}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return "Any";
              }
              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            {/* <MenuItem disabled value="">
              <em>Placeholder</em>
            </MenuItem> */}
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default memo(LastNewsOptions);
