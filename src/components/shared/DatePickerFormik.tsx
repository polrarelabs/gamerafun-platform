/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { get } from "lodash";
import Text from "./Text";
import { memo } from "react";

interface PropsDatePickerFormik {
  formik: any | null;
  label: string;
  name: string;
  scheduleError?: boolean;
}

const DatePickerFormik = ({
  formik,
  label,
  name,
  scheduleError = false,
}: PropsDatePickerFormik) => {
  const error = get(formik.errors, name);
  const touched = get(formik.touched, name);
  const value = get(formik.values, name);

  const showError = (touched && Boolean(error)) || scheduleError;

  return (
    <Stack flex={1} gap={1}>
      <Text>{label}</Text>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name={name}
          value={value ? dayjs(value, "YYYY-MM-DD") : null}
          onChange={(newValue: Dayjs | null) => {
            formik.setFieldValue(name, newValue?.format("YYYY-MM-DD") || "");
          }}
          slotProps={{
            textField: {
              error: showError,
              helperText: touched && error ? error : "",
              fullWidth: true,
            },
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
};

export default memo(DatePickerFormik);
