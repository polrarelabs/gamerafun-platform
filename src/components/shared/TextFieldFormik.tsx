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
}

const TextFieldFormik = ({
  formik,
  label,
  name,
  readonly = false,
}: PropsTextFieldFormik) => {
  return (
    <Stack flex={2} gap={1}>
      <Text>{label}</Text>
      <TextField
        fullWidth
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        defaultValue={formik.values[name]}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        slotProps={{
          input: {
            readOnly: readonly,
          },
        }}
      />
    </Stack>
  );
};

export default TextFieldFormik;
