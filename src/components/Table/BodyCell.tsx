import { memo } from "react";
import { TableCell, TableCellProps } from "@mui/material";
import { Text, TextProps } from "components/shared";
import Link, { LinkProps } from "components/Link";
import { typography } from "public/material";

export type BodyCellProps = {
  children?: string | React.ReactNode;
  textProps?: TextProps;
  fallback?: string | React.ReactNode;
  noWrap?: boolean;
  tooltip?: string;
  href?: string;
  linkProps?: Omit<LinkProps, "href">;
  asText?: boolean;
  collapse?: boolean;
} & TableCellProps;

const BodyCell = (props: BodyCellProps) => {
  const {
    children,
    textProps = {},
    sx,
    fallback = "--",
    noWrap,
    tooltip,
    href,
    linkProps = {},
    asText,
    collapse,
    ...rest
  } = props;

  const { sx: sxLink, ...restLinkProps } = linkProps;

  const renderContent = () => {
    return (
      <>
        {asText ||
        !children ||
        ["string", "number"].includes(typeof children) ? (
          <Text
            color="inherit"
            fontSize="inherit"
            fontWeight="inherit"
            lineHeight="inherit"
            noWrap={noWrap}
            tooltip={
              (noWrap && children) || tooltip
                ? ((tooltip ?? children) as string)
                : undefined
            }
            {...textProps}
          >
            {children ?? fallback}
          </Text>
        ) : (
          children
        )}
      </>
    );
  };

  return (
    <TableCell
      sx={{
        py: 1,
        height: HEIGHT_ROW,
        border: "none",
        borderColor: collapse ? "transparent" : "divider",
        ...typography.body2,
        ...sx,
        cursor: rest?.onClick ? "pointer" : "default",
        "&:hover p": {
          color: rest?.onClick ? "primary.main" : undefined,
        },
      }}
      {...rest}
    >
      {href ? (
        <Link
          href={href}
          sx={{
            display: "inline-flex",
            "&:hover": {
              color: "primary.main",
            },
            width: "100%",
            ...sxLink,
          }}
          underline="none"
          {...restLinkProps}
        >
          {renderContent()}
        </Link>
      ) : (
        renderContent()
      )}
    </TableCell>
  );
};

export default memo(BodyCell);

export const HEIGHT_ROW = 48;
