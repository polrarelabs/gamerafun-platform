"use client";

import { Button, Text } from "@components/shared";
import SelectFormik from "@components/shared/SelectFormik";
import { Option } from "@constant/types";
import {
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  SelectChangeEvent,
} from "@mui/material";
import { PlatformLinkProps } from "@store/game/type";
import React, { memo, useEffect, useState } from "react";

interface PropsPlatformLink {
  data: PlatformLinkProps[];
  setData: React.Dispatch<React.SetStateAction<PlatformLinkProps[]>>;
  isDisable?: boolean;
}

const PlatformLink = ({
  data,
  setData,
  isDisable = false,
}: PropsPlatformLink) => {
  const [value, setValue] = useState<string>("");

  const options: Option[] = [
    {
      label: "Windows",
      value: "windows",
    },
    {
      label: "MacOS",
      value: "macos",
    },
  ];

  const [option, setOption] = useState<Option[]>([]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    const newDate: PlatformLinkProps[] = [...data];
    newDate.push({
      [selectedValue]: "",
    });
    setData(newDate);
  };

  useEffect(() => {
    setOption(options);
  }, []);

  const handleClick = () => {};

  return (
    <Stack direction={"row"} gap={2}>
      <Stack direction={"column"} gap={1} flex={1}>
        <Text>Platform Link</Text>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setValue("");
            setData([]);
          }}
          sx={{
            borderRadius: "8px !important",
            width: "max-content",
            padding: "4px 8px",
          }}
        >
          +
        </Button>
        <Select
          value={value}
          onChange={handleChange}
          input={<OutlinedInput />}
          disabled={isDisable}
          fullWidth
        >
          {options.map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
              disabled={data.some((d) => Object.keys(d)[0] === item.value)}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      {data.length > 0 && (
        <Stack flex={2} direction={"column"} gap={2}>
          {data.map((item, index) => {
            return <Stack key={index} direction={"row"} gap={2}></Stack>;
          })}
        </Stack>
      )}
    </Stack>
  );
};

export default memo(PlatformLink);
