/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useRef, useState } from "react";

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

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

export interface TabItem {
  id?: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

export function useCustomTabs(defaultIndex = 0) {
  const [value, setValue] = useState(defaultIndex);

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
  tabIndicatorSx?: SxProps;
}

export function TabHeaders({
  tabs,
  value = 0,
  handleChange,
  handleClick,
  orientation = "horizontal",
  sx,
  tabIndicatorSx,
}: TabHeadersProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showNav, setShowNav] = useState(false);

  // Khi resize kiểm tra có cần hiện nút điều hướng
  useEffect(() => {
    const checkOverflow = () => {
      if (!scrollRef.current) return;
      setShowNav(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const scrollTabs = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 150;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Box position="relative" sx={{ width: "100%" }}>
      {showNav && (
        <IconButton
          onClick={() => scrollTabs("left")}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            background: "#000000aa",
            color: "#fff",
            "&:hover": { background: "#000" },
          }}
        >
          <ChevronLeft />
        </IconButton>
      )}

      <Box
        ref={scrollRef}
        sx={{
          overflowX: orientation === "horizontal" ? "auto" : "unset",
          overflowY: "hidden",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
          "&::-webkit-scrollbar": { display: "none" }, // Chrome
        }}
      >
        <Tabs
          orientation={orientation}
          value={value}
          onChange={(e, newValue) => handleChange?.(e, newValue)}
          variant="scrollable"
          scrollButtons={false}
          aria-label="custom tabs"
          textColor="inherit"
          sx={{
            minHeight: 0,
            whiteSpace: orientation === "horizontal" ? "nowrap" : "normal",
          }}
          slotProps={{
            indicator: {
              sx: tabIndicatorSx,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              onClick={() => {
                if (handleClick && tab.id) handleClick(tab.id);
              }}
              disabled={tab.disabled}
              sx={{
                minWidth: "max-content",
                ...sx,
              }}
            />
          ))}
        </Tabs>
      </Box>

      {showNav && (
        <IconButton
          onClick={() => scrollTabs("right")}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            background: "#000000aa",
            color: "#fff",
            "&:hover": { background: "#000" },
          }}
        >
          <ChevronRight />
        </IconButton>
      )}
    </Box>
  );
}

// export function TabHeaders({
//   tabs,
//   value = 0,
//   handleChange,
//   handleClick,
//   orientation = "horizontal",
//   sx,
//   tabIndicatorSx,
// }: TabHeadersProps) {
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         overflowX: orientation === "horizontal" ? "auto" : "unset",
//       }}
//     >
//       <Tabs
//         orientation={orientation}
//         value={value}
//         onChange={(e, newValue) => handleChange?.(e, newValue)}
//         variant={orientation === "horizontal" ? "scrollable" : "standard"}
//         scrollButtons={orientation === "horizontal" ? "auto" : undefined}
//         aria-label="custom tabs"
//         textColor="inherit"
//         sx={{
//           minHeight: 0,
//           whiteSpace: orientation === "horizontal" ? "nowrap" : "normal",
//         }}
//         slotProps={{
//           indicator: {
//             sx: tabIndicatorSx,
//           },
//         }}
//       >
//         {tabs.map((tab, index) => (
//           <Tab
//             key={index}
//             label={tab.label}
//             {...a11yProps(index)}
//             onClick={() => {
//               if (handleClick && tab.id) handleClick(tab.id);
//             }}
//             disabled={tab.disabled}
//             sx={{
//               minWidth: "max-content",
//               ...sx,
//             }}
//           />
//         ))}
//       </Tabs>
//     </Box>

//   );
// }

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
