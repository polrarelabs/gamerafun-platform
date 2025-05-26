/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { getSort } from "@components/helper";
import Selected from "@components/Selected";
import { SelectOptions, Text } from "@components/shared";
import ButtonFillters from "@components/shared/ButtonFillters";
import CardItem from "@components/shared/CardItem";
import useBreakpoint from "@hooks/useBreakpoint";
import GameIcon from "@icons/web3/GameIcon";
import { SelectChangeEvent, Stack, useMediaQuery } from "@mui/material";
import { useGame } from "@store/game";
import { palette } from "public/material";
import { memo, useEffect, useState } from "react";
interface Props {
  isLayoutMD: boolean;
  theme: any | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayLayout: string;
  setDisplayLayout: React.Dispatch<React.SetStateAction<string>>;
}

const BrowserGenres = ({
  isLayoutMD,
  theme,
  setOpen,
  displayLayout,
  setDisplayLayout,
}: Props) => {
  const { dataListGame: data, fetchGetGame } = useGame();

  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const { isSmSmaller } = useBreakpoint();
  useEffect(() => {
    fetchGetGame();
  }, []);

  const names = ["OptionSelect1", "OptionSelect2", "OptionSelect3"];
  const [selected, setSelected] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };

  useEffect(() => {
    if (isSm) setDisplayLayout("no-list");
    else setDisplayLayout("list");
  }, [isSm]);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Stack direction={"column"} gap={2} flex={{ lg: 5, xs: 4 }}>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <GameIcon sx={{ color: palette.colorGray }} />
          <Stack direction={"row"} alignItems={"end"} gap={2}>
            <Text color="white" fontSize={"20px"} fontWeight={700}>
              Browse Auto Battler Games
            </Text>
            <Text color={palette.colorGray} fontSize={"14px"} fontWeight={400}>
              {data.length} results
            </Text>
          </Stack>
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
              setSelected={setSelected}
              options={names}
              getSort={getSort}
            />
            <ButtonFillters handleOpen={handleOpen} />
          </Stack>
        )}
        <Selected />
        <Stack
          display={"grid"}
          gridTemplateColumns={{
            xl: "repeat(5, 1fr)",
            lg: "repeat(4, 1fr)",
            sm: "repeat(2, 1fr)",
          }}
          gap={2}
        >
          {data.map((item, index) => {
            return (
              <CardItem
                key={index}
                index={index}
                data={item}
                title={"Title"}
                isSmaller={isSmSmaller}
              />
            );
          })}
        </Stack>
      </Stack>
    </>
  );
};

export default memo(BrowserGenres);
