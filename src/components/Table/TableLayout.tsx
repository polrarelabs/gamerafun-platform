/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  BoxProps,
  CircularProgress,
  Stack,
  StackProps,
  SxProps,
  Table,
  TableBody,
  TableCellProps,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  createRef,
  forwardRef,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CellBody from "./BodyCell";
import CellHeader, { HeaderCellProps, HEIGHT_HEADER } from "./HeaderCell";
import { AN_ERROR_TRY_RELOAD_PAGE } from "@constant";
import useWindowSize from "@hooks/useWindowSize";

export type CellProps = TableCellProps & {
  value: string | React.ReactNode;
  width?: string | number;
  minWidth?: number;
};

export type TableLayoutProps = {
  numberOfRows?: number;
  headerList: CellProps[];
  children: React.ReactNode;
  pending?: boolean;
  error?: string;
  noData?: boolean;
  onCreate?: () => void;
  onEdit?: () => void;
  headerProps?: Partial<HeaderCellProps>;
  containerHeaderProps?: BoxProps;
  accessKey?: string;
  onLayout?: (refs: any) => void;
  onReachedEnd?: () => void;
} & StackProps;

const TableLayout = forwardRef((props: TableLayoutProps, ref) => {
  const {
    numberOfRows = 10,
    headerList,
    children,
    pending,
    error,
    noData,
    onCreate,
    onEdit,
    headerProps = {},
    accessKey,
    containerHeaderProps = {},
    onLayout,
    onReachedEnd,

    ...rest
  } = props;

  const { sx: sxHeaderProps, ...restHeaderProps } = headerProps;
  const { sx: sxContainerHeaderProps, ...restContainerHeaderProps } =
    containerHeaderProps;

  const [bodySx, setBodySx] = useState<SxProps>({});
  const { width } = useWindowSize();

  const headerRef = useRef<HTMLDivElement | null>(null);

  const refs = useMemo(
    () => headerList?.map(() => createRef<HTMLTableCellElement>()),
    [headerList],
  );

  const nOfColumnsNotWidthFixed = useMemo(
    () =>
      headerList.reduce((out: number, item) => (out += !item.width ? 1 : 0), 0),
    [headerList],
  );

  const hasAdditionalRow = useMemo(
    () => Boolean(error || pending || noData),
    [error, noData, pending],
  );

  const onScroll = (event) => {
    const { scrollLeft, scrollTop, scrollHeight, clientHeight } = event.target;

    headerRef.current?.scrollTo(scrollLeft, 0);

    if (onReachedEnd && scrollTop + clientHeight > scrollHeight - 5) {
      onReachedEnd();
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      const newBodySx = refs?.reduce((out: any, item, index) => {
        out[`& td:nth-of-type(${index + 1}), & th:nth-of-type(${index + 1})`] =
          {
            minWidth: item?.current?.offsetWidth,
            width: item?.current?.offsetWidth,
            maxWidth: item?.current?.offsetWidth,
            overflowX: "hidden",
          };
        return out;
      }, {});
      setBodySx(newBodySx);
    }, 250);
  }, [headerList, refs, children, width]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      onLayout && onLayout(refs.map((ref) => ref.current?.offsetWidth));
    }, 250);
  }, [onLayout, headerList, refs, width]);

  return (
    <Stack
      // flex={1}
      // maxHeight={HEIGHT_ROW * (numberOfRows + 1) + HEIGHT_HEADER + 10}
      overflow="hidden"
      borderRadius={2}
      {...rest}
    >
      <Box
        sx={{
          overflow: "hidden",
          minHeight: HEIGHT_HEADER,
          ...sxContainerHeaderProps,
        }}
        ref={headerRef}
        borderBottom="1px solid"
        borderColor="divider"
        {...restContainerHeaderProps}
      >
        <Table>
          <TableHead>
            <TableRow>
              {headerList.map(({ sx: sxItem, minWidth, ...item }, index) => (
                <CellHeader
                  key={index}
                  {...item}
                  width={item.width ?? `${100 / nOfColumnsNotWidthFixed}%`}
                  sx={
                    {
                      maxWidth:
                        item.width ?? `${100 / nOfColumnsNotWidthFixed}%`,
                      minWidth,
                      ...sxItem,
                      ...sxHeaderProps,
                    } as CellProps["sx"]
                  }
                  {...restHeaderProps}
                  ref={refs[index]}
                >
                  {item.value}
                </CellHeader>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </Box>

      <Box
        // maxHeight={HEIGHT_ROW * numberOfRows}
        sx={{
          overflowY: "auto",
          overflowX: { xs: "auto", md: "hidden" },
        }}
        onScroll={onScroll}
        ref={ref}
      >
        <Table
          sx={{
            "& tr:not(.not-hover):hover": {
              bgcolor: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          <TableBody sx={bodySx}>
            {children}
            {hasAdditionalRow && (
              <TableRow className="not-hover">
                <CellBody
                  colSpan={headerList.length}
                  align="center"
                  sx={{
                    border: "none",
                    color: error ? "error.main" : undefined,
                    height: pending || error || noData ? 192 : undefined,
                  }}
                >
                  {pending ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : Boolean(error) ? (
                    (error ?? AN_ERROR_TRY_RELOAD_PAGE)
                  ) : noData ? (
                    "No data."
                  ) : null}
                </CellBody>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Stack>
  );
});

export default memo(TableLayout);

TableLayout.displayName = "TableLayout";
