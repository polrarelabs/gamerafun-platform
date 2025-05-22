"use client";

import FormDateAdded from "@components/FormDateAdded";
import { getSort } from "@components/helper";
import { Search, SelectOptions, Text } from "@components/shared";
import FormListOption from "@components/shared/FormListOption";
import { SortBy, Tag } from "@constant/enum";
import SearchIcon from "@icons/common/SearchIcon";
import { InputBase, SelectChangeEvent, Stack } from "@mui/material";
import { useBlog } from "@store/new";
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
  const { tags, setTags, sortBy, setSortBy, search, setSearch } = useBlog();

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SortBy);
  };

  const handleSetLayout = (value: string) => {
    setDisplayLayout(value);
  };

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
            selected={sortBy}
            options={Object.keys(SortBy)}
            setSelected={setSortBy}
            getSort={getSort}
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
      <Search setSearch={setSearch} placeholder="Search for news" />

      <FormListOption
        name={"Tag"}
        data={Tag}
        setArray={setTags}
        arrayKey={tags}
        isValue={false}
      />

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
