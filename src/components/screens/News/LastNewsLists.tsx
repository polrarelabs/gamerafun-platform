/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SelectOptions, Text } from "@components/shared";
import { SelectChangeEvent, Stack } from "@mui/material";
import img from "public/images/img-logo.png";
import { palette } from "public/material";
import React, { memo, useEffect, useState } from "react";
import ButtonFillters from "@components/shared/ButtonFillters";
import { CardBlog } from "./components";

interface Props {
  isLayoutMD: boolean;
  theme: any | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayLayout: string;
  setDisplayLayout: React.Dispatch<React.SetStateAction<string>>;
}

const LastNewsLists = ({
  isLayoutMD,
  setOpen,
  displayLayout,
  setDisplayLayout,
}: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

  const names = ["OptionSelect1", "OptionSelect2", "OptionSelect3"];

  const [selected, setSelected] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };
  useEffect(() => {
    if (isLayoutMD) setDisplayLayout("no-list");
    else setDisplayLayout("list");
  }, [isLayoutMD]);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Stack flex={5} direction={"column"} gap={4}>
      <Stack>
        <Text color={palette.textWhite} fontWeight={700} fontSize={"31px"}>
          Latest News
        </Text>
      </Stack>
      {!isLayoutMD && (
        <Stack
          alignItems={"center"}
          gap={2}
          height={"100%"}
          display={"grid"}
          gridTemplateColumns={"repeat(2,1fr)"}
        >
          <SelectOptions
            selected={selected}
            handleChange={handleChange}
            options={names}
          />

          <ButtonFillters handleOpen={handleOpen} />
        </Stack>
      )}
      <Stack
        display={"grid"}
        gridTemplateColumns={{
          xl: displayLayout === "list" ? "repeat(1,1fr)" : "repeat(4,1fr)",
          lg: displayLayout === "list" ? "repeat(1,1fr)" : "repeat(3,1fr)",
          md: displayLayout === "list" ? "repeat(1,1fr)" : "repeat(2,1fr)",
          xs: displayLayout === "list" ? "repeat(1,1fr)" : "repeat(1,1fr)",
        }}
        gap={4}
      >
        {Array.from({ length: 12 }).map((_, index) => {
          return (
            <CardBlog
              key={index}
              hover={hover}
              setHover={setHover}
              img={img}
              setId={setId}
              index={index}
              id={id}
              displayLayout={displayLayout}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default memo(LastNewsLists);
