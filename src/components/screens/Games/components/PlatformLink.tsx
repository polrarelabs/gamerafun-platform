"use client";

import { Button, IconButton, Text } from "@components/shared";
import SelectFormik from "@components/shared/SelectFormik";
import { Platform } from "@constant/enum";
import { Option } from "@constant/types";
import {
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { PlatformLinkProps } from "@store/game/type";
import React, { memo, useEffect, useState } from "react";

interface PropsPlatformLink {
  data: PlatformLinkProps[];
  setData: React.Dispatch<React.SetStateAction<PlatformLinkProps[]>>;
  isDisable?: boolean;
}

interface PlatFormItems {
  platform: string;
  path: string;
}

const PlatformLink = ({
  data,
  setData,
  isDisable = false,
}: PropsPlatformLink) => {
  const [dataFake, setDataFake] = useState<PlatFormItems[]>([]);

  const handleClick = () => {
    const newData: PlatFormItems[] = [...dataFake];
    newData.push({
      platform: "",
      path: "",
    });
    setDataFake(newData);
  };

  const handleChange = (event: SelectChangeEvent, index: number): void => {
    const arr: PlatFormItems[] = [...dataFake];
    arr[index].platform = event.target.value;
    setDataFake(arr);
  };
  const handleChangePath = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ): void => {
    const arr: PlatFormItems[] = [...dataFake];
    arr[index].path = event.target.value;
    setDataFake(arr);
  };

  useEffect(() => {
    const arr: PlatformLinkProps[] = [];
    dataFake.forEach((item) => {
      if (item.platform) {
        arr.push({
          [item.platform]: item.path,
        });
      }
    });
    setData(arr);
  }, [dataFake]);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const handleDelete = (index: number) => {
    const arr: PlatFormItems[] = [...dataFake];
    arr.splice(index, 1);
    setDataFake(arr);
  };

  return (
    <Stack direction={"column"} gap={2}>
      <Stack direction={"row"} gap={2} flex={1} alignItems={"center"}>
        <Text>Platform Link</Text>
        <Button
          variant="outlined"
          size="small"
          onClick={handleClick}
          sx={{
            borderRadius: "8px !important",
            width: "max-content",
            padding: "4px 8px",
          }}
        >
          +
        </Button>
      </Stack>

      {dataFake.length > 0 && (
        <Stack width={"100%"} direction={"column"} gap={2}>
          <Stack direction={"row"} gap={2} width={"100%"}>
            <Stack flex={1}>
              <Text>Platform</Text>
            </Stack>
            <Stack flex={2}>
              <Text>Link</Text>
            </Stack>
          </Stack>
          {dataFake.map((item, index) => {
            return (
              <Stack key={index} direction={"row"} width={"100%"} gap={2}>
                <Stack flex={1}>
                  <Select
                    value={item.platform}
                    onChange={(e) => handleChange(e, index)}
                    input={<OutlinedInput />}
                    disabled={isDisable}
                    fullWidth
                  >
                    {Object.keys(Platform).map((item, index) => (
                      <MenuItem
                        key={index}
                        value={Platform[item]}
                        disabled={data.some(
                          (d) => Object.keys(d)[0] === Platform[item],
                        )}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                <Stack flex={2} direction={"row"} gap={2} alignItems={"center"}>
                  <TextField
                    fullWidth
                    value={item.path}
                    onChange={(e) => handleChangePath(e, index)}
                    sx={{
                      "& .mui-1v24f9t-MuiOutlinedInput-notchedOutline": {
                        borderColor: "none !important",
                      },
                    }}
                  />
                  <IconButton
                    sx={{
                      height: 30,
                      width: 30,
                    }}
                    onClick={() => handleDelete(index)}
                  >
                    -
                  </IconButton>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
};

export default memo(PlatformLink);
