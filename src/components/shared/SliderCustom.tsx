import { GetColor } from "@components/screens/Games/components/helper";
import { Text, Tooltip } from "@components/shared";
import { Slider, Stack } from "@mui/material";
import { palette } from "public/material";
import React, { memo, useMemo } from "react";
import { BsFillHexagonFill } from "react-icons/bs";

interface SliderCustomProps {
  value: number;
  handleChange: (_event: Event, newValue: number | number[]) => void;
  title: string;
}

const SliderCustom = ({ value, handleChange, title }: SliderCustomProps) => {
  const thumbColor = useMemo(() => {
    if (typeof value !== "number" || value === 0) return palette.colorGray;

    const color = GetColor(value);
    return color;
  }, [value]);

  return (
    <Stack direction={"column"} gap={1}>
      <Text color={palette.colorGray} fontSize={"12px"}>
        {title}
      </Text>
      <Stack gap={1} display={"flex"} direction={"row"} pl={1}>
        <Stack flex={5} direction={"row"} alignItems={"center"}>
          <Slider
            max={10}
            min={0}
            // step={0.1}
            value={typeof value === "number" ? value : 0}
            onChange={handleChange}
            aria-labelledby="input-slider"
            sx={{
              height: "0.25rem",
              width: "100%",
              "& .MuiSlider-track": {
                border: "none",
                backgroundColor: palette.bgMenu,
              },
              "& .MuiSlider-rail": {
                background:
                  value === 0 ? palette.bgMenu : palette.colorGame?.colorLinear,
                opacity: 1,
              },
              "& .MuiSlider-thumb": {
                height: 16,
                width: 16,
                backgroundColor: thumbColor?.toString(),
                border: "none",
                "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                  boxShadow: "inherit",
                },
                "&::before": {
                  display: "none",
                },
              },
            }}
          />
        </Stack>
        <Tooltip
          title={`This game have a rating of ${value}/10`}
          placement="top"
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: palette.colorGray,
          }}
        >
          <Stack
            flex={1}
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
          >
            <BsFillHexagonFill
              size={40}
              style={{
                color:
                  value === 0
                    ? palette.colorGame?.color
                    : thumbColor?.toString(),
              }}
            />
            <Text
              fontSize={"16px"}
              fontWeight={700}
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                translate: "-50% -50%",
                color: value === 0 ? palette.colorGray : "black",
              }}
            >
              {value === 0 ? "-" : value}
            </Text>
          </Stack>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default memo(SliderCustom);
