import { memo, useEffect, useRef, useState } from "react";
import { StackProps, TooltipProps } from "@mui/material";
import { Container, Label, Message } from "./components";
import { Text, TextField, TextFieldProps } from "components/shared";
import { typography } from "public/material";
import useWindowSize from "@hooks/useWindowSize";

export type InputProps = Omit<TextFieldProps, "error"> & {
  label: string;
  name: string;
  description?: string;

  maxLength?: number;

  required?: boolean;
  error?: string;
  containerProps?: StackProps;
  labelTooltip?: TooltipProps["title"];
  widthHalf?: boolean;
};

const Input = (props: InputProps) => {
  const {
    label,
    required,
    error,
    name,
    description,
    containerProps,
    maxLength,
    labelTooltip,
    widthHalf,
    sx,
    ...rest
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useWindowSize();

  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;
    setHeight(
      containerRef.current?.offsetHeight
        ? containerRef.current?.offsetHeight - 20
        : undefined,
    );
  }, [width, props?.multiline]);

  return (
    <Container
      position="relative"
      ref={containerRef}
      widthHalf={widthHalf}
      {...containerProps}
    >
      {!!label && (
        <Label
          htmlFor={name}
          tooltip={labelTooltip}
          required={required}
          error={!!error}
        >
          {label}
        </Label>
      )}
      <TextField
        error={!!error}
        name={name}
        className={
          Number(rest?.value?.toString()?.length) > 0 ? "filled" : undefined
        }
        sx={{
          ...typography.body2,
          px: 0.5,
          height: rest?.multiline ? undefined : 40,
          ...sx,
        }}
        {...rest}
      />
      {!!maxLength && (
        <Text
          variant="caption"
          position="absolute"
          right={4}
          top={height}
          color="rgba(255, 255, 255, 0.6)"
        >
          {`${rest?.value?.toString()?.trim()?.length ?? 0}/${maxLength}`}
        </Text>
      )}
      {!!description && (
        <Text variant="body2" color="grey.400">
          {description}
        </Text>
      )}

      {!!error && <Message>{error}</Message>}
    </Container>
  );
};

export default memo(Input);
