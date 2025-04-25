import { isValidElement, memo, ReactNode } from "react";
import { Avatar, Breakpoint, Stack, StackProps } from "@mui/material";
import { Text, TextProps } from "@components/shared";
import { formatNumber } from "@utils";
import { APP_TOKEN_IMAGE } from "@constant";
import { OptionFormatNumber } from "@constant/types";
import { typography } from "public/material";

export type TokenInfoProps = {
  value?: number | string;
  size?: number | { [key in Breakpoint]?: number };
  icon?: string | ReactNode;
  textProps?: TextProps;
  numberOptions?: OptionFormatNumber;
  name?: string;
} & StackProps;

const TokenInfo = (props: TokenInfoProps) => {
  const {
    value,
    size = 24,
    icon = APP_TOKEN_IMAGE,
    textProps,
    numberOptions,
    name,
    ...rest
  } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={1} {...rest}>
      <Text variant="subtitle2" {...textProps}>
        {typeof value === "string" || isNaN(Number(value))
          ? value
          : formatNumber(value, numberOptions)}
      </Text>

      {typeof icon === "string" ? (
        <Avatar
          variant="circular"
          src={icon}
          sx={{
            width: size,
            height: size,
            bgcolor: "common.black",
            color: "common.white",
            ...typography.h5,
          }}
        >
          {name
            ?.split(" ")
            .reduce((out, word) => out + word.slice(0, 1), "")
            .toUpperCase()}
        </Avatar>
      ) : (
        icon
      )}
    </Stack>
  );
};

export default memo(TokenInfo);
