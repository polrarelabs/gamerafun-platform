/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button, SelectOptions, Text } from "@components/shared";
import GameIcon from "@icons/GameIcon";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useGame } from "@store/game";
import img from "public/images/img-logo.png";
import { memo, useEffect, useState } from "react";
import Selected from "../../../shared/Selected";
import GenresItem from "./GenresItem";
import { palette } from "public/material";

interface Props {
  isLayoutMD: boolean;
  theme: any | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayLayout: string;
  setDisplayLayout: React.Dispatch<React.SetStateAction<string>>;
}

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//   return {
//     fontWeight: personName.includes(name)
//       ? theme.typography.fontWeightMedium
//       : theme.typography.fontWeightRegular,
//   };
// }

const BrowserGenres = ({
  isLayoutMD,
  theme,
  setOpen,
  displayLayout,
  setDisplayLayout,
}: Props) => {
  const { data, fetchGetGame } = useGame();
  const [hover, setHover] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    fetchGetGame();
  }, []);

  const names = ["OptionSelect1", "OptionSelect2", "OptionSelect3"];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        // width: 250,
      },
    },
  };
  const [selected, setSelected] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };

  useEffect(() => {
    if (isSm) setDisplayLayout("no-list");
    else setDisplayLayout("list");
  }, [isSm]);

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
              handleChange={handleChange}
              options={names}
            />
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              sx={{
                borderRadius: "8px !important",
                height: "40px !important",
                color: `${palette.greenColorText} !important`,
                background: `${palette.greenColorButton} !important`,
                "&:hover": {
                  color: "black !important",
                  background: `${palette.greenColorText} !important`,
                },
              }}
              size={"small"}
              fullWidth
            >
              Fillters
            </Button>
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
          <GenresItem
            id={id}
            img={img}
            hover={hover}
            setHover={setHover}
            setId={setId}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default memo(BrowserGenres);
