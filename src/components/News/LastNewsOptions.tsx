"use client";

import { Button, SelectOptions, Text } from "@components/shared";
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

interface PropsLastNew {
  isLayoutMD: boolean;
  displayLayout: string;
  setDisplayLayout: React.Dispatch<React.SetStateAction<string>>;
}

const LastNewsOptions = ({
  isLayoutMD,
  displayLayout,
  setDisplayLayout,
}: PropsLastNew) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const names = ["OptionSelect1", "OptionSelect2", "OptionSelect3"];

  const [selected, setSelected] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };

  const handleSetLayout = (value: string) => {
    setDisplayLayout(value);
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
          <SelectOptions
            selected={selected}
            handleChange={handleChange}
            options={names}
          />
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
                color: displayLayout === "no-list" ? "#33f57a" : "#9ca3af",
                background:
                  displayLayout === "no-list"
                    ? "color-mix(in srgb,#33f57a,transparent 85%)"
                    : "inherit",
                borderRadius: "4px",
                fontSize: 20,
                "&:hover": {
                  cursor: displayLayout !== "no-list" ? "pointer" : undefined,
                  color: displayLayout !== "no-list" ? "#F9FAFB" : undefined,
                },
              }}
              onClick={() => handleSetLayout("no-list")}
            >
              <RiLayoutGridFill />
            </Stack>
            <Stack
              sx={{
                padding: "4px 6px",
                color: displayLayout === "list" ? "#33f57a" : "#9ca3af",
                background:
                  displayLayout === "list"
                    ? "color-mix(in srgb,#33f57a,transparent 85%)"
                    : "inherit",
                borderRadius: "4px",
                fontSize: 20,
                "&:hover": {
                  cursor: displayLayout !== "list" ? "pointer" : undefined,
                  color: displayLayout !== "list" ? "#F9FAFB" : undefined,
                },
              }}
              onClick={() => handleSetLayout("list")}
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
                  borderRadius: "8px",
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
          <Stack>
            <Button
              variant="contained"
              sx={{
                borderRadius: "8px !important",
                color: "#F9FAFB !important",
                background: "#6b728026 !important",
                border: "1px solid #4b556333 !important",
                mt: 2,
              }}
              onClick={() => setChecked("all")}
            >
              Clear All
            </Button>
          </Stack>
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
