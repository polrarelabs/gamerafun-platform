import {
  FormControl,
  FormHelperText,
  Popover,
  Stack,
  InputBase,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { get } from "lodash";
import Text from "./Text";
import { memo, useState } from "react";
import { palette, typography } from "public/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface PropsDatePickerFormik {
  formik: any | null;
  label: string;
  name: string;
  scheduleError?: boolean;
  isDisable?: boolean;
}

const DatePickerFormik = ({
  formik,
  label,
  name,
  scheduleError = false,
  isDisable = false,
}: PropsDatePickerFormik) => {
  const error = get(formik.errors, name);
  const touched = get(formik.touched, name);
  const value = get(formik.values, name);

  const showError = (touched && Boolean(error)) || scheduleError;
  const parsedValue = value ? dayjs(value, "YYYY-MM-DD") : null;
  const displayValue = parsedValue?.format("DD/MM/YYYY") ?? "";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isDisable) return;
    setAnchorEl(e.currentTarget);
    setTimeout(() => formik.setFieldTouched(name, true), 0);
  };

  const handleClose = () => setAnchorEl(null);

  const handleChange = (newDate: Dayjs | null) => {
    formik.setFieldValue(name, newDate?.format("YYYY-MM-DD") || "");
    handleClose();
  };

  return (
    <Stack flex={1} gap={1}>
      <Text>{label}</Text>
      <FormControl error={showError} fullWidth>
        <Box
          onClick={handleClick}
          sx={{
            ...sx.button,
            ...(displayValue ? sx.hasValue : {}),
            ...(showError ? { borderColor: "error.main" } : {}),
            cursor: isDisable ? "not-allowed" : "pointer",
          }}
        >
          <InputBase
            value={displayValue}
            readOnly
            fullWidth
            sx={{
              ...typography.subtitle2,
              color: "inherit",
            }}
          />
          <CalendarMonthIcon sx={{ ml: 1, color: "grey.400" }} />
        </Box>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            sx: {
              borderRadius: 2,
              border: `1px solid ${palette.colorModalShare?.borderColor}`,
              overflow: "hidden",
              mt: 0.5,
            },
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={parsedValue}
              onChange={handleChange}
              disableFuture={false}
            />
          </LocalizationProvider>
        </Popover>

        {showError && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Stack>
  );
};

export default memo(DatePickerFormik);

const sx = {
  button: {
    py: 1.1875,
    px: 1.5,
    bgcolor: "background.paper",
    borderRadius: 2,
    border: "1px solid transparent",
    boxSizing: "border-box",
    textAlign: "left",
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  hasValue: {
    color: "primary.main",
  },
};
