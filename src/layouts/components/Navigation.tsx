import { memo, useMemo } from "react";
import { Stack, StackProps } from "@mui/material";
import Link from "@components/Link";
import { AGENTS_PATH, GAME_PATH, HOME_PATH, NEWS_PATH } from "@constant/paths";
import { usePathname } from "next/navigation";
import { DOCUMENTS_URL, STUDIO_URL } from "@constant/links";
import { Text } from "@components/shared";

type ItemProps = {
  label: string;
  href: string;
};

const Navigation = (props: StackProps) => {
  return (
    <Stack direction="row" height="100%" spacing={4} {...props}>
      {DATA.map((item) => (
        <Item key={item.label} {...item} />
      ))}
    </Stack>
  );
};

export default memo(Navigation);

const Item = (props: ItemProps) => {
  const { label, href } = props;

  const pathname = usePathname();

  const isActive = useMemo(
    () =>
      pathname === props?.href?.toString() ||
      pathname.startsWith(props?.href?.toString()),
    [pathname, props?.href],
  );

  return (
    <Stack
      component={Link}
      href={href}
      className={isActive ? "active" : ""}
      sx={sx.item}
      target={href?.startsWith("http") ? "_blank" : undefined}
    >
      <Text variant="subtitle2" color="inherit">
        {label}
      </Text>
    </Stack>
  );
};

const sx = {
  item: {
    position: "relative",
    color: "common.white",
    display: "flex",
    justifyContent: "center",
    "&:after": {
      content: { sm: "''" },
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: 2,
    },
    "&:hover, &.active": {
      color: { xs: "primary.main", sm: "common.white" },
      "&:after": {
        background: "linear-gradient(90deg, #1CD6CE 0%, #83F858 100%)",
      },
    },
  },
};

const DATA = [
  {
    label: "Home",
    href: HOME_PATH,
  },
  { label: "Games", href: GAME_PATH },
  { label: "News", href: NEWS_PATH },
  // {
  //   label: "Research",
  //   href: "https://research.noctra.ai",
  // },
  // { label: "Engine", href: STUDIO_URL },
  // { label: "Docs", href: DOCUMENTS_URL },
];
