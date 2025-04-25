"use client";
import { memo, useEffect, useId, useState } from "react";
import { Menu, MenuItem, MenuProps, menuClasses } from "@mui/material";

type DropdownProps = MenuProps & {
  options: unknown[];
  renderItem: (item: unknown) => React.ReactElement;
  onSelect: (item: unknown) => () => void;
  selected?: string | number;
};

const Dropdown = (props: DropdownProps) => {
  const { anchorEl, sx, options, renderItem, onSelect, selected, ...rest } =
    props;

  const id = useId();
  const [lastWidth, setLastWidth] = useState<string | number | undefined>();

  useEffect(() => {
    if (!anchorEl?.["offsetWidth"]) return;
    setLastWidth(anchorEl["offsetWidth"]);
  }, [anchorEl]);

  return (
    <Menu
      id={id}
      MenuListProps={{
        "aria-labelledby": BASIC_BUTTON_ID,
      }}
      disableAutoFocusItem
      sx={{
        [`& .${menuClasses.paper}`]: {
          backgroundImage: "none",
          width: anchorEl?.["offsetWidth"] ?? lastWidth,
          minWidth: "fit-content",
          overflow: "hidden",
          bgcolor: "background.paper",
          borderRadius: 1,
          border: "1px solid",
          borderColor: "grey.800",
          mt: 1,
          [`& .${menuClasses.list}`]: {
            p: 0,
          },
          ...sx,
        },
      }}
      anchorEl={anchorEl}
      {...rest}
    >
      {options.map((item, index) => (
        <MenuItem
          sx={{
            px: 2.25,
            py: 1,
            "&:hover": {
              backgroundColor: "primary.darkChannel",
            },
            "&.active": {
              backgroundColor: "primary.main",
            },
          }}
          className={item?.["value"] === selected ? "active" : ""}
          onClick={onSelect(item)}
          key={index}
        >
          {renderItem(item)}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default memo(Dropdown);

const BASIC_BUTTON_ID = "basic-button";
