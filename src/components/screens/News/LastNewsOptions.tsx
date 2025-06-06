"use client";

import FormDateAdded from "@components/FormDateAdded";
import { getSortBlog } from "@components/helper";
import { Search, SelectOptions } from "@components/shared";
import FormOption from "@components/shared/FormOption";
import { SortByBlog, Tag } from "@constant/enum";
import { SelectChangeEvent, Stack } from "@mui/material";
import { useBlog } from "@store/new";
import { palette } from "public/material";
import { memo } from "react";
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
  const { tags, setTags, sortBy, setSortByBlog, search, setSearch } = useBlog();

  const handleChange = (event: SelectChangeEvent) => {
    setSortByBlog(event.target.value as SortByBlog);
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
            options={Object.keys(SortByBlog)}
            setSelected={setSortByBlog}
            getSort={getSortBlog}
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

      <FormOption
        title={"Tag"}
        data={Tag}
        setArray={setTags}
        arrayKey={tags}
        isValue={false}
        label={Object.keys(Tag)}
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
