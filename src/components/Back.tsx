import { memo } from "react";
import { Stack } from "@mui/material";
import Link, { LinkProps } from "./Link";
import { IconButton, Text } from "./shared";
import ArrowLongIcon from "@icons/ArrowLongIcon";

type BackProps = {
  label: string;
} & LinkProps;

const Back = (props: BackProps) => {
  const { label, ...rest } = props;

  return (
    <Stack
      component={Link}
      direction="row"
      spacing={1}
      alignItems="center"
      {...rest}
    >
      <IconButton noPadding>
        <ArrowLongIcon />
      </IconButton>
      <Text variant="h5">{label}</Text>
    </Stack>
  );
};

export default memo(Back);
