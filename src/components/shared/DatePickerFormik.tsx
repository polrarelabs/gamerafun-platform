/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormHelperText, Stack } from "@mui/material";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import Text from "./Text";
import { get } from "lodash";

interface PropsDatePickerFormik {
  formik: any | null;
  label: string;
  name: string;
}

const DatePickerFormik = ({ formik, label, name }: PropsDatePickerFormik) => {
  return (
    <Stack flex={1} gap={1}>
      <Text>{label}</Text>
      <FormControl
        error={get(formik.touched, name) && Boolean(get(formik.errors, name))}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name={name}
            value={
              get(formik.values, name)
                ? dayjs(get(formik.values, name), "YYYY-MM-DD")
                : null
            }
            onChange={(newValue: Dayjs | null) => {
              formik.setFieldValue(name, newValue?.format("YYYY-MM-DD") || "");
            }}
            slotProps={{
              textField: {
                helperText: (
                  <FormHelperText>{get(formik.errors, name)}</FormHelperText>
                ),
              },
            }}
          />
        </LocalizationProvider>
        {/* {get(formik.touched, name) && get(formik.errors, name) && (
                    
                )} */}
      </FormControl>
    </Stack>
  );
};

export default DatePickerFormik;
