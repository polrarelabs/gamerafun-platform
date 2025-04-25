"use client";

import { ForwardedRef, Fragment, forwardRef, memo, useMemo } from "react";
import { TooltipProps, Typography, TypographyProps } from "@mui/material";
import Tooltip from "./Tooltip";
import { Variant } from "@mui/material/styles/createTypography";
import useBreakpoint from "hooks/useBreakpoint";
import { getActiveBreakpoint } from "@utils";
import { motion, MotionProps } from "framer-motion";
import { poppins } from "public/fonts";

type CoreTextProps = Omit<TypographyProps, "variant"> & {
  // variant?: Variant | { [key in Breakpoint]: Variant };
  variant?: Variant | { [key: string]: Variant } | "inherit";
  motionComponent?: string;
} & Partial<MotionProps>;

export type TextProps = CoreTextProps & {
  tooltip?: TooltipProps["title"];
};

const Text = (props: TextProps) => {
  const { tooltip, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <CoreText {...rest} />
      </Tooltip>
    );
  }

  return <CoreText {...rest} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CoreText = forwardRef((props: CoreTextProps, ref: ForwardedRef<any>) => {
  const {
    variant: variantProps = "body1",
    children,
    motionComponent,
    component,
    ...rest
  } = props;
  const { breakpoint } = useBreakpoint();

  const variant = useMemo(() => {
    if (typeof variantProps === "object") {
      if (breakpoint) {
        return getActiveBreakpoint(breakpoint, variantProps) ?? "body1";
      }
      return variantProps[Object.keys(variantProps)[0]];
    }
    return variantProps ?? "body1";
  }, [variantProps, breakpoint]) as Variant | "inherit";

  return (
    <Typography
      ref={ref}
      variant={variant}
      color="text.primary"
      fontFamily={poppins.style.fontFamily}
      component={motionComponent ? motion[motionComponent] : component}
      {...rest}
    >
      {typeof children === "string"
        ? getChildrenArray(children).map((line, index) => (
            <Fragment key={`${line}_${index}`}>
              {index !== 0 && <br />}
              {line}
            </Fragment>
          ))
        : children}
    </Typography>
  );
});

CoreText.displayName = "CoreText";

export default memo(Text);

const getChildrenArray = (value) => {
  if (!value || typeof value !== "string") return [value];
  return value?.replace(/(?:\r\n|\r|\n)/g, "<∆br/>")?.split("<∆br/>");
};
