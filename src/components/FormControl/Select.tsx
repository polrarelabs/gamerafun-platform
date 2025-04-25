import { memo } from "react";
import { StackProps, TooltipProps } from "@mui/material";
import { Container, Label, Message } from "./components";
import {
  Select as SelectShared,
  SelectProps as SelectSharedProps,
} from "components/shared";
import { Option } from "constant/types";

export type SelectProps = Omit<
  SelectSharedProps,
  "error" | "onTouched" | "onChange"
> & {
  label: string;
  name: string;

  disabled?: boolean;
  tooltip?: TooltipProps["title"];
  required?: boolean;
  error?: string;
  containerProps?: StackProps;
  widthHalf?: boolean;
  onTouched?: (fieldName: string) => void;
  onChange: (
    name: string,
    newValue?: Option["value"] | Option["value"][],
  ) => void;
};

const Select = (props: SelectProps) => {
  const {
    label,
    required,
    error,
    name,
    containerProps,
    onTouched: onTouchedProps,
    onChange,
    disabled,
    tooltip,
    buttonProps,
    widthHalf,
    ...rest
  } = props;

  const onTouched = () => {
    onTouchedProps && onTouchedProps(name);
  };

  const onChangeSelect = (
    selectedList: Option["value"][],
    selected?: Option["value"],
  ) => {
    if (props?.multiple) {
      onChange(name, selectedList);
    } else {
      onChange(name, selected);
    }
  };

  return (
    <Container tooltip={tooltip} widthHalf={widthHalf} {...containerProps}>
      {!!label && (
        <Label htmlFor={name} required={required} error={!!error}>
          {label}
        </Label>
      )}
      <SelectShared
        error={!!error}
        onTouched={onTouched}
        onChange={onChangeSelect}
        buttonProps={{
          disabled,
          className: props.value ? "filled" : undefined,
          sx: { height: 40 },
          ...buttonProps,
        }}
        {...rest}
      />
      {!!error && <Message>{error}</Message>}
    </Container>
  );
};

export default memo(Select);
