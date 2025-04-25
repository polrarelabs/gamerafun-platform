import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  MouseEvent,
} from "react";
import { Dropdown, IconButton, Text } from "@components/shared";
import ChevronIcon from "@icons/ChevronIcon";
import { Box, Stack } from "@mui/material";
import {
  useHolders,
  useSwaps,
  // useSwaps,
  useTokenDetail,
  useTransactions,
} from "@store/token";
import { formatNumber, limitDecimalNumber } from "@utils";
import {
  ColorType,
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import { palette } from "public/material";
import useSocket from "@hooks/useSocket";

type PrototypeChartProps = {};

const PrototypeChart = (props: PrototypeChartProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | undefined>(undefined);
  const candlestickSeriesRef =
    useRef<ISeriesApi<"Candlestick", any>>(undefined);
  const { onGetTransactions, items, filters } = useTransactions();
  const { socket } = useSocket();
  const { token, onGetToken } = useTokenDetail();
  const { onGetHolders } = useHolders();
  const { onAddSwap } = useSwaps();
  const isFitScaleRef = useRef<boolean>(false);
  const intervalRef = useRef<number>(filters.interval);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [cloneItems, setCloneItems] = useState<string>(JSON.stringify(items));

  const open = useMemo(() => !!anchorEl, [anchorEl]);

  const intervalsSliced = useMemo(() => INTERVALS.slice(0, 6), []);

  const isSlicedSelected = useMemo(
    () => intervalsSliced.some((item) => item.value === filters.interval),
    [filters.interval, intervalsSliced],
  );

  const onAnchor = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const renderItem = (item) => {
    return (
      <Text fontWeight={600} textTransform="initial">
        {item.label}
      </Text>
    );
  };

  const onGetData = useCallback(
    (interval = INTERVALS[2].value) => {
      if ((token?.complete && !token?.pool_id) || !candlestickSeriesRef.current)
        return;

      onGetTransactions({
        pageIndex: 1,
        pageSize: 10000,
        token: token?.pool_id ?? "",
        interval,
      });
    },
    [onGetTransactions, token?.complete, token?.pool_id],
  );

  const onSelect = (item) => {
    return () => {
      onGetData(item.value);
      onClose();
    };
  };

  useEffect(() => {
    if (!containerRef?.current) return;
    chartRef.current = createChart(containerRef.current, CHART_OPTIONS);

    candlestickSeriesRef.current = chartRef.current.addCandlestickSeries({
      priceFormat: {
        type: "price",
        minMove: 0.000001,
      },
    });
    candlestickSeriesRef.current.setData([]);
  }, []);

  useEffect(() => {
    if (!candlestickSeriesRef.current || !chartRef?.current) return;
    const parseItems = JSON.parse(cloneItems);
    candlestickSeriesRef.current.setData(parseItems);

    if (!isFitScaleRef.current && parseItems.length) {
      if (parseItems.length > 6) {
        chartRef.current.timeScale().fitContent();
      }
      isFitScaleRef.current = true;
    }
  }, [cloneItems]);

  useEffect(() => {
    onGetData();
  }, [onGetData]);

  useEffect(() => {
    if (!socket || !token?.pool_id || !token?.token_address) return;
    socket?.on("app.swap", (data) => {
      if (data.pool_id === token.pool_id) {
        onGetToken(token.pool_id, true);
        onGetData(intervalRef.current);
        onGetHolders(token.token_address, token.pool_id);
        onAddSwap(data);
      }
    });
  }, [
    onAddSwap,
    onGetData,
    onGetHolders,
    onGetToken,
    socket,
    token?.pool_id,
    token?.token_address,
  ]);

  useEffect(() => {
    // Avoid chart update when items not changed
    setCloneItems(JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    intervalRef.current = filters.interval;
  }, [filters.interval]);

  return (
    <Box
      width="100%"
      position="relative"
      height={400}
      minHeight={400}
      border="1px solid"
      borderColor="divider"
      borderRadius={2}
    >
      <Box width="100%" height="100%" ref={containerRef} />
      <Stack
        zIndex={10}
        direction="row"
        position="absolute"
        bgcolor="background.default"
        left={0}
        px={1}
        bottom={0}
        alignItems="center"
      >
        {intervalsSliced.slice(0, 6).map((item) => {
          const arrSplit = item.label.split(" ");
          return (
            <Text
              onClick={onSelect(item)}
              borderRadius={1}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "divider",
                },
              }}
              px={0.75}
              py={0.5}
              variant="caption"
              key={item.label}
              color={
                item.value === filters.interval ? "primary.main" : undefined
              }
            >
              {arrSplit[0] + arrSplit[1].slice(0, 1)}
            </Text>
          );
        })}
        <IconButton noPadding onClick={onAnchor}>
          <ChevronIcon
            sx={{
              fontSize: 16,
              color: isSlicedSelected ? undefined : "primary.main",
            }}
          />
        </IconButton>
        <Dropdown
          onSelect={onSelect}
          open={open}
          anchorEl={anchorEl}
          onClose={onClose}
          renderItem={renderItem}
          options={INTERVALS}
          selected={filters.interval}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{ minWidth: 140, maxHeight: 250, overflow: "auto" }}
        />
      </Stack>
    </Box>
  );
};

export default memo(PrototypeChart);

const INTERVALS = [
  { label: "1 minute", value: 60 },
  { label: "3 minutes", value: 180 },
  { label: "5 minutes", value: 300 },
  { label: "15 minutes", value: 900 },
  { label: "30 minutes", value: 1800 },
  { label: "1 hour", value: 3600 },
  { label: "2 hours", value: 7200 },
  { label: "4 hours", value: 14400 },
  { label: "12 hours", value: 43200 },
  { label: "1 day", value: 86400 },
  { label: "1 weeks", value: 604800 },
  { label: "1 month", value: 259200 },
];

const CHART_OPTIONS = {
  autoSize: true,
  layout: {
    background: {
      type: ColorType.Solid,
      color: palette.background?.default,
    },
    textColor: palette.text?.primary,
  },
  grid: {
    vertLines: {
      color: palette.divider,
    },
    horzLines: {
      color: palette.divider,
    },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
  },

  localization: {
    priceFormatter: (priceValue) =>
      formatNumber(priceValue, { numberOfFixed: 2 }),
  },
  timeScale: {
    secondsVisible: false,
    timeVisible: true,
    yScale: {
      min: 0,
    },
  },
  handleScale: {
    axisPressedMouseMove: {
      price: false,
      time: true,
    },
  },
};
