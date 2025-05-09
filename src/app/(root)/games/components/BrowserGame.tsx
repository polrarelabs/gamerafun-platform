/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button, Image, Text } from "@components/shared";
import AndroidIcon from "@icons/AndroidIcon";
import CloseIcon from "@icons/CloseIcon";
import GameIcon from "@icons/GameIcon";
import IosIcon from "@icons/IosIcon";
import MacIcon from "@icons/MacIcon";
import WebsiteIcon from "@icons/WebsiteIcon";
import WindowsIcon from "@icons/WindowsIcon";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useGame, useGameReducers } from "@store/game";
import img from "public/images/img-logo.png";
import { memo, useEffect, useState } from "react";
import LayoutGameFull from "./LayoutGameFull";
import { breakpoints } from "public/material";
import LayoutGameSmall from "./LayoutGameSmall";
import { Theme } from "@mui/material/styles";

interface Props {
  isLayoutMD: boolean;
  theme: any | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayLayout: string;
  setDisplayLayout: React.Dispatch<React.SetStateAction<string>>;
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const BrowserGame = ({
  isLayoutMD,
  theme,
  setOpen,
  displayLayout,
  setDisplayLayout,
}: Props) => {
  const { setEditorRating, setUserRating, valueEditorRating, valueUserRating } =
    useGameReducers();

  const { error, loading, data, fetchGetGame } = useGame();
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
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const getIcon = (array: string[]) => {
    const arrayNew: any[] = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "WINDOWS") arrayNew.push(<WindowsIcon />);
      else if (array[i] === "MAC") arrayNew.push(<MacIcon />);
      else if (array[i] === "WEB") arrayNew.push(<WebsiteIcon />);
      else if (array[i] === "ANDROID") arrayNew.push(<AndroidIcon />);
      else if (array[i] === "IOS") arrayNew.push(<IosIcon />);
    }
    return arrayNew;
  };

  useEffect(() => {
    if (isSm) setDisplayLayout("no-list");
    else setDisplayLayout("list");
  }, [isSm]);

  return (
    <>
      <Stack direction={"column"} gap={2} flex={{ lg: 5, xs: 4 }}>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <GameIcon sx={{ color: "#9CA3AF" }} />
          <Stack direction={"row"} alignItems={"end"} gap={2}>
            <Text color="white" fontSize={"20px"} fontWeight={700}>
              Browse Games
            </Text>
            <Text color="#9CA3AF" fontSize={"14px"} fontWeight={400}>
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
            <Select
              multiple
              displayEmpty
              value={personName}
              onChange={handleChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <Text fontWeight={500} fontSize={"12px"} color="#9CA3AF">
                        Sort by:
                      </Text>
                      <Text fontWeight={500} fontSize={"14px"} color="#F9FAFB">
                        Any
                      </Text>
                    </Stack>
                  );
                }
                return `Sort by: ${selected.join(", ")}`;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
              size="small"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #1f293780",
                },
                "& .mui-1hhzsab-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                  {
                    backgroundColor: "#111827",
                  },
                "&:hover": {
                  "& .mui-1hhzsab-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                    {
                      backgroundColor: "#1f2937",
                    },
                },
              }}
            >
              {/* <MenuItem disabled value="">
              <em>Placeholder</em>
            </MenuItem> */}
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  <Text fontWeight={500} fontSize={"14px"} color="#9CA3AF">
                    {name}
                  </Text>
                </MenuItem>
              ))}
            </Select>

            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              sx={{
                borderRadius: "8px !important",
                height: "40px !important",
                color: "#7dffac !important",
                background:
                  "color-mix(in srgb, #33F57A, transparent 85%) !important",
                "&:hover": {
                  color: "black !important",
                  background: " #7dffac !important",
                },
              }}
              size={"small"}
              fullWidth
            >
              Fillters
            </Button>
          </Stack>
        )}
        <Stack direction={"row"} gap={2}>
          {valueEditorRating !== 0 && (
            <Stack
              direction={"row"}
              gap={1}
              alignItems={"center"}
              border={"1px solid #1f2937"}
              p={"4px 8px"}
              borderRadius={"4px"}
            >
              <Text
                textTransform={"uppercase"}
                color="#9CA3AF"
                fontSize={"12px"}
                fontWeight={600}
              >
                Editor rating
              </Text>
              <Text
                color="#33F57A"
                fontSize={"12px"}
                fontWeight={600}
                textTransform={"uppercase"}
                sx={{
                  backgroundColor:
                    "color-mix(in srgb, #33F57A, transparent 85%)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                above {valueEditorRating}
              </Text>
              <Stack
                fontSize={"8px"}
                borderRadius={"1000px"}
                bgcolor={"#9ca3af"}
                color={"#111111"}
                p={"3px"}
                sx={{
                  "&:hover": {
                    backgroundColor: "#6b7280",
                    cursor: "pointer",
                  },
                }}
                onClick={() => setEditorRating(0)}
              >
                <CloseIcon />
              </Stack>
            </Stack>
          )}
          {valueUserRating !== 0 && (
            <Stack
              direction={"row"}
              gap={1}
              alignItems={"center"}
              border={"1px solid #1f2937"}
              p={"4px 8px"}
              borderRadius={"4px"}
            >
              <Text
                textTransform={"uppercase"}
                color="#9CA3AF"
                fontSize={"12px"}
                fontWeight={600}
              >
                User rating
              </Text>
              <Text
                color="#33F57A"
                fontSize={"12px"}
                fontWeight={600}
                textTransform={"uppercase"}
                sx={{
                  backgroundColor:
                    "color-mix(in srgb, #33F57A, transparent 85%)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                above {valueUserRating}
              </Text>
              <Stack
                fontSize={"8px"}
                borderRadius={"1000px"}
                bgcolor={"#9ca3af"}
                color={"#111111"}
                p={"3px"}
                sx={{
                  "&:hover": {
                    backgroundColor: "#6b7280",
                    cursor: "pointer",
                  },
                }}
                onClick={() => setUserRating(0)}
              >
                <CloseIcon />
              </Stack>
            </Stack>
          )}
        </Stack>
        <Stack
          display={"grid"}
          gridTemplateColumns={{
            xl: "repeat(6, 1fr)",
            lg: "repeat(4, 1fr)",
            sm: "repeat(2, 1fr)",
          }}
          gap={2}
        >
          {data?.map((item, index) => {
            return (
              <Box key={index}>
                {displayLayout === "no-list" ? (
                  <LayoutGameFull
                    index={index}
                    img={img}
                    hover={hover}
                    setHover={setHover}
                    setId={setId}
                    id={id}
                    item={item}
                    getIcon={getIcon}
                  />
                ) : (
                  <LayoutGameSmall
                    index={index}
                    img={img}
                    hover={hover}
                    setHover={setHover}
                    setId={setId}
                    id={id}
                    item={item}
                    getIcon={getIcon}
                  />
                )}
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </>
  );
};

export default memo(BrowserGame);
