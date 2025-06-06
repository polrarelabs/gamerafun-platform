import { AverageStar, Text, Tooltip } from "@components/shared";
import { Slider, Stack } from "@mui/material";
import { palette } from "public/material";
import { memo } from "react";
import { BsFillHexagonFill } from "react-icons/bs";
import { thumbColor } from "./helper";

interface SliderCustomProps {
  value: number;
  handleChange: (_event: Event, newValue: number | number[]) => void;
  title: string;
}

const SliderCustom = ({ value, handleChange, title }: SliderCustomProps) => {
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
            step={0.1}
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
                backgroundColor: thumbColor(value),
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
        <AverageStar size={44} value={value} onSider={true} />
      </Stack>
    </Stack>
  );
};

export default memo(SliderCustom);
