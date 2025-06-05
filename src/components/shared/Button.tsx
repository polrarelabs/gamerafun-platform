"use client";

import {
  ForwardedRef,
  HTMLAttributeAnchorTarget,
  forwardRef,
  memo,
  useMemo,
  useRef,
} from "react";
import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  SxProps,
  buttonClasses,
} from "@mui/material";
import Tooltip from "./Tooltip";
import { CssOptions } from "@constant/types";
import { typography } from "public/material";
import useBreakpoint from "@hooks/useBreakpoint";
import { getActiveBreakpoint } from "@utils";
import LoadingDot from "@components/LoadingDot";

type CoreButtonProps = Omit<MuiButtonProps, "size"> & {
  pending?: boolean;
  submitting?: boolean;
  css?: CssOptions;
  outlineBorder?: boolean;
  target?: HTMLAttributeAnchorTarget | undefined;
  size?: MuiButtonProps["size"] | { [key: string]: MuiButtonProps["size"] };
  color?: "success" | "warning" | "info" | "primary";
};

export type ButtonProps = CoreButtonProps & {
  tooltip?: string;
};

const Button = (props: ButtonProps) => {
  const { tooltip, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        {props?.disabled ? (
          <span>
            <CoreButton {...rest} />
          </span>
        ) : (
          <CoreButton {...rest} />
        )}
      </Tooltip>
    );
  }

  return <CoreButton {...rest} />;
};

const CoreButton = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: CoreButtonProps, ref: ForwardedRef<any>) => {
    const {
      sx: sxProp,
      color,
      css = props?.css ?? (color ? DEFAULT_CSS_BY_COLOR[color] : undefined),
      outlineBorder,
      pending,
      disabled,
      startIcon,
      children,
      submitting,
      size: sizeProp,
      onClick,
      className,
      ...rest
    } = props;
    const { breakpoint } = useBreakpoint();

    const lastClickedRef = useRef<number>(0);

    const sx = useMemo(() => {
      const containedSx = { ...sxProp?.[CONTAINED_CLASS] };
      const outlinedSx = { ...sxProp?.[OUTLINED_CLASS] };

      const cloneSxProp = { ...sxProp };

      delete cloneSxProp[CONTAINED_CLASS];
      delete cloneSxProp[OUTLINED_CLASS];

      return {
        ...getDefaultSx(containedSx, outlinedSx, css, cloneSxProp),
        ...cloneSxProp,
      };
    }, [css, sxProp]);

    const size = useMemo(() => {
      if (typeof sizeProp === "object") {
        if (breakpoint) {
          return getActiveBreakpoint(breakpoint, sizeProp);
        }
        return sizeProp[Object.keys(sizeProp)[0]];
      }
      return sizeProp;
    }, [sizeProp, breakpoint]);

    const onCheckClick = (event) => {
      if (onClick && Date.now() - lastClickedRef.current > 1000) {
        onClick(event);
        lastClickedRef.current = Date.now();
      }
    };

    return (
      <MuiButton
        ref={ref}
        disabled={disabled || pending || submitting}
        disableRipple={rest?.variant === "text"}
        startIcon={
          pending ? (
            <CircularProgress
              color="inherit"
              size={props?.size === "small" ? 14 : 16}
            />
          ) : (
            startIcon
          )
        }
        sx={sx as CoreButtonProps["sx"]}
        size={size as MuiButtonProps["size"]}
        onClick={onCheckClick}
        className={`${className ?? ""} ${color}`}
        {...rest}
      >
        <span>{children}</span>
        {!!submitting && <LoadingDot />}
      </MuiButton>
    );
  },
);

CoreButton.displayName = "CoreButton";

export default memo(Button);

const CONTAINED_CLASS = `&.${buttonClasses.contained}`;
const OUTLINED_CLASS = `&.${buttonClasses.outlined}`;

const DEFAULT_CSS_BY_COLOR = {
  success: {
    borderColor: "success.main",
    color: "success.main",
    backgroundColor: "success.darkChannel",
  },
  warning: {
    borderColor: "warning.main",
    color: "warning.main",
    backgroundColor: "warning.darkChannel",
  },
  info: {
    borderColor: "divider",
    color: "common.white",
    backgroundColor: "background.paper",
  },
  primary: {
    borderColor: "primary.main",
    color: "primary.main",
    hoverColor: "primary.light",
    backgroundColor: "primary.darkChannel",
  },
};

const getDefaultSx = (
  containedSx?: SxProps,
  outlinedSx?: SxProps,
  overrideCss?: CssOptions,
  cloneSxProp?: SxProps,
) => ({
  textAlign: "center",
  ...typography.subtitle2,
  textTransform: "capitalize",
  minWidth: "fit-content",
  borderRadius: 250,
  px: 2,

  "&>span": {
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
  },

  [`&.${buttonClasses.text}`]: {
    p: 0,
    minWidth: "fit-content",
    width: "fit-content",
    height: "fit-content",
    color: overrideCss?.color ?? "text.primary",
    "&:hover": {
      backgroundColor: "transparent",
      opacity: 0.85,
    },
    [`&.${buttonClasses.disabled}`]: {
      backgroundColor: "transparent",
    },
  },

  [`&.${buttonClasses.sizeSmall}`]: {
    height: 32,
  },
  [`&.${buttonClasses.sizeMedium}`]: {
    height: cloneSxProp?.["height"] ?? 40,
  },
  [`&.${buttonClasses.sizeLarge}`]: {
    height: 48,
  },

  [CONTAINED_CLASS]: {
    ...(overrideCss?.backgroundColor
      ? {
          bgcolor: overrideCss.backgroundColor,
        }
      : {
          // background: "linear-gradient(90deg, #1CD6CE 0%, #83F858 100%)",
          background: "#44B0FC",
        }),
    color: overrideCss?.color ?? "text.secondary",
    boxShadow: "none",
    "&.Mui-disabled": {
      opacity: 0.7,
    },
    // "&:hover:not(.Mui-disabled)": {
    //   backgroundColor: overrideCss?.hoverBackgroundColor,
    //   color: overrideCss?.color,
    //   borderColor: overrideCss?.hoverBorderColor,
    // },
    ...containedSx,
  },

  [OUTLINED_CLASS]: {
    border: "1px solid",
    borderColor: overrideCss?.borderColor ?? "info.light",
    color: overrideCss?.color ?? "info.light",
    bgcolor: overrideCss?.backgroundColor ?? "info.dark",
    transition: "0.5s",
    boxShadow: "none",
    position: "relative",

    "&:hover:not(.Mui-disabled)": {
      backgroundColor: overrideCss?.hoverBackgroundColor,
      color: overrideCss?.hoverColor,
      borderColor: overrideCss?.hoverBorderColor,
    },
    "&.Mui-disabled": {
      opacity: 0.65,
    },
    ...outlinedSx,
  },
});
