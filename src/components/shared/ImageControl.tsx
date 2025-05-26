import {
  Fragment,
  memo,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  IconButton,
  IconButtonProps,
  Image,
  ImageProps,
  Text,
} from "components/shared";
import { Box, Stack } from "@mui/material";
import TrashIcon from "@icons/common/TrashIcon";
import EyeIcon from "@icons/common/EyeIcon";
import { parsedRatioString } from "utils/index";
import useToggle from "hooks/useToggle";
import DialogLayout from "components/DialogLayout";
import useWindowSize from "hooks/useWindowSize";
import {
  AUDIO_EXTENSIONS,
  IMAGE_EXTENSIONS,
  WRONG_RATIO_IMAGE,
} from "constant/index";
import { FileType } from "components/Media/helpers";

export type ImageControlProps = {
  onRemove?: () => void;
  onPre?: () => void;
  onNext?: () => void;
  onSelect?: () => void;
  expectedRatio?: string;
  exactDimension?: boolean;
  minDimension?: number;
  maxDimension?: number;
  dimension?: string;
  selected?: boolean;
  selectable?: boolean;
  label?: string[];
  type?: FileType;
} & ImageProps;

const ImageControl = (props: ImageControlProps) => {
  const {
    alt,
    onPre,
    onNext,
    onRemove,
    onSelect,
    containerProps = {},
    expectedRatio,
    exactDimension,
    minDimension,
    maxDimension,
    dimension,
    selected,
    onRatio: onRatioProps,
    selectable = true,
    type = FileType.IMAGE,
    children,
    label = [],
    id: idProp,
    ...rest
  } = props;
  const { sx: sxContainerProps, ...restContainerProps } = containerProps;
  const id = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isLoadedRef = useRef<boolean | undefined>(undefined);
  const ratioRef = useRef<number>(1);
  const { width: windowWidth } = useWindowSize();

  const [ratioString, setRatioString] = useState<string | undefined>(dimension);
  const [isLoaded, onLoaded] = useToggle(false);
  const [isPreview, onPreviewTrue, onPreviewFalse] = useToggle(false);
  const [sizeWidth, setSizeWidth] = useState<number>(100);

  const widthRatio = useMemo(() => {
    if (!ratioString) return;
    return Number(ratioString.split("x")[0]);
  }, [ratioString]);

  const detectType = useMemo(() => {
    if (props?.type && !selectable) return props?.type;
    const url = props.src as string;
    switch (true) {
      case IMAGE_EXTENSIONS.some((exten) => url?.endsWith(exten)):
        return FileType.IMAGE;
      case AUDIO_EXTENSIONS.some((exten) => url?.endsWith(exten)):
        return FileType.AUDIO;
      default:
        return FileType.VIDEO;
    }
  }, [props?.type, props.src, selectable]);

  const isLessThanMinDimension = useMemo(() => {
    if (!widthRatio || !minDimension) return false;
    return widthRatio < minDimension;
  }, [minDimension, widthRatio]);

  const isGreaterThanMaxDimension = useMemo(() => {
    if (!widthRatio || !maxDimension) return false;
    return widthRatio > maxDimension;
  }, [maxDimension, widthRatio]);

  const isMatchedRatio = useMemo(() => {
    if (!ratioString) return false;
    if (!expectedRatio) return true;
    if (exactDimension) {
      return expectedRatio === ratioString;
    }
    return (
      Math.abs(
        parsedRatioString(expectedRatio) - parsedRatioString(ratioString),
      ) <= WRONG_RATIO_IMAGE
    );
  }, [exactDimension, expectedRatio, ratioString]);

  const textNotMatchedRatio = useMemo(() => {
    switch (true) {
      case isMatchedRatio && isLessThanMinDimension:
        return `This image has is less than ${minDimension}px wide.`;
      case isMatchedRatio && isGreaterThanMaxDimension:
        return `This image has is greater than ${maxDimension}px wide.`;
      case !isMatchedRatio:
        return "This aspect ratio isn't suitable.";
      default:
        return;
    }
  }, [
    isGreaterThanMaxDimension,
    isLessThanMinDimension,
    isMatchedRatio,
    maxDimension,
    minDimension,
  ]);

  const onPreview = () => {
    const previewButton = document.getElementById(id);
    previewButton?.click();
  };

  const onRatio = (ratio: number, _ratioString: string) => {
    onLoaded();
    isLoadedRef.current = true;
    if (!ratioString) {
      setRatioString(_ratioString);
      ratioRef.current = ratio;
    }
    onRatioProps && onRatioProps(ratio, _ratioString);
  };

  useEffect(() => {
    if (!containerRef?.current?.offsetWidth) return;
    setSizeWidth(containerRef?.current?.offsetWidth ?? 100);
  }, [windowWidth]);

  return (
    <>
      <Box
        position="relative"
        width={
          rest?.width
            ? Number(rest.width) + (selectable ? 4 : 0)
            : `calc(100% + ${selectable ? 2 : 0}px)`
        }
        height={
          rest?.height
            ? Number(rest.height) + (selectable ? 4 : 0)
            : `calc(100% + ${selectable ? 2 : 0}px)`
        }
        overflow="hidden"
        sx={sx.container}
        onClick={onSelect}
        className={selected ? "active" : selectable ? "" : "na"}
        ref={containerRef}
        minHeight={(sizeWidth * 1) / (Number(rest?.aspectRatio) || 256 / 170)}
        id={idProp}
      >
        {detectType === FileType.IMAGE ? (
          <Image
            alt={alt}
            onRatio={onRatio}
            isLoaded={isLoaded}
            ref={isLoadedRef}
            {...rest}
          />
        ) : detectType === FileType.VIDEO ? (
          <Box
            component="video"
            key={ratioString}
            width="100%"
            height={`calc(${(sizeWidth * 170) / 250}px - 30px)`}
            // height="calc(100% - 30px)"
          >
            <source src={props.src as string} />
            Your browser does not support the video tag.
          </Box>
        ) : (
          <Box
            component="audio"
            width="100%"
            height="calc(100% - 30px)"
            controls
          >
            <source src={props.src as string} />
            Your browser does not support the video tag.
          </Box>
        )}

        {!!ratioString && detectType === FileType.IMAGE && (
          <Text
            sx={{
              backgroundColor: "rgba(33, 37, 41, 0.5)",
              position: "absolute",
              left: 0,
              top: 0,
              px: 0.5,
            }}
            variant="caption"
            fontWeight={600}
          >
            {ratioString}
          </Text>
        )}

        {!!label?.length && (
          <Text
            sx={{
              backgroundColor: "rgba(33, 37, 41, 0.5)",
              position: "absolute",
              bottom: 28,
              left: "50%",
              transform: "translateX(-50%)",
              px: 0.5,
            }}
            variant="caption"
            textAlign="center"
            fontWeight={600}
          >
            {label.map((line, index) => (
              <Fragment key={line + index}>
                {line}
                <br />
              </Fragment>
            ))}
          </Text>
        )}

        {!!textNotMatchedRatio && detectType === FileType.IMAGE && (
          <Text
            sx={{
              backgroundColor: "rgba(33, 37, 41, 0.5)",
              position: "absolute",
              left: 0,
              top: "50%",
              width: "100%",
              px: 0.5,
            }}
            variant="caption"
            textAlign="center"
            fontWeight={600}
            color="warning.main"
          >
            {textNotMatchedRatio}
          </Text>
        )}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1.5}
          position="absolute"
          width="100%"
          bgcolor="rgba(33, 37, 41, 0.5)"
          bottom={0}
          py={0.75}
        >
          <IcButton onClick={onPreviewTrue} icon={<EyeIcon />} />
          {children}
          {!!onRemove && <IcButton onClick={onRemove} icon={<TrashIcon />} />}
        </Stack>
      </Box>
      {isPreview && (
        <DialogLayout
          contentProps={{
            sx: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
          sx={{ width: "calc(100vw - 24px)", height: "calc(100vh - 24px)" }}
          open
          onClose={onPreviewFalse}
          renderHeader={ratioString}
        >
          {detectType === FileType.IMAGE ? (
            <Box
              component="img"
              src={props.src as string}
              alt={props?.alt}
              sx={{ objectFit: "contain" }}
              height="100%"
              width="auto"
            />
          ) : detectType === FileType.VIDEO ? (
            <Box
              component="video"
              controls
              autoPlay
              key={ratioString}
              width="100%"
              height="100%"
              // height="calc(100% - 30px)"
            >
              <source src={props.src as string} />
              Your browser does not support the video tag.
            </Box>
          ) : (
            <Box component="audio" autoPlay width="100%" height="100%" controls>
              <source src={props.src as string} />
              Your browser does not support the video tag.
            </Box>
          )}
        </DialogLayout>
      )}
    </>
  );
};

export default memo(ImageControl);

const IcButton = (props: IconButtonProps & { icon: React.ReactNode }) => {
  const { icon, ...rest } = props;
  return (
    <IconButton color="inherit" sx={{ fontSize: 16 }} noPadding {...rest}>
      {icon}
    </IconButton>
  );
};

const sx = {
  container: {
    "& img": {
      objectFit: "cover",
    },
    "&:not(.na)": {
      cursor: "pointer",
      boxSizing: "border-box",
      border: "2px solid",
      borderColor: "transparent",
    },
    "&.active, &:hover:not(.na)": {
      borderColor: "common.white",
    },
  },
};
