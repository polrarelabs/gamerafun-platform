"use client";

import SearchIcon from "@icons/common/SearchIcon";
import { InputBase } from "@mui/material";
import { typography } from "public/material";
import { memo, useState } from "react";

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
        ...typography.subtitle2,
        px: 1.5,
        py: 1.1875,
        bgcolor: "background.paper",
        borderRadius: "5px",
        border: "1px solid",
        borderColor: "grey.700",
        ml: 2,
        "&:focus-within": {
          borderColor: "primary.main",
        },
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
