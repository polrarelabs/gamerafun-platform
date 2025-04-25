import { memo, useMemo } from "react";
import { ButtonBase, ButtonBaseProps, Stack } from "@mui/material";
import { TabType } from "../helpers";
import { Text } from "@components/shared";
import { useTokenDetail } from "@store/token";

type TabListProps = {
  selected: TabType;
  onChange: (newTab: TabType) => void;
};

type TabProps = ButtonBaseProps & {};

const TabList = (props: TabListProps) => {
  const { selected, onChange } = props;

  const { token } = useTokenDetail();

  const tabs = useMemo(
    () => (token?.complete ? BASE_TABS : PROTOTYPE_TABS),
    [token?.complete],
  );

  return (
    <Stack
      my={4}
      spacing={1.125}
      direction="row"
      alignItems="center"
      borderBottom="1px solid"
      borderColor="divider"
    >
      {tabs.map((item) => (
        <Tab
          className={selected === item.value ? "active" : ""}
          onClick={() => {
            onChange(item.value);
          }}
          key={item.value}
        >
          {item.label}
        </Tab>
      ))}
    </Stack>
  );
};

export default memo(TabList);

const Tab = (props: TabProps) => {
  const { children, sx, ...rest } = props;

  return (
    <Stack
      component={ButtonBase}
      justifyContent="center"
      alignItems="center"
      sx={{
        color: "grey.400",
        "&.active": {
          borderColor: "secondary.main",
          color: "common.white",
        },
        ...sx,
      }}
      borderBottom="1px solid transparent"
      py={1}
      px={1.25}
      {...rest}
    >
      <Text variant="subtitle2" color="inherit">
        {children}
      </Text>
    </Stack>
  );
};

const BASE_TABS = [
  { label: "Transactions", value: TabType.TRANSACTIONS },
  { label: "Summary", value: TabType.SUMMARY },
];

const PROTOTYPE_TABS = [
  ...BASE_TABS,
  { label: "Holders", value: TabType.HOLDERS },
];
