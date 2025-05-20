"use client";

import FormDateAdded from "@components/FormDateAdded";
import { SelectOptions, Text } from "@components/shared";
import SearchIcon from "@icons/SearchIcon";
import { InputBase, SelectChangeEvent, Stack } from "@mui/material";
import { palette } from "public/material";
import { memo, useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { RiLayoutGridFill } from "react-icons/ri";

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
  const names = ["OptionSelect1", "OptionSelect2", "OptionSelect3"];

  const [selected, setSelected] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };

  const handleSetLayout = (value: string) => {
    setDisplayLayout(value);
  };

  const [showTag, setShowTag] = useState<boolean>(false);

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
              background: palette.bgMenu,
              borderRadius: "4px",
              minHeight: "100%",
              padding: "8px 12px",
            }}
            gap={2}
          >
            {OPTION_LAYOUT.map((item, index) => {
              return (
                <Stack
                  key={index}
                  sx={{
                    padding: "4px 6px",
                    color:
                      displayLayout === item.type
                        ? palette.greenColor
                        : palette.colorGray,
                    background:
                      displayLayout === item.type
                        ? palette.greenColorButton
                        : "inherit",
                    borderRadius: "4px",
                    fontSize: 20,
                    "&:hover": {
                      cursor:
                        displayLayout !== item.type ? "pointer" : undefined,
                      color:
                        displayLayout !== item.type
                          ? palette.textWhite
                          : undefined,
                    },
                  }}
                  onClick={() => handleSetLayout(item.type)}
                >
                  {item.ICON}
                </Stack>
              );
            })}
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
            backgroundColor: palette.bgMenuHover,
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
            color={palette.greenColor}
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

      <FormDateAdded />
    </Stack>
  );
};

export default memo(LastNewsOptions);

const OPTION_LAYOUT = [
  {
    type: "no-list",
    ICON: <RiLayoutGridFill />,
  },
  {
    type: "list",
    ICON: <FaListAlt />,
  },
];

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
