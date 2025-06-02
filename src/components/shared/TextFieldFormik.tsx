import { FormControl, FormHelperText, InputBase, Stack } from "@mui/material";
import React, { memo } from "react";
import Text from "./Text";
import { typography } from "public/material";

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
  const error = formik.touched[name] && Boolean(formik.errors[name]);

  return (
    <Stack flex={1} gap={1}>
      <Text>{label}</Text>
      <FormControl error={error} fullWidth>
        <InputBase
          fullWidth
          id={name}
          name={name}
          type={password ? "password" : "text"}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          readOnly={readonly}
          disabled={isDisable}
          sx={{
            ...typography.subtitle2,
            px: 1.5,
            py: 1.1875,
            bgcolor: "background.paper",
            borderRadius: 2,
            border: "1px solid",
            borderColor: error ? "error.main" : "transparent",
            "&:hover": {
              borderColor: "grey.400",
            },
            "&:focus-within": {
              borderColor: "primary.main",
            },
          }}
        />
        {error && <FormHelperText>{formik.errors[name]}</FormHelperText>}
      </FormControl>
    </Stack>
  );
};

export default memo(TextFieldFormik);
