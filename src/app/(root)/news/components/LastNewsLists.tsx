/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Text } from "@components/shared";
import { MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { Theme } from "@mui/material/styles";
import img from "public/images/img-logo.png";
import React, { memo, useEffect, useState } from "react";
import LastNewsFull from "./LastNewsFull";
import LastNewsSmall from "./LastNewsSmall";

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface Props {
  isLayoutMD: boolean;
  theme: any | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayLayout: string;
  setDisplayLayout: React.Dispatch<React.SetStateAction<string>>;
}

const LastNewsLists = ({
  isLayoutMD,
  theme,
  setOpen,
  displayLayout,
  setDisplayLayout,
}: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

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
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if (isLayoutMD) setDisplayLayout("no-list");
    else setDisplayLayout("list");
  }, [isLayoutMD]);

  return (
    <Stack flex={5} direction={"column"} gap={4}>
      <Stack>
        <Text color="#F9FAFB" fontWeight={700} fontSize={"31px"}>
          Latest News
        </Text>
      </Stack>
      {!isLayoutMD && (
        <Stack
          alignItems={"center"}
          gap={2}
          height={"100%"}
          display={"grid"}
          gridTemplateColumns={"repeat(2,1fr)"}
        >
          <Select
            multiple
            displayEmpty
            value={personName}
            onChange={handleChange}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <Text fontWeight={500} fontSize={"12px"} color="#9CA3AF">
                      Sort by:
                    </Text>
                    <Text fontWeight={500} fontSize={"14px"} color="#F9FAFB">
                      Any
                    </Text>
                  </Stack>
                );
              }
              return `Sort by: ${selected.join(", ")}`;
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
            size="small"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #1f293780",
              },
              "& .mui-1hhzsab-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                {
                  backgroundColor: "#111827",
                },
              "&:hover": {
                "& .mui-1hhzsab-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                  {
                    backgroundColor: "#1f2937",
                  },
              },
            }}
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
                <Text fontWeight={500} fontSize={"14px"} color="#9CA3AF">
                  {name}
                </Text>
              </MenuItem>
            ))}
          </Select>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              borderRadius: "8px !important",
              height: "40px !important",
              color: "#7dffac !important",
              background:
                "color-mix(in srgb, #33F57A, transparent 85%) !important",
              "&:hover": {
                color: "black !important",
                background: " #7dffac !important",
              },
            }}
            size={"small"}
            fullWidth
          >
            Fillters
          </Button>
        </Stack>
      )}
      <Stack
        display={"grid"}
        gridTemplateColumns={{
          xl: displayLayout === "list" ? "repeat(1,1fr)" : "repeat(4,1fr)",
          lg: displayLayout === "list" ? "repeat(1,1fr)" : "repeat(3,1fr)",
          md: displayLayout === "list" ? "repeat(1,1fr)" : "repeat(2,1fr)",
        }}
        gap={4}
      >
        {Array.from({ length: 12 }).map((_, index) => {
          return (
            <>
              {displayLayout !== "list" ? (
                <LastNewsFull
                  hover={hover}
                  setHover={setHover}
                  img={img}
                  setId={setId}
                  index={index}
                  id={id}
                />
              ) : (
                <LastNewsSmall
                  hover={hover}
                  setHover={setHover}
                  img={img}
                  setId={setId}
                  index={index}
                  id={id}
                />
              )}
            </>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default memo(LastNewsLists);
