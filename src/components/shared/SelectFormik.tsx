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
  MenuProps: any;
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
  MenuProps,
  OptionEnum,
  label,
  name,
  isDisable = false,
  isMultiple = true,
  data,
  handleClick,
}: PropsSelectFormik) => {
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
            {Object.keys(OptionEnum).map((item, index) => (
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
          >
            {data &&
              data.map((item, index) => {
                return (
                  <MenuItem
                    value={item.id}
                    key={index}
                    onClick={() => handleClick?.(item.id)}
                  >
                    {item.name}
                  </MenuItem>
                );
              })}
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
