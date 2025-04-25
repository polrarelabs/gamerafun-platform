import { ForwardedRef, forwardRef, memo } from "react";
import { TableCell, TableCellProps } from "@mui/material";
import { Text, TextProps } from "components/shared";

export type HeaderCellProps = {
  children: string | React.ReactNode;
  textProps?: TextProps;
} & TableCellProps;

const HeaderCell = forwardRef(
  (props: HeaderCellProps, ref: ForwardedRef<HTMLTableCellElement>) => {
    const { children, textProps = {}, sx, ...rest } = props;

    return (
      <TableCell
        sx={{
          borderBottom: "none",
          pt: 0.1875,
          pb: 1.1875,
          px: 2.5,
          ...sx,
        }}
        height={HEIGHT_HEADER}
        ref={ref}
        {...rest}
      >
        {typeof children === "string" ? (
          <Text
            variant="subtitle2"
            color="grey.400"
            textTransform="uppercase"
            component="span"
            whiteSpace="nowrap"
            {...textProps}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </TableCell>
    );
  },
);

export default memo(HeaderCell);

HeaderCell.displayName = "HeaderCell";

export const HEIGHT_HEADER = 32;
