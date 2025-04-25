"use client";

import { client, Endpoint } from "@api";
import { Address, Avatar, Socials } from "@components/Info";
import Link from "@components/Link";
import { Text, TextField, TextFieldProps } from "@components/shared";
import { DataStatus } from "@constant/enum";
import { AGENT_DETAIL_PATH } from "@constant/paths";
import { Token } from "@constant/types";
import {
  CircularProgress,
  ClickAwayListener,
  Popper,
  Stack,
} from "@mui/material";
import { cleanObject, formatCash, formatNumber, getTicker } from "@utils";
import { HttpStatusCode } from "axios";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import StringFormat from "string-format";
import BotImg from "public/images/img-bot.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTokensPrice } from "@store/app";
import { rawDataToReadable } from "@store/token/actions";
import SearchIcon from "@icons/SearchIcon";

const SearchAgents = () => {
  const pathname = usePathname();
  const { tokensPrice } = useTokensPrice();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const timeRef = useRef<number | undefined>(undefined);

  const [value, setValue] = useState<string>("");
  const [status, setStatus] = useState<DataStatus>(DataStatus.IDLE);
  const [items, setItems] = useState<Token[]>([]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = useMemo(() => !!anchorEl, [anchorEl]);

  const onAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);

    setValue("");
    setItems([]);
    setStatus(DataStatus.IDLE);
  };

  const onChangeText = (newText?: string) => {
    const _value = newText ?? "";
    setValue(_value);

    timeRef.current = Date.now();

    if (!newText) {
      setStatus(DataStatus.IDLE);
      setItems([]);
    }
  };

  const onGetTokens = useCallback(async (search: string) => {
    try {
      setStatus(DataStatus.LOADING);
      setItems([]);
      const response = await client.get(
        Endpoint.TOKENS,
        cleanObject({
          pageIndex: 1,
          pageSize: 10000,
          search,
        }),
      );

      if (response?.status === HttpStatusCode.Ok) {
        const newItems = response.data.items.map((item) =>
          rawDataToReadable(item),
        );
        setItems(newItems);
        setStatus(DataStatus.SUCCEEDED);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    if (!value) return;
    setTimeout(() => {
      if (
        !value ||
        value?.length < 3 ||
        !timeRef.current ||
        Date.now() - timeRef.current < 1500
      )
        return;
      onGetTokens(value);
    }, 1500);
  }, [value, onGetTokens]);

  useEffect(() => {
    setItems([]);
    setValue("");
    setStatus(DataStatus.IDLE);
    timeRef.current = undefined;
  }, [pathname]);

  return (
    <>
      <TextField
        ref={containerRef}
        startAdornment={<SearchIcon fontSize="small" />}
        fullWidth
        sx={sx}
        value={value}
        placeholder="Search Agent"
        onChangeText={onChangeText as TextFieldProps["onChangeText"]}
        onKeyDown={onAnchor}
      />

      <ClickAwayListener onClickAway={onClose}>
        <Popper
          open={open}
          anchorEl={anchorEl}
          sx={{
            width: (anchorEl?.offsetWidth ?? 0) + 46,
            ml: "-10px!important",
            mt: "33px!important",
            bgcolor: "grey.A700",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "grey.800",
            zIndex: 200,
          }}
        >
          <Text pt={1.125} pb={1.5} px={2} variant="subtitle2" color="grey.400">
            Search results
            {status === DataStatus.SUCCEEDED && (
              <Text component="span" color="common.white">
                {`(${formatNumber(items.length)})`}
              </Text>
            )}
          </Text>
          <Stack
            pb={1.5}
            alignItems="center"
            justifyContent="center"
            overflow="auto"
            minHeight={88}
            maxHeight={352}
          >
            {status === DataStatus.LOADING ? (
              <CircularProgress size={20} color="inherit" />
            ) : items.length ? (
              items.map((item) => {
                const marketCap =
                  typeof item?.marketCap === "number"
                    ? Number(item.marketCap) * tokensPrice[item.currency].usd
                    : undefined;

                return (
                  <Stack
                    component={Link}
                    href={StringFormat(AGENT_DETAIL_PATH, {
                      token: item.pool_id,
                    })}
                    key={item.pool_id}
                    direction="row"
                    width="100%"
                    sx={{
                      "&:hover": {
                        bgcolor: "background.paper",
                      },
                    }}
                    px={2}
                    alignItems="center"
                    py={1}
                    spacing={2}
                  >
                    <Avatar
                      src={item.icon_url}
                      currency={item.currency}
                      size={56}
                      name={item.name}
                      variant="rounded"
                      currencySize={20}
                    />
                    <Stack spacing={0.75} width="100%">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Text
                          variant="overline"
                          textTransform="initial"
                          color="grey.400"
                          whiteSpace="nowrap"
                        >
                          {getTicker(item.symbol)}
                        </Text>
                        <Text
                          variant="subtitle2"
                          bgcolor="grey.600"
                          py={0.25}
                          px={0.75}
                          borderRadius={1}
                          whiteSpace="nowrap"
                        >
                          {item.name}
                        </Text>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Address value={item.token_address} />
                        <Socials data={item} />
                      </Stack>
                    </Stack>
                  </Stack>
                );
              })
            ) : status === DataStatus.SUCCEEDED ? (
              <>
                <Image src={BotImg} width={64} height={64} alt="" />
                <Text mt={1} variant="h3">
                  No Agent Found
                </Text>
                <Text variant="body2" color="grey.400">
                  No record
                </Text>
              </>
            ) : null}
          </Stack>
        </Popper>
      </ClickAwayListener>
    </>
  );
};

export default memo(SearchAgents);

const sx = {
  borderColor: "grey.800",
  bgcolor: "background.paper",
  // maxWidth: { xs: 320, sm: 500 },
  height: 56,
  minHeight: 56,
  width: "100%",
  maxWidth: 705,
  px: 1.5,
  "& input": {
    px: 0.5,
    "&::placeholder": {
      color: "grey.400",
    },
  },
};
