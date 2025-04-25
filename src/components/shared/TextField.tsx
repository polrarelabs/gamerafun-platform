import { ChangeEvent, memo, useMemo, FocusEvent, forwardRef } from "react";
import { InputBase, InputBaseProps, TooltipProps } from "@mui/material";
import Tooltip from "./Tooltip";

type CoreTextFieldProps = InputBaseProps & {
  onChangeText?: (newValue?: string | number) => void;
  numberType?: "integer" | "float";
  overrideSx?: boolean;
  maxNumber?: number;
  maxDecimal?: number;
};

export type TextFieldProps = CoreTextFieldProps & {
  tooltip?: TooltipProps["title"];
};

const TextField = forwardRef((props: TextFieldProps, ref) => {
  const { tooltip, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <CoreTextField ref={ref} {...rest} />
      </Tooltip>
    );
  }

  return <CoreTextField {...rest} />;
});

TextField.displayName = "TextField";

const CoreTextField = forwardRef((props: TextFieldProps, ref) => {
  const {
    onChange: onChangeProps,
    onBlur: onBlurProps,
    onChangeText,
    type,
    value,
    sx,
    numberType = "float",
    minRows = 4,
    maxRows = 4,
    overrideSx = true,
    maxNumber,
    maxDecimal,
    ...rest
  } = props;

  const valueFormatted = useMemo(() => {
    if (type !== "number") return value;
    const valueParsed = value === null ? "" : value?.toString();
    if (!valueParsed) return;
    const arraySplit = valueParsed.split(".");
    const integer = arraySplit[0];
    const decimal = arraySplit[1] ?? "";
    return (
      valueWithCommas(integer) + (arraySplit.length === 2 ? "." : "") + decimal
    );
  }, [type, value]);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let newValue = event.target.value;

    if (!newValue || type !== "number") {
      onChangeText && onChangeText(newValue);
    } else {
      // CASE: Input has value and a number
      newValue = newValue.replace(/,/g, "");
      if (!isNaN(newValue as unknown as number)) {
        if (newValue?.slice(0, 2) === "00") {
          // Avoid 000.x
          newValue = newValue.slice(1);
        }
        if (Number(newValue) >= 1 && (newValue[0] ?? "") === "0") {
          // Remove 0 to avoid 0123.444 => 123.444
          newValue = newValue?.slice(1);
        }

        if (Number(value) === Infinity) {
          newValue = "";
        }

        if (numberType === "integer") {
          newValue = newValue.replace(".", "");
        }

        if (maxNumber && Number(newValue) > maxNumber) return;

        if (maxDecimal) {
          const decimals = `${newValue}`.split(".")[1];
          if (decimals?.length > maxDecimal) return;
        }

        onChangeText && onChangeText(newValue);
      }
    }

    onChangeProps && onChangeProps(event);
  };

  const onBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (type === "number") {
      const numberable = Boolean(value || (value !== "" && value == 0));
      onChangeText && onChangeText(numberable ? Number(value) : undefined);
    } else {
      onChangeText && onChangeText(((value || "") as string).trim());
    }
    onBlurProps && onBlurProps(event);
  };

  return (
    <InputBase
      ref={ref}
      sx={(overrideSx ? { ...defaultSx, ...sx } : sx) as InputBaseProps["sx"]}
      placeholder="Write here..."
      value={valueFormatted ?? ""}
      type="text"
      onChange={onChange}
      onBlur={onBlur}
      minRows={minRows}
      maxRows={maxRows}
      {...rest}
    />
  );
});

CoreTextField.displayName = "CoreTextField";

export default memo(TextField);

const defaultSx = {
  position: "relative",
  [`&.Mui-error`]: {
    borderColor: "error.main",
  },
  py: 0.5625,
  px: 0.875,
  border: "1px solid transparent",
  // borderColor: "divider",
  borderRadius: 1,
  bgcolor: "grey.A700",
  color: "common.white",
  fontSize: 16,
  "&:focus-within, &.filled": {
    borderColor: "grey.400",
    borderRadius: 1,
  },
  "& input, & textarea": {
    py: 0,
    px: 1.5,
    color: "inherit",
    fontSize: "inherit",
    lineHeight: 1.35625,
    height: "unset",
    "&:disabled": {
      WebkitTextFillColor: "rgba(255, 255, 255, 0.75)",
    },

    "&::placeholder": {
      color: "grey.400",
    },
  },
};

const valueWithCommas = (value: string | number) => {
  value = typeof value === "number" ? value.toString() : value;
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
