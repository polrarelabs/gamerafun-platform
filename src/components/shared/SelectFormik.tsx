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
import { palette } from "public/material";

interface PropsSelectFormik {
  formik: any;
  OptionEnum?: any;
  label: string;
  name: string;
  isDisable?: boolean;
  isMultiple?: boolean;
  data?: any[] | null;
  handleClick?: (id: number) => void;
  nameDisplay?: any[] | null;
  keyNameDisplay?: string;
}

const SelectFormik = ({
  formik,
  OptionEnum,
  label,
  name,
  isDisable = false,
  isMultiple = true,
  data,
  handleClick,
  nameDisplay = null,
  keyNameDisplay,
}: PropsSelectFormik) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const optionKey = OptionEnum ? Object.keys(OptionEnum) : [];
  const optionValue = OptionEnum ? Object.values(OptionEnum) : [];

  const getLabel = (item: number) => {
    // if (nameDisplay !== null && keyNameDisplay) {
    //   console.log('item', item);
    //   console.log('nameDisplay', nameDisplay);

    //   const items = nameDisplay.findIndex(item => item.id === item)
    //   // return items.name
    //   console.log('arrr', items);

    // } else console.log('objet', item)

    return item;
  };

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
                  <Chip key={value} label={getLabel(value)} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            disabled={isDisable}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: `${palette.FilledInput?.bg} !important`,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: `${palette.FilledInput?.hoverBg} !important`,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: `${palette.FilledInput?.hoverBg} !important`,
              },
              "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderColor: `${palette.LinearProgress?.errorBg} !important`,
              },
            }}
          >
            {optionKey.map((item, index) => (
              <MenuItem
                key={index}
                value={
                  nameDisplay !== null && keyNameDisplay
                    ? nameDisplay[index]["id"]
                    : OptionEnum[item]
                }
                onClick={() =>
                  handleClick?.(
                    nameDisplay !== null && keyNameDisplay
                      ? nameDisplay[index]["id"]
                      : (optionValue[index] as { id: number })["id"],
                  )
                }
              >
                {nameDisplay !== null && keyNameDisplay
                  ? nameDisplay[index][keyNameDisplay]
                  : item}
              </MenuItem>
            ))}
            {/* {optionKey.map((item, index) => (
              <MenuItem key={index} value={OptionEnum[item]}>
                {item}
              </MenuItem>
            ))} */}
          </Select>
        ) : (
          <Select
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            input={<OutlinedInput />}
            disabled={isDisable}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: `${palette.FilledInput?.bg} !important`,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: `${palette.FilledInput?.hoverBg} !important`,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: `${palette.FilledInput?.hoverBg} !important`,
              },
              "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderColor: `${palette.LinearProgress?.errorBg} !important`,
              },
            }}
          >
            {optionKey.map((item, index) => (
              <MenuItem
                key={index}
                value={OptionEnum[item]}
                onClick={() =>
                  handleClick?.(
                    nameDisplay !== null && keyNameDisplay
                      ? nameDisplay[index]["id"]
                      : (optionValue[index] as { id: number })["id"],
                  )
                }
              >
                {nameDisplay !== null && keyNameDisplay
                  ? nameDisplay[index][keyNameDisplay]
                  : item}
              </MenuItem>
            ))}
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
