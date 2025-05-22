import { memo } from "react";
import { Stack, StackProps } from "@mui/material";
import Link, { LinkProps } from "@components/Link";
import TelegramIcon from "@icons/socials/TelegramIcon";
import TwitterIcon from "@icons/socials/TwitterIcon";
import { Token } from "@constant/types";
import WebsiteIcon from "@icons/web3/WebsiteIcon";

type SocialsProps = {
  data: Token;
  showAll?: boolean;
  usePush?: boolean;
  itemProps?: StackProps & Partial<LinkProps>;
};

const Socials = (props: SocialsProps) => {
  const { data, showAll = true, usePush, itemProps } = props;
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {DATA.map((item) => {
        if (showAll || data[item.key]) {
          return (
            <Item key={item.key} href={data[item.key]} usePush {...itemProps}>
              {item.icon}
            </Item>
          );
        }
        return null;
      })}
    </Stack>
  );
};

export default memo(Socials);

const Item = (props: LinkProps & { usePush?: boolean }) => {
  const { children, usePush, href, ...rest } = props;

  const onClick = (event) => {
    if (!href) return;
    event.preventDefault();
    event.stopPropagation();

    window.open(props.href as string, "_blank");
  };

  return (
    <Stack
      component={href && !usePush ? Link : "div"}
      href={usePush ? undefined : href}
      onClick={usePush ? onClick : undefined}
      borderRadius={1.25}
      direction="row"
      alignItems="center"
      p={1}
      target="_blank"
      bgcolor="grey.A400"
      sx={{
        cursor: usePush ? "pointer" : undefined,
        "& svg": {
          fontSize: 16,
          color: "common.white",
        },
        opacity: href ? undefined : 0.5,
      }}
      {...rest}
    >
      {children}
    </Stack>
  );
};

const DATA = [
  { key: "x", icon: <TwitterIcon /> },
  { key: "telegram", icon: <TelegramIcon /> },
  { key: "website", icon: <WebsiteIcon /> },
];
