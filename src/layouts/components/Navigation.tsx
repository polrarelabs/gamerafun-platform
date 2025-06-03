"use client";

import Link from "@components/Link";
import { Text } from "@components/shared";
import {
  GAME_PATH,
  GENRES_PATH,
  HOME_PATH,
  NEWS_PATH,
  QUESTS_PATH,
} from "@constant/paths";
import useBreakpoint from "@hooks/useBreakpoint";
import ArrowIcon from "@icons/common/ArrowIcon";
import Sidebar from "@layouts/Sidebar";
import { Box, Popover, Stack } from "@mui/material";
import { usePathname } from "next/navigation";
import { palette } from "public/material";
import { memo, useMemo, useState } from "react";
type ItemProps = {
  label: string;
  href: string;
  onHide: () => void;
};

interface Props {
  onHide?: () => void;
  directions?: string;
}

// const Navigation = (props: StackProps) => {
const Navigation = ({ onHide, directions }: Props) => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <>
      {isMdSmaller ? (
        <>
          {directions === "column" ? (
            <Stack
              direction="column"
              height="100%"
              spacing={4}
              justifyContent={"start"}
            >
              {DATA.map((item) => (
                <Item
                  onHide={onHide || (() => {})}
                  key={item.label}
                  {...item}
                />
              ))}
            </Stack>
          ) : (
            <Stack
              height="100%"
              display={"grid"}
              gridTemplateColumns={`repeat(${DATA.length + 1},1fr)`}
            >
              {DATA.map((item) => (
                <Stack
                  key={item.label}
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Item onHide={onHide || (() => {})} {...item} />
                </Stack>
              ))}
              <Sidebar />
            </Stack>
          )}
        </>
      ) : (
        <Stack direction="row" height="100%" spacing={4}>
          {DATA.map((item) => (
            <Item onHide={onHide || (() => {})} key={item.label} {...item} />
          ))}
        </Stack>
      )}
    </>
  );
};

export default memo(Navigation);

const Item = (props: ItemProps) => {
  const { label, href, onHide } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const pathname = usePathname();

  const isActive = useMemo(
    () =>
      pathname === props?.href?.toString() ||
      pathname.startsWith(props?.href?.toString()),
    [pathname, props?.href],
  );

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget as HTMLDivElement);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {label === "Games" ? (
        <Stack
          component={Link}
          aria-describedby={id}
          href={href}
          className={isActive ? "active" : ""}
          sx={sx.item}
          target={href?.startsWith("http") ? "_blank" : undefined}
          gap={1}
          direction="row"
          alignItems="center"
          position="relative"
        >
          <Text variant="subtitle2" color="inherit">
            {label}
          </Text>
          <ArrowIcon
            sx={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "all 0.3s ease-in-out",
              fontSize: 12,
            }}
          />
        </Stack>
      ) : (
        // <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        // <Stack
        //   component={Link}
        //   aria-describedby={id}
        //   href={href}
        //   className={isActive ? "active" : ""}
        //   sx={sx.item}
        //   target={href?.startsWith("http") ? "_blank" : undefined}
        //   gap={1}
        //   direction="row"
        //   alignItems="center"
        //   position="relative"
        // >
        //   <Text variant="subtitle2" color="inherit">
        //     {label}
        //   </Text>
        //   <ArrowIcon
        //     sx={{
        //       transform: open ? "rotate(180deg)" : "rotate(0deg)",
        //       transition: "all 0.3s ease-in-out",
        //       fontSize: 12,
        //     }}
        //   />
        // </Stack>

        //   <Popover
        //     id={id}
        //     open={open}
        //     anchorEl={anchorEl}
        //     onClose={() => setAnchorEl(null)}
        //     anchorOrigin={{
        //       vertical: "bottom",
        //       horizontal: "left",
        //     }}
        //     transformOrigin={{
        //       vertical: "top",
        //       horizontal: "left",
        //     }}
        //     disableRestoreFocus
        //     sx={{ zIndex: 9999 }}
        //   >
        //     <Stack direction="column" gap="16px" p="16px" minWidth={200}>
        //       <Stack
        //         borderBottom={`1px solid ${palette.colorBorderBlack}`}
        //         pb="16px"
        //         direction="row"
        //         gap="8px"
        //         alignItems="center"
        //       >
        //         <Stack direction="column" justifyContent="center">
        //           <Text
        //             color="white"
        //             lineHeight="150%"
        //             fontSize="16px"
        //             fontWeight={500}
        //           >
        //             1
        //           </Text>
        //           <Text
        //             color={palette.text80}
        //             lineHeight="150%"
        //             fontSize="14px"
        //             fontWeight={400}
        //           >
        //             1
        //           </Text>
        //         </Stack>
        //       </Stack>

        //       <Stack
        //         color="white"
        //         direction="row"
        //         gap="8px"
        //         alignItems="center"
        //         sx={{ "&:hover": { cursor: "pointer" } }}
        //       >
        //         <Text
        //           color="white"
        //           lineHeight="150%"
        //           fontSize="16px"
        //           fontWeight={500}
        //         >
        //           Log out
        //         </Text>
        //       </Stack>
        //     </Stack>
        //   </Popover>
        // </Box>
        <Stack
          component={Link}
          href={href}
          className={isActive ? "active" : ""}
          sx={sx.item}
          target={href?.startsWith("http") ? "_blank" : undefined}
          onClick={() => onHide()}
        >
          <Text variant="subtitle2" color="inherit">
            {label}
          </Text>
        </Stack>
      )}
    </>
  );
};

const sx = {
  item: {
    position: "relative",
    color: "common.white",
    display: "flex",
    zIndex: 10,
    "&:after": {
      content: { md: "''" },
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: 2,
    },
    "&:hover, &.active": {
      color: "primary.main",
    },
  },
};

const DATA = [
  { label: "Home", href: HOME_PATH },
  { label: "Games", href: GAME_PATH },
  { label: "News", href: NEWS_PATH },
  { label: "Genres", href: GENRES_PATH },
  { label: "Quests", href: QUESTS_PATH },
];
