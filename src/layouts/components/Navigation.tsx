"use client";

import Link from "@components/Link";
import { Text } from "@components/shared";
import { GAME_PATH, GENRES_PATH, HOME_PATH, NEWS_PATH } from "@constant/paths";
import useBreakpoint from "@hooks/useBreakpoint";
import ArrowIcon from "@icons/common/ArrowIcon";
import Sidebar from "@layouts/Sidebar";
import { Popover, Stack } from "@mui/material";
import { usePathname } from "next/navigation";
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
              // {...props}
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
              // {...props}
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
        <Stack
          direction="row"
          height="100%"
          spacing={4}
          // {...props}
        >
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
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const pathname = usePathname();

  const isActive = useMemo(
    () =>
      pathname === props?.href?.toString() ||
      pathname.startsWith(props?.href?.toString()),
    [pathname, props?.href],
  );

  const [hover, setHover] = useState<boolean>(false);

  const handleHover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setHover(true);
    setAnchorEl(event.currentTarget);
  };

  const handleUnHover = () => {
    setHover(false);
    setAnchorEl(null);
  };

  return (
    <>
      {label === "Games" ? (
        <>
          <Stack
            component={Link}
            href={href}
            className={isActive ? "active" : ""}
            sx={sx.item}
            target={href?.startsWith("http") ? "_blank" : undefined}
            onClick={() => onHide()}
            gap={1}
            direction={"row"}
            alignItems={"center"}
            onMouseEnter={handleHover}
            onMouseLeave={handleUnHover}
            position={"relative"}
          >
            <Text variant="subtitle2" color="inherit">
              {label}
            </Text>
            <ArrowIcon
              sx={{
                transform: hover ? "rotate(180deg)" : "rotate(0deg)",
                transition: "all 0.3s ease-in-out",
                fontSize: 12,
              }}
            />
          </Stack>
        </>
      ) : (
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
    // justifyContent: "center",
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
    // "&:hover, &.active": {
    //   color: { xs: "primary.main", md: "common.white" },
    //   "&:after": {
    //     background: "linear-gradient(90deg, #1CD6CE 0%, #83F858 100%)",
    //   },
    // },
  },
};

const DATA = [
  {
    label: "Home",
    href: HOME_PATH,
  },
  { label: "Games", href: GAME_PATH },
  { label: "News", href: NEWS_PATH },
  { label: "Genres", href: GENRES_PATH },
  // {
  //   label: "Research",
  //   href: "https://research.noctra.ai",
  // },
  // { label: "Engine", href: STUDIO_URL },
  // { label: "Docs", href: DOCUMENTS_URL },
];
