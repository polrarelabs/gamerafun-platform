import { GetColor } from "@components/screens/Games/components/helper";
import { palette } from "public/material";

export const thumbColor = (value: number) => {
  if (typeof value !== "number" || value === 0) return palette.colorGray;

  const color = GetColor(value);
  return color.toString();
};
