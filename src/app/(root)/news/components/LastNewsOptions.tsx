"use client";

import { Text } from "@components/shared";
import { RiLayoutGridFill } from "react-icons/ri";
import { FaListAlt } from "react-icons/fa";
import {
  Checkbox,
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { memo, useState } from "react";
import SearchIcon from "@icons/SearchIcon";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import LensIcon from "@mui/icons-material/Lens";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface PropsLastNew {
  isLayoutMD: boolean;
}

const LastNewsOptions = ({ isLayoutMD }: PropsLastNew) => {
  const theme = useTheme();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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

  const [selectLayout, setSelectLayout] = useState<string>("layout1");

  const handleSetLayout = (value: string) => {
    setSelectLayout(value);
  };

  const [showTag, setShowTag] = useState<boolean>(false);

  const [checked, setChecked] = useState<string>("all");

  return (
    <Stack flex={1} direction={"column"} gap={4}>
      {isLayoutMD && (
        <Stack
          direction={"row"}
          gap={2}
          alignItems={"center"}
          justifyContent={"end"}
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
          <Stack
            direction={"row"}
            alignItems={"center"}
            height={"100%"}
            sx={{
              background: "#111827",
              borderRadius: "4px",
              minHeight: "100%",
              padding: "8px 12px",
            }}
            gap={2}
          >
            <Stack
              sx={{
                padding: "4px 6px",
                color: selectLayout === "layout1" ? "#33f57a" : "#9ca3af",
                background:
                  selectLayout === "layout1"
                    ? "color-mix(in srgb,#33f57a,transparent 85%)"
                    : "inherit",
                borderRadius: "4px",
                fontSize: 20,
                "&:hover": {
                  cursor: selectLayout !== "layout1" ? "pointer" : undefined,
                  color: selectLayout !== "layout1" ? "#F9FAFB" : undefined,
                },
              }}
              onClick={() => handleSetLayout("layout1")}
            >
              <RiLayoutGridFill />
            </Stack>
            <Stack
              sx={{
                padding: "4px 6px",
                color: selectLayout === "layout2" ? "#33f57a" : "#9ca3af",
                background:
                  selectLayout === "layout2"
                    ? "color-mix(in srgb,#33f57a,transparent 85%)"
                    : "inherit",
                borderRadius: "4px",
                fontSize: 20,
                "&:hover": {
                  cursor: selectLayout !== "layout2" ? "pointer" : undefined,
                  color: selectLayout !== "layout2" ? "#F9FAFB" : undefined,
                },
              }}
              onClick={() => handleSetLayout("layout2")}
            >
              <FaListAlt />
            </Stack>
          </Stack>
        </Stack>
      )}
      <Stack>
        <InputBase
          placeholder="Search for news"
          startAdornment={
            <SearchIcon
              sx={{
                height: 20,
                width: 20,
                mr: 1,
              }}
            />
          }
          sx={{
            border: "none !important",
            backgroundColor: "#1f2937",
            padding: "8px 16px",
            borderRadius: "6px",
          }}
        />
      </Stack>

      {/* tag */}
      <Stack direction={"column"} gap={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text color="white" fontSize={"16px"} fontWeight={500}>
            Tags
          </Text>
          <Text
            color="#33F57A"
            fontSize={"14px"}
            fontWeight={500}
            sx={{
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
            onClick={() => setShowTag(!showTag)}
          >
            {!showTag ? "Show More" : "Show Less"}
          </Text>
        </Stack>
        <Stack direction={"column"} gap={2}>
          {showTag ? (
            <>
              {Object.keys(TAGS).map((item, index) => {
                const value = Object.values(TAGS);
                return (
                  <Stack
                    key={index}
                    direction={"row"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <Text color={"#9CA3AF"} fontSize={"14px"} fontWeight={500}>
                      {item}
                    </Text>
                    <Text color={"#9CA3AF"} fontSize={"12px"} fontWeight={500}>
                      {value[index]}
                    </Text>
                  </Stack>
                );
              })}
            </>
          ) : (
            <>
              {Object.keys(TAGS).map((item, index) => {
                const value = Object.values(TAGS);
                if (index < 6) {
                  return (
                    <Stack
                      key={index}
                      direction={"row"}
                      alignItems={"center"}
                      gap={2}
                    >
                      <Text
                        color={"#9CA3AF"}
                        fontSize={"14px"}
                        fontWeight={500}
                      >
                        {item}
                      </Text>
                      <Text
                        color={"#9CA3AF"}
                        fontSize={"12px"}
                        fontWeight={500}
                      >
                        {value[index]}
                      </Text>
                    </Stack>
                  );
                }
              })}
            </>
          )}
        </Stack>
      </Stack>

      {/* data added */}
      <Stack direction={"column"} gap={2}>
        <Stack>
          <Text color="white" fontSize={"16px"} fontWeight={500}>
            Data Added
          </Text>
        </Stack>
        <Stack direction={"column"}>
          {DATAADDED.map((item, index) => {
            return (
              <Stack
                key={index}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                onClick={() => setChecked(item.key)}
                sx={{
                  backgroundColor: item.key === checked ? "#171F2C" : undefined,
                  "&:hover": {
                    backgroundColor:
                      item.key === checked ? "#171F2C" : "#171f2cb5",
                  },
                }}
              >
                <Stack direction={"row"} alignItems={"center"} pl={1} gap={2}>
                  <CalendarMonthIcon
                    sx={{
                      color: "#9CA3AF",
                      fontSize: 18,
                    }}
                  />
                  <Text
                    color={item.key === checked ? "white" : "#9CA3AF"}
                    fontSize={"14px"}
                    fontWeight={500}
                  >
                    {item.title}
                  </Text>
                </Stack>
                <Checkbox
                  checked={checked === item.key}
                  {...label}
                  icon={
                    <LensIcon
                      sx={{
                        color: "#1F2937",
                      }}
                    />
                  }
                  checkedIcon={
                    <RadioButtonCheckedIcon
                      sx={{
                        color: "#33F57A",
                      }}
                    />
                  }
                />
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(LastNewsOptions);

const TAGS = {
  "Game Updates": 100,
  "Press Release": 266,
  Partnerships: 100,
  Investments: 266,
  Sponsored: 100,
  "GAM3 Awards": 266,
  "Best of": 100,
  "Creator Academy": 266,
};

const DATAADDED = [
  {
    key: "all",
    title: "All Time",
  },
  {
    key: "7days",
    title: "Last 7 days",
  },
  {
    key: "30days",
    title: "Last 30 days",
  },
  {
    key: "6months",
    title: "Last 6 months",
  },
  {
    key: "12months",
    title: "Last 12 months",
  },
];
