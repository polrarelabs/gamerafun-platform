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
}

const SelectFormik = ({
  formik,
  MenuProps,
  OptionEnum,
  label,
  name,
  isDisable = false,
}: PropsSelectFormik) => {
  return (
    <Stack flex={1} gap={1}>
      <Text>{label}</Text>
      <FormControl
        error={formik.touched.name && Boolean(formik.errors.name)}
        fullWidth
      >
        <Select
          multiple
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
        {formik.touched.name && formik.errors.name && (
          <FormHelperText>{formik.errors.name}</FormHelperText>
        )}
      </FormControl>
    </Stack>
  );
};

export default memo(SelectFormik);
