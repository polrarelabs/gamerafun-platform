"use client";

import SearchIcon from "@icons/common/SearchIcon";
import { InputBase } from "@mui/material";
import { palette } from "public/material";
import React, { memo, useState } from "react";

interface SearchProps {
  setSearch: (value: string) => void;
  placeholder: string;
}

const Search = ({ setSearch, placeholder }: SearchProps) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e) => {
    const tmp = e.target.value;
    if (tmp.length > 0) setValue(tmp);
    else setValue("");
  };

  const handleEnter = () => {
    setValue("");
    setSearch(value);
  };

  return (
    <InputBase
      placeholder={placeholder}
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
      value={value}
      onChange={handleChange}
      onKeyDown={(key) => {
        if (key.key === "Enter") {
          handleEnter();
        }
      }}
    />
  );
};

export default memo(Search);
