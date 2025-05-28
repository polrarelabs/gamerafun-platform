/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import React, { memo } from "react";
import Text from "./Text";

interface PropsSelectFormik {
  formik: any;
  OptionEnum: any;
  label: string;
  name: string;
  isDisable?: boolean;
  isMultiple?: boolean;
  data?: any[] | null;
  handleClick?: (id: number) => void;
}

const SelectFormik = ({
  formik,
  OptionEnum,
  label,
  name,
  isDisable = false,
  isMultiple = true,
  data,
  handleClick,
}: PropsSelectFormik) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const optionKey = Object.keys(OptionEnum);
  const optionValue = Object.keys(OptionEnum);

  const names = name === "id" ? "name" : name;

  return (
    <Stack flex={1} gap={1}>
      <Text>{label}</Text>
      <FormControl
        error={formik.touched.name && Boolean(formik.errors.name)}
        fullWidth
      >
        {isMultiple ? (
          <Select
            multiple={isMultiple}
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            input={<OutlinedInput />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            disabled={isDisable}
          >
            {optionKey.map((item, index) => (
              <MenuItem key={index} value={OptionEnum[item]}>
                {item}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Select
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            input={<OutlinedInput />}
            disabled={isDisable}
          >
            {optionValue.map((item, index) => (
              <MenuItem key={index} value={OptionEnum[item]}>
                {item}
              </MenuItem>
            ))}
          </Select>
        )}
        {formik.touched.name && formik.errors.name && (
          <FormHelperText>{formik.errors.name}</FormHelperText>
        )}
      </FormControl>
    </Stack>
  );
};

export default memo(SelectFormik);
