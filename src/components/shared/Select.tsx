"use client";

import {
  Box,
  BoxProps,
  ButtonBase,
  ButtonBaseProps,
  MenuItem,
  MenuList,
  Popover,
  PopoverProps,
  Stack,
  popoverClasses,
} from "@mui/material";
import { memo, useId, useMemo, useState, MouseEvent } from "react";
import ChevronIcon from "icons/ChevronIcon";
import { Option } from "constant/types";
import CheckedIcon from "icons/CheckedIcon";
import Text from "./Text";
import { typography } from "public/material";

export type SelectProps = {
  placeholder?: string;
  multiple?: boolean;
  value?: Option["value"] | Option["value"][];
  error?: boolean;
  options?: Option[];
  onTouched?: () => void;
  onChange: (
    selectedList: Option["value"][],
    selected?: Option["value"],
  ) => void;
  buttonProps?: ButtonBaseProps;
  popoverProps?: Partial<PopoverProps>;
  ignoreIds?: Option["value"][];
  totalItems?: number;
  onLoadMore?: () => void;
  onRefresh?: () => void;
  isFetching?: boolean;
  showPlaceholder?: boolean;
  onOpen?: () => void;
  iconProps?: BoxProps;
  isFilter?: boolean;
};

const Select = (props: SelectProps) => {
  const {
    placeholder = props?.multiple ? "Select options" : "Select option",
    multiple,
    value,
    error,
    options = [],
    onTouched,
    onChange,
    buttonProps = {},
    popoverProps = {},
    ignoreIds = [],
    totalItems,
    onLoadMore,
    isFetching,
    showPlaceholder = true,
    onOpen: onOpenProps,
    iconProps,
    isFilter,
  } = props;

  const { sx: sxButton, ...restButtonProps } = buttonProps;
  const { sx: sxPopover, ...restPopoverProps } = popoverProps;

  const id = useId();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = useMemo(() => !!anchorEl?.offsetWidth, [anchorEl]);

  const valueList = useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    }
    return ![undefined, null, ""].includes(value as string | null | undefined)
      ? [value]
      : [];
  }, [multiple, value]) as Option["value"][];

  const label = useMemo(() => {
    if (!valueList.length) return placeholder;
    return valueList
      .reduce((out: (string | number)[], valueItem) => {
        const option = options.find((option) => option.value === valueItem);
        if (option) {
          out.push(option.label);
        }
        return out;
      }, [])
      .join(", ");
  }, [options, placeholder, valueList]);

  const optionsSelectable = useMemo(
    () => options.filter((item) => !ignoreIds.includes(item.value)),
    [ignoreIds, options],
  );

  const isManyOption = useMemo(
    () => Boolean(totalItems && totalItems > options.length),
    [options.length, totalItems],
  );

  const hasValue = useMemo(() => !!valueList.length, [valueList.length]);

  const onShow = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    onTouched && onTouched();
  };

  const onHide = () => {
    setAnchorEl(null);
  };

  const onOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenProps && onOpenProps();
    onShow(event);
  };

  const onSelect = (option: Option) => {
    return () => {
      const newSelectedList = [...valueList];
      const indexOption = valueList.findIndex(
        (valueItem) => valueItem === option.value,
      );

      if (indexOption === -1) {
        newSelectedList.push(option.value);
      } else {
        newSelectedList.splice(indexOption, 1);
      }
      onChange(newSelectedList, option.value);

      if (!multiple) {
        onHide();
      }
    };
  };

  const onReset = () => {
    onChange([]);
    if (!multiple) {
      onHide();
    }
  };

  return (
    <>
      <ButtonBase
        onClick={onOpen}
        sx={
          {
            ...sx.button,
            ...(hasValue ? sx.hasValue : {}),
            ...sxButton,
          } as ButtonBaseProps["sx"]
        }
        className={error ? "error" : ""}
        {...restButtonProps}
      >
        <Text
          component="span"
          noWrap
          variant="inherit"
          fontWeight="inherit"
          color="inherit"
        >
          {label}
        </Text>

        <ChevronIcon
          sx={{
            transform: open ? "rotate(180deg)" : undefined,
            color: "grey.400",
          }}
        />
      </ButtonBase>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onHide}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          zIndex: 2001,
          [`& .${popoverClasses.paper}`]: {
            backgroundImage: "none",
            width: anchorEl?.offsetWidth ?? 0,
            overflow: "hidden",
            ...sxPopover,
          },
        }}
        {...restPopoverProps}
      >
        <Stack
          borderRadius={2}
          border="1px solid"
          borderColor="#474747"
          bgcolor="background.paperChannel"
          p={1.5}
          mt={0.5}
        >
          <MenuList
            component={Stack}
            spacing={1}
            maxHeight={400}
            overflow="auto"
          >
            {hasValue && showPlaceholder && (
              <MenuItem
                sx={sx.menuItem}
                onClick={onReset}
                component={ButtonBase}
              >
                {hasValue && isFilter ? "All" : placeholder}
              </MenuItem>
            )}
            {optionsSelectable.map((option) => {
              const isSelected = valueList.includes(option.value);
              return (
                <MenuItem
                  className={isSelected ? "active" : ""}
                  sx={sx.menuItem}
                  key={option.value}
                  onClick={onSelect(option)}
                  component={ButtonBase}
                  disabled={option?.disabled}
                >
                  <Stack direction="row" alignItems="center">
                    {!!option?.icon && (
                      <Box
                        component="img"
                        src={option.icon}
                        alt={option.label}
                        height={14}
                        {...iconProps}
                      />
                    )}
                    <Stack alignItems="flex-start">
                      <Text
                        variant="inherit"
                        fontWeight="inherit"
                        color="inherit"
                      >
                        {option.label}
                      </Text>
                      <Text variant="caption" color="grey.400">
                        {option.subValue}
                      </Text>
                    </Stack>

                    {multiple && isSelected && (
                      <CheckedIcon
                        sx={{ ml: "auto!important" }}
                        fontSize="small"
                        color="primary"
                      />
                    )}
                  </Stack>
                </MenuItem>
              );
            })}
            {isManyOption && (
              <MenuItem
                sx={sx.loadMore}
                onClick={onLoadMore}
                disabled={isFetching}
                component={ButtonBase}
              >
                {isFetching ? "Fetching..." : "Load more"}
              </MenuItem>
            )}
          </MenuList>
        </Stack>
      </Popover>
    </>
  );
};

export default memo(Select);

const sx = {
  button: {
    py: 1.1875,
    px: 1.5,
    bgcolor: "background.paper",
    borderRadius: 2,
    border: "1px solid transparent",
    boxSizing: "border-box",
    position: "relative",
    textAlign: "left",
    justifyContent: "space-between",
    "&.error": {
      borderColor: "error.main",
    },
    "&.filled": {
      borderColor: "grey.400",
    },
    "& span": {
      ...typography.subtitle2,
    },
  },
  hasValue: {
    color: "primary.main",
  },
  menuItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "1px solid transparent",
    ...typography.subtitle2,
    py: 0.875,
    px: 1.5,
    lineHeight: 1.2,
    borderRadius: 1.25,
    color: "grey.400",
    width: "100%",
    "& img": {
      mr: 1,
    },
    "&:hover, &.active": {
      bgcolor: "primary.dark",
      borderColor: "primary.main",
      color: "common.white",
    },
  },
  loadMore: {
    fontSize: 14,
    color: "warning.main",
    width: "100%",
  },
  searchInput: {
    px: 1,
    "& input": {
      fontSize: 14,
    },
  },
  newOption: {
    px: 2,
    mt: 1,
    "& input": {
      fontSize: 14,
    },
  },
};
