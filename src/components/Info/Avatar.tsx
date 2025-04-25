import { memo } from "react";
import {
  Box,
  Breakpoint,
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
  Stack,
} from "@mui/material";
import { Currency } from "@constant/enum";
import { CONFIG_BY_CURRENCY } from "@constant";
import { typography } from "public/material";

type AvatarProps = MuiAvatarProps & {
  size?: number | { [key in Breakpoint]?: number };
  currency?: Currency;
  currencySize?: number | { [key in Breakpoint]?: number };
  name?: string;
};

const Avatar = (props: AvatarProps) => {
  const {
    sx,
    src = "/images/img-bot.png",
    size = 24,
    currency,
    currencySize = 24,
    name,
    ...rest
  } = props;

  const renderImg = () => {
    return (
      <MuiAvatar
        variant="rounded"
        sx={{
          width: size,
          height: size,
          bgcolor: "common.black",
          color: "common.white",
          position: "relative",
          border: "1px solid",
          borderColor: "grey.700",
          borderRadius: 2,
          ...typography.h1,
          ...sx,
        }}
        src={src}
        {...rest}
      >
        {name
          ?.split(" ")
          .reduce((out, word) => out + word.slice(0, 1), "")
          .toUpperCase()}
      </MuiAvatar>
    );
  };

  if (currency) {
    const pos = props?.variant === "rounded" ? -currencySize / 3 : 0;
    return (
      <Stack
        width={size}
        height={size}
        sx={{
          "& > img": {
            position: "absolute",
            bottom: pos,
            right: pos,
            zIndex: 1,
          },
        }}
      >
        {renderImg()}
        <Box
          component="img"
          src={CONFIG_BY_CURRENCY[currency].icon}
          alt=""
          width={currencySize}
          height={currencySize}
          bgcolor="common.black"
          borderRadius="50%"
          p={0.375}
        />
      </Stack>
    );
  }

  return renderImg();
};

export default memo(Avatar);
