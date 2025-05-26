import { ChangeEvent, memo, useMemo, useRef } from "react";
import {
  Box,
  ButtonBase,
  Stack,
  StackProps,
  TooltipProps,
} from "@mui/material";
import { Image, ImageProps, Text } from "components/shared";
import { Container, Message } from "@components/FormControl";
import CameraIcon from "@icons/web3/CameraIcon";

type AvatarProps = {
  label: string;
  name: string;
  description?: string;

  required?: boolean;
  error?: string;
  containerProps?: StackProps;
  labelTooltip?: TooltipProps["title"];
  widthHalf?: boolean;
  value?: File | string;
  onChange: (name: string, newValue: File) => void;
  onRatio: ImageProps["onRatio"];
};

const Avatar = (props: AvatarProps) => {
  const {
    label,
    required,
    error,
    name,
    description,
    containerProps,
    widthHalf,
    value,
    onChange,
    onRatio,
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const previewURL = useMemo(() => {
    switch (typeof value) {
      case "object":
        return URL.createObjectURL(value);
      case "string":
        return value;
      default:
        return;
    }
  }, [value]);

  const onChoose = () => {
    if (!inputRef?.current) return;
    inputRef.current.click();
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    onChange(name, event.target.files[0]);
  };

  return (
    <Container position="relative" widthHalf={widthHalf} {...containerProps}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack
          justifyContent="center"
          alignItems="center"
          borderRadius="50%"
          position="relative"
          width={80}
          height={80}
          overflow="hidden"
          bgcolor="background.paper"
          onClick={onChoose}
          component={ButtonBase}
          border="1px solid"
          borderColor={previewURL ? "divider" : "transparent"}
          sx={{
            "& svg": {
              display: previewURL ? "none" : "flex",
            },
            "&:hover svg": {
              display: "flex",
            },
          }}
        >
          {previewURL && (
            <Image
              src={previewURL}
              alt="preview-upload"
              width={80}
              height={80}
              onRatio={onRatio}
            />
          )}
          <CameraIcon
            sx={{
              fontSize: 32,
              color: previewURL ? "common.white" : "grey.400",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Stack>
        <Stack>
          <Text variant="subtitle2">
            {label}
            {Boolean(required) && (
              <Text component="span" color="error.main" pl={0.5}>
                *
              </Text>
            )}
          </Text>
          <Text variant="body2" color="grey.400">
            {`File type: SVG, PNG, JPG, JPEG\nMax file size: 5MB`}
          </Text>
        </Stack>
      </Stack>
      {!!description && (
        <Text variant="body2" color="grey.400">
          {description}
        </Text>
      )}

      {!!error && <Message>{error}</Message>}
      <Box
        ref={inputRef}
        component="input"
        type="file"
        display="none"
        accept="image/*"
        onChange={onChangeFile}
      />
    </Container>
  );
};

export default memo(Avatar);
