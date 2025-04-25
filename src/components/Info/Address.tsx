"use client";

import { memo, useState, useEffect } from "react";
import { Stack, StackProps } from "@mui/material";
import { IconButton, Text, TextProps } from "@components/shared";
import { shortAddress } from "@utils";
import CopyIcon from "@icons/CopyIcon";

type AddressProps = {
  value: string;
  sliceCount?: number;
  addressProps?: TextProps;
  iconColor?: string;
} & StackProps;

const Address = (props: AddressProps) => {
  const {
    value,
    sliceCount,
    addressProps,
    iconColor = "grey.400",
    ...rest
  } = props;
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onCopy = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!value) return;
    navigator.clipboard.writeText(value);
    setIsCopied(true);
  };

  useEffect(() => {
    if (!isCopied) return;
    let timeout: NodeJS.Timeout | null = null;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [isCopied]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      bgcolor="grey.A400"
      spacing={1}
      px={1.5}
      py={0.6875}
      width="fit-content"
      borderRadius={1.25}
      minWidth={122}
      {...rest}
    >
      <Text variant="subtitle2" {...addressProps}>
        {shortAddress(value, sliceCount)}
      </Text>
      <IconButton
        onClick={onCopy}
        tooltip={isCopied ? "Copied" : undefined}
        noPadding
      >
        <CopyIcon
          sx={{ fontSize: 16, color: isCopied ? "success.main" : iconColor }}
        />
      </IconButton>
    </Stack>
  );
};

export default memo(Address);
