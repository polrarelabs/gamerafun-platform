/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export interface TabItem {
  id?: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

export function useCustomTabs(defaultIndex = 0) {
  const [value, setValue] = React.useState(defaultIndex);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return { value, handleChange, setValue };
}

export interface TabHeadersProps {
  tabs: TabItem[];
  value?: number;
  handleChange?: (e: React.SyntheticEvent, val: number) => void;
  handleClick?: (id: any) => void;
  orientation?: "vertical" | "horizontal";
  sx?: SxProps;
}

export function TabHeaders({
  tabs,
  value,
  handleChange,
  handleClick,
  orientation = "horizontal",
  sx,
}: TabHeadersProps) {
  return (
    <Box>
      <Tabs
        orientation={orientation}
        value={value}
        onChange={() => {
          if (handleChange) handleChange;
        }}
        aria-label="custom tabs"
        textColor="inherit"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            {...a11yProps(index)}
            onClick={() => {
              if (handleClick && tab.id) handleClick(tab.id);
            }}
            disabled={tab.disabled}
            sx={{
              ...sx,
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export function TabContents({
  tabs,
  value,
}: {
  tabs: TabItem[];
  value: number;
}) {
  return (
    <>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </>
  );
}
