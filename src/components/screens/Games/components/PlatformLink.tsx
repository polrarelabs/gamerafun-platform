"use client";

import { Button, IconButton, Text, TextField } from "@components/shared";
import Select from "@components/shared/Select"; // dùng Select custom của bạn
import { Platform } from "@constant/enum";
import { Option } from "@constant/types";
import { PlatformLinkProps } from "@store/game/type";
import { InputBase, Stack } from "@mui/material";
import React, { memo, useEffect, useMemo, useState } from "react";
import { typography } from "public/material";

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

  const platformOptions: Option[] = useMemo(() => {
    return Object.keys(Platform).map((key) => ({
      label: key,
      value: Platform[key],
    }));
  }, []);

  const usedPlatforms = useMemo(() => {
    return data.map((item) => Object.keys(item)[0]);
  }, [data]);

  const handleClick = () => {
    setDataFake((prev) => [...prev, { platform: "", path: "" }]);
  };

  const handleChangePlatform = (selected: string[], index: number) => {
    const arr = [...dataFake];
    arr[index].platform = selected[0] || "";
    setDataFake(arr);
  };

  const handleChangePath = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const arr = [...dataFake];
    arr[index].path = event.target.value;
    setDataFake(arr);
  };

  const handleDelete = (index: number) => {
    const arr = [...dataFake];
    arr.splice(index, 1);
    setDataFake(arr);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const mapped = data.map((item) => {
        const platform = Object.keys(item)[0];
        const path = item[platform];
        return { platform, path };
      });
      setDataFake(mapped);
    }
  }, [data]);

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

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" gap={2} flex={1} alignItems="center">
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
        <Stack width="100%" direction="column" gap={2}>
          <Stack direction="row" gap={2} width="100%">
            <Stack flex={1}>
              <Text>Platform</Text>
            </Stack>
            <Stack flex={2}>
              <Text>Link</Text>
            </Stack>
          </Stack>

          {dataFake.map((item, index) => (
            <Stack key={index} direction="row" width="100%" gap={2}>
              <Stack flex={1}>
                <Select
                  value={item.platform}
                  onChange={(val) =>
                    handleChangePlatform(val as string[], index)
                  }
                  options={platformOptions}
                  placeholder=""
                  ignoreIds={usedPlatforms.filter((p) => p !== item.platform)}
                  showPlaceholder
                  isFilter
                  // error={!item.platform}
                  // disabled={isDisable}
                />
              </Stack>

              <Stack flex={2} direction="row" gap={2} alignItems="center">
                <TextField
                  fullWidth
                  value={item.path}
                  onChangeText={(newValue) => {
                    handleChangePath(
                      {
                        target: { value: newValue ?? "" },
                      } as React.ChangeEvent<HTMLInputElement>,
                      index,
                    );
                  }}
                  disabled={isDisable}
                  sx={{
                    ...typography.subtitle2,
                    height: "100%",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "transparent",
                    "&:hover": {
                      borderColor: "grey.400",
                    },
                    "&:focus-within": {
                      borderColor: "primary.main",
                    },
                  }}
                />
                <IconButton
                  sx={{ height: 30, width: 30 }}
                  onClick={() => handleDelete(index)}
                >
                  -
                </IconButton>
              </Stack>
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default memo(PlatformLink);
