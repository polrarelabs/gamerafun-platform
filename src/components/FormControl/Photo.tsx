import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Stack, StackProps } from "@mui/material";
import { Container, Label, Message } from "./components";
import { Text } from "components/shared";
import PlaceholderImage from "public/images/banner.webp";
import Image from "next/image";
import useElementSize from "hooks/useElementSize";
import useToggle from "hooks/useToggle";
import { FeatureModule, FileType } from "components/Media/helpers";
import { parsedRatioString } from "utils/index";
import ImageControl, {
  ImageControlProps,
} from "@components/shared/ImageControl";
import { PlatformType } from "@constant/enum";
// import Gallery from "@components/Media/Gallery";

export interface Media {
  fileName: string;
  dimension: string;
  ratio: number;
  url: string;
  name: string;
  platform?: PlatformType;
  module?: FeatureModule;
  type?: FileType;
  createdAt: string;
  id: string;
}
type PhotoProps = {
  label: string;
  name: string;

  value?: string | string[];
  multiple?: boolean;

  maxWidth?: number | string;

  minDimension?: number;
  maxDimension?: number;
  previewRatio?: string;
  ratio?: string;

  required?: boolean;
  error?: string;
  containerProps?: StackProps;

  type?: FileType;
  widthHalf?: boolean;

  onChange: (name: string, selectedList: string[], multiple?: boolean) => void;
  onTouched?: (fieldName: string) => void;
};

const Photo = (props: PhotoProps) => {
  const {
    label,
    required,
    error,
    name,
    containerProps,
    value,
    multiple,
    maxWidth,
    minDimension,
    maxDimension,
    previewRatio,
    ratio: ratioProps,
    onChange,
    onTouched,
    type = FileType.IMAGE,
    widthHalf,
    ...rest
  } = props;

  const [isShow, onShow, onHide] = useToggle();
  const [selectedList, setSelectedList] = useState<Media[]>([]);

  const valueList = useMemo(
    () => (Array.isArray(value) ? value : value ? [value] : []),
    [value],
  );

  const exactDimension = useMemo(
    () => !!ratioProps?.includes("x"),
    [ratioProps],
  );

  const parsedRatio = useMemo(
    () => (ratioProps && !multiple ? parsedRatioString(ratioProps) : undefined),
    [ratioProps, multiple],
  );

  const onChangeFromMediaList = (mediaList: Media[]) => {
    onChange(
      name,
      mediaList.map((item) => item.url),
      multiple,
    );
  };

  const onChoose = () => {
    onShow();
    onTouched && onTouched(name);
  };

  const onRemove = (index: number) => {
    return () => {
      const newSelected = [...selectedList];
      newSelected.splice(index, 1);
      setSelectedList(newSelected);
      onTouched && onTouched(name);
      onChangeFromMediaList(newSelected);
    };
  };

  const onChangeSelected = useCallback(
    (selectedList: string[], mediaList: Media[]) => {
      onChange(name, selectedList, multiple);
      setSelectedList(mediaList);
      onHide();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, onHide],
  );

  useEffect(() => {
    if (!valueList?.length && selectedList.length) {
      setSelectedList([]);
    }
  }, [selectedList.length, valueList?.length]);

  return (
    <Container widthHalf={widthHalf} {...containerProps}>
      <Label htmlFor={name} required={required} error={!!error}>
        {label}
      </Label>
      <Stack
        display="grid"
        gridTemplateColumns={
          maxWidth ? `repeat(auto-fill, ${maxWidth}px)` : undefined
        }
        gridTemplateRows="max-content"
        gap={2.5}
      >
        {(!valueList.length || multiple) && (
          <Stack
            sx={{
              backgroundColor: "grey.A700",
              borderRadius: 1,
              overflow: "hidden",
              border: "1px dashed",
              borderColor: "grey.400",
              cursor: "pointer",
              aspectRatio: parsedRatio ?? 1,
            }}
            width="100%"
            maxWidth={maxWidth}
            justifyContent="center"
            alignItems="center"
            spacing={1.5}
            onClick={onChoose}
          >
            <Placeholder type={type} />
          </Stack>
        )}
        {selectedList.map((item, index) => (
          <ImageControl
            key={item.url}
            {...((parsedRatio
              ? { size: "100%", aspectRatio: parsedRatio }
              : {
                  width: maxWidth,
                  height: maxWidth,
                }) as ImageControlProps)}
            src={item.url}
            alt={item.name}
            dimension={item.dimension}
            onRemove={onRemove(index)}
            selectable={false}
            type={props?.type}
          />
        ))}
      </Stack>
      {!!error && <Message>{error}</Message>}
      {/* <Gallery
                open={isShow}
                onClose={onHide}
                onChangeSelected={onChangeSelected}
                value={valueList}
                multiple={multiple}
                ratio={ratioProps}
                exactDimension={exactDimension}
                minDimension={minDimension}
                maxDimension={maxDimension}
                type={props?.type}
            /> */}
    </Container>
  );
};

export default memo(Photo);

const Placeholder = ({ type }: { type: PhotoProps["type"] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const size = useElementSize(containerRef?.current);

  const isSmall = useMemo(
    () => !size?.height || size.height < PLACEHOLDER_SIZE_EXPECTED.width,
    [size?.height],
  );

  return (
    <Stack
      p={isSmall ? 1 : 2}
      alignItems="center"
      spacing={isSmall ? 1 : 2}
      ref={containerRef}
      flex={1}
      overflow="hidden"
      justifyContent="center"
    >
      <Image
        src={PlaceholderImage}
        width={isSmall ? 20 : 45}
        height={isSmall ? 20 : 45}
        alt="Image placeholder"
      />
      <Text variant="caption" textAlign="center">
        {`Click here to add or update an ${type}`}
        <br />
        {!size?.width || size.width < PLACEHOLDER_SIZE_EXPECTED.width
          ? "MAX 10MB"
          : `Your ${type} not exceed 10MB`}
      </Text>
    </Stack>
  );
};

const PLACEHOLDER_SIZE_EXPECTED = {
  width: 200,
  height: 132,
};
