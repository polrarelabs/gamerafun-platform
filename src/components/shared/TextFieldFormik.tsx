"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, TextField } from "@mui/material";
import React, { memo } from "react";
import Text from "./Text";
import { palette } from "public/material";

interface PropsTextFieldFormik {
  formik: any;
  label: string;
  name: string;
  readonly?: boolean;
  password?: boolean;
  isDisable?: boolean;
}

const TextFieldFormik = ({
  formik,
  label,
  name,
  readonly = false,
  password = false,
  isDisable = false,
}: PropsTextFieldFormik) => {
  return (
    <Stack flex={1} gap={1}>
      <Text>{label}</Text>
      <TextField
        fullWidth
        id={name}
        name={name}
        type={password ? "password" : "text"}
        value={formik.values[name]}
        onChange={formik.handleChange}
        // defaultValue={formik.values[name]}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        slotProps={{
          input: {
            readOnly: readonly,
            disabled: isDisable,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: palette.FilledInput?.bg,
            },
            "&:hover fieldset": {
              borderColor: palette.FilledInput?.hoverBg,
            },
            "&.Mui-focused fieldset": {
              borderColor: palette.FilledInput?.hoverBg,
            },
            "&.Mui-error fieldset": {
              borderColor: palette.LinearProgress?.errorBg,
            },
          },
        }}
      />
    </Stack>
  );
};

export default memo(TextFieldFormik);
