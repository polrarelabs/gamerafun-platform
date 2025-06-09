/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, memo } from "react";
import { Stack, StackProps, TooltipProps } from "@mui/material";
import { Tooltip } from "components/shared";

type ContainerProps = StackProps & {
  tooltip?: TooltipProps["title"];
  widthHalf?: boolean;
};

const Container = forwardRef((props: ContainerProps, ref: any) => {
  const { tooltip, widthHalf, sx, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <Stack
          spacing={0.5}
          flex={1}
          ref={ref}
          sx={widthHalf ? { maxWidth: "calc(50% - 8px)", ...sx } : sx}
          {...rest}
        />
      </Tooltip>
    );
  }
  return (
    <Stack
      spacing={0.5}
      ref={ref}
      height="fit-content"
      flex={1}
      sx={widthHalf ? { maxWidth: "calc(50% - 8px)", ...sx } : sx}
      {...rest}
    />
  );
});

export default memo(Container);

Container.displayName = "Container";
