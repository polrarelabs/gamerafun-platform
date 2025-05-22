import { BodyCell, TableLayout } from "@components/Table";
import { TableLayoutProps } from "@components/Table/TableLayout";
import {
  APP_ENVIRONMENT,
  CONFIG_BY_CURRENCY,
  DEFAULT_PAGING,
  TOKEN_DECIMAL,
} from "@constant";
import useNow from "@hooks/useNow";
import ArrowTopRightIcon from "@icons/common/ArrowTopRightIcon";
import { TableRow } from "@mui/material";
import { useSwaps, useTokenDetail } from "@store/token";
import {
  formatNumber,
  shortAddress,
  shortDistance,
  blockchainToNumber,
} from "@utils";
import { memo, useEffect, useMemo } from "react";
import StringFormat from "string-format";

const HistoriesSwap = () => {
  const { token } = useTokenDetail();
  const now = useNow(1000);

  const {
    items,
    totalItems,
    totalPages,
    pageIndex,
    pageSize,
    isFetching,
    isSucceeded,
    onGetSwaps,
  } = useSwaps();

  const config = useMemo(
    () => (token?.currency ? CONFIG_BY_CURRENCY[token?.currency] : undefined),
    [token?.currency],
  );

  const onReachedEnd = () => {
    if (!token?.pool_id || isFetching || !totalPages || pageIndex >= totalPages)
      return;

    onGetSwaps({
      pageSize,
      pageIndex: pageIndex + 1,
      pool_id: token.pool_id,
    });
  };

  useEffect(() => {
    if (!token?.pool_id) return;
    onGetSwaps({ ...DEFAULT_PAGING, pool_id: token.pool_id });
  }, [onGetSwaps, token?.pool_id]);

  return (
    <TableLayout
      width="100%"
      noData={isSucceeded && totalItems === 0}
      headerList={HEADER_LIST as TableLayoutProps["headerList"]}
      headerProps={{ sx: { bgcolor: "#262628", py: 1.5 } }}
      bgcolor="background.paper"
      border="1px solid"
      pending={isFetching || !token || !config}
      borderColor="divider"
      flex={1}
      maxHeight={500}
      minHeight={300}
      onReachedEnd={onReachedEnd}
    >
      {items.map((item) => (
        <TableRow key={item.transactionHash} className="not-hover">
          <BodyCell>{shortDistance(new Date(item.timestampMs), now)}</BodyCell>
          <BodyCell
            textProps={{
              color: item.is_buy ? "success.main" : "error.main",
            }}
          >
            {item.is_buy ? "Buy" : "Sell"}
          </BodyCell>
          <BodyCell>
            {formatNumber(
              blockchainToNumber(
                item.amount,
                (item.is_buy ? config?.decimals : token?.decimals) as number,
              ),
              { numberOfFixed: TOKEN_DECIMAL },
            )}
          </BodyCell>
          <BodyCell>
            {formatNumber(
              blockchainToNumber(
                item.receive,
                (item.is_buy ? token?.decimals : config?.decimals) as number,
              ),
              { numberOfFixed: TOKEN_DECIMAL },
            )}
          </BodyCell>
          <BodyCell>{shortAddress(item.sender)}</BodyCell>
          <BodyCell
            align="right"
            linkProps={{ target: "_blank" }}
            href={StringFormat(
              `https://explorer.aptoslabs.com/txn/{txn}?network=${APP_ENVIRONMENT === "production" ? "mainnet" : "testnet"}`,
              {
                txn: item.transactionHash,
              },
            )}
          >
            <ArrowTopRightIcon color="primary" fontSize="small" />
          </BodyCell>
        </TableRow>
      ))}
    </TableLayout>
  );
};

export default memo(HistoriesSwap);

const HEADER_LIST = [
  { value: "Date", width: "15%", minWidth: 120 },
  { value: "Type", width: "15%" },
  { value: "Amount", width: "25%", minWidth: 150 },
  { value: "Received", width: "25%", minWidth: 150 },
  { value: "Wallet Address", width: "15%" },
  { value: "TXN", width: "10%", align: "right" },
];
