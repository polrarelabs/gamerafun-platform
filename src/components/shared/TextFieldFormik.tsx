"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, TextField } from "@mui/material";
import React, { memo } from "react";
import Text from "./Text";

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
    <Stack flex={2} gap={1}>
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
      />
    </Stack>
  );
};

export default memo(TextFieldFormik);
