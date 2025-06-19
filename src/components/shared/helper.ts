import { GetColor } from "@components/screens/game-container/helper";
import { palette } from "public/material";

export const thumbColor = (value: number, opacity?: number) => {
  if (typeof value !== "number" || value === 0) return palette.colorGray;

  const color = GetColor(value, opacity);
  return color.toString();
};

export const encode = (text: string) => {
  return text.trim().toLowerCase().replace(/\s+/g, "-");
};

export const decode = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
