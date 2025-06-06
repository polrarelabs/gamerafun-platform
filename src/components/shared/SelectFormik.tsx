/* eslint-disable @typescript-eslint/no-explicit-any */
import ChevronIcon from "@icons/common/ChevronIcon";
import {
  ButtonBase,
  CircularProgress,
  FormControl,
  FormHelperText,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  popoverClasses,
} from "@mui/material";
import { palette, typography } from "public/material";
import React, { memo, useEffect, useMemo, useState } from "react";
import Text from "./Text";

interface PropsSelectFormik {
  formik: any;
  OptionEnum?: any;
  label: string;
  name: string;
  isDisable?: boolean;
  isMultiple?: boolean;
  // data?: any[] | null;
  fetchData?: (offset: number, limit: number) => Promise<any[]>;
  totalCount?: number;
  handleClick?: (id: number) => void;
  nameDisplay?: any[] | null;
  keyNameDisplay?: string | null;
}

const LIMIT = 20;

const SelectFormik = ({
  formik,
  OptionEnum,
  label,
  name,
  isDisable = false,
  isMultiple = true,
  // data = [],
  fetchData,
  totalCount,
  handleClick,
  nameDisplay = null,
  keyNameDisplay = null,
}: PropsSelectFormik) => {
  const [options, setOptions] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isEnum = OptionEnum && !Array.isArray(OptionEnum);

  const buildInitialOptions = (): any[] => {
    if (isEnum) {
      return Object.keys(OptionEnum).map((key) => ({
        label: key,
        value:
          OptionEnum[key] === "False"
            ? false
            : OptionEnum[key] === "True"
              ? true
              : OptionEnum[key],
      }));
    }
    if (nameDisplay && keyNameDisplay) {
      return nameDisplay.map((item) => ({
        label: item[keyNameDisplay],
        value: item.id,
      }));
    }
    return [];
  };

  const getLabel = (val: any) => {
    const found = options.find((opt) => String(opt.value) === String(val));
    return found ? found.label : val;
  };
  const loadMoreOptions = async () => {
    if (loading) return;
    if (totalCount && options.length >= totalCount) return;

    setLoading(true);
    try {
      const newData = await fetchData?.(offset, LIMIT);
      const newOptions =
        keyNameDisplay && newData
          ? newData.map((item) => ({
              label: item[keyNameDisplay],
              value: item.id,
            }))
          : [];
      setOptions((prev) => [...prev, ...newOptions]);
      setOffset((prev) => prev + LIMIT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fetchData) {
      const initial = buildInitialOptions();
      setOptions(initial);
    }
  }, [OptionEnum, nameDisplay]);

  useEffect(() => {
    if (fetchData) loadMoreOptions();
  }, []);

  const open = Boolean(anchorEl);
  const value = formik.values[name] || (isMultiple ? [] : "");

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    formik.setFieldTouched(name, true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (val: any) => {
    if (isMultiple) {
      const current = formik.values[name] || [];
      const exists = current.includes(val);
      const newVal = exists
        ? current.filter((v: any) => v !== val)
        : [...current, val];
      formik.setFieldValue(name, newVal);
    } else {
      formik.setFieldValue(name, val);
      handleClose();
    }
    handleClick?.(val);
  };

  const hasValue = useMemo(
    () =>
      isMultiple ? value.length > 0 : value !== null && value !== undefined,
    [value],
  );

  const displayValue = useMemo(() => {
    if (isMultiple) {
      return (value as any[]).map(getLabel).join(", ");
    }
    return getLabel(value);
  }, [value, options]);

  return (
    <Stack flex={1} gap={1}>
      <Text>{label}</Text>
      <FormControl
        error={formik.touched[name] && Boolean(formik.errors[name])}
        fullWidth
      >
        <ButtonBase
          onMouseDown={(e) => {
            e.preventDefault();
            handleOpen(e);
          }}
          disabled={isDisable}
          sx={{
            ...sx.button,
            ...(hasValue ? sx.hasValue : {}),
            ...(formik.touched[name] && formik.errors[name]
              ? { borderColor: "error.main" }
              : {}),
          }}
        >
          <Text noWrap>{hasValue ? displayValue : ""}</Text>
          <ChevronIcon
            sx={{
              transform: open ? "rotate(180deg)" : undefined,
              color: "grey.400",
            }}
          />
        </ButtonBase>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{
            zIndex: 2001,
            [`& .${popoverClasses.paper}`]: {
              backgroundImage: "none",
              width: anchorEl?.offsetWidth ?? 0,
              overflow: "hidden",
            },
          }}
        >
          <Stack
            borderRadius={2}
            border={`1px solid ${palette.colorModalShare?.borderColor}`}
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
              {options.map((option) => {
                const isSelected = isMultiple
                  ? value.includes(option.value)
                  : value === option.value;
                return (
                  <MenuItem
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    sx={sx.menuItem}
                    className={isSelected ? "active" : ""}
                  >
                    <Text>{option.label}</Text>
                  </MenuItem>
                );
              })}
              {loading && (
                <MenuItem disabled>
                  <CircularProgress size={20} />
                </MenuItem>
              )}
            </MenuList>
          </Stack>
        </Popover>
        {formik.touched[name] && formik.errors[name] && (
          <FormHelperText>{formik.errors[name]}</FormHelperText>
        )}
      </FormControl>
    </Stack>
  );
};

export default memo(SelectFormik);

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
    width: "100%",
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
};
