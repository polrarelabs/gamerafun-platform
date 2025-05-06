"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, TextField } from "@mui/material";
import React, { memo } from "react";
import Text from "./Text";

interface PropsTextFieldFormik {
  formik: any;
  label: string;
  name: string;
}

const TextFieldFormik = ({ formik, label, name }: PropsTextFieldFormik) => {
  return (
    <Stack flex={2} gap={1}>
      <Text>{label}</Text>
      <TextField
        fullWidth
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
      />
    </Stack>
  );
};

export default memo(TextFieldFormik);
