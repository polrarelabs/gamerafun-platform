import { memo } from "react";
import { Stack } from "@mui/material";
import { SCREEN_PX } from "@constant";
import { Text } from "@components/shared";
import TwitterIcon from "@icons/socials/TwitterIcon";
import TelegramIcon from "@icons/socials/TelegramIcon";
import DiscordIcon from "@icons/socials/DiscordIcon";
import Link from "@components/Link";
import { TELE_URL, X_URL } from "./helper";
import Subscribe from "@components/Subscribe";

type FooterProps = {};

const Footer = (props: FooterProps) => {
  return (
    <Stack
      component="footer"
      py={4}
      alignItems="center"
      px={SCREEN_PX}
      spacing={2}
    >
      <Subscribe />
      <Text variant="caption" textAlign="center" color="grey.400">
        Disclaimer: Digital assets are highly speculative and involve
        significant risk of loss. The value of meme coins is extremely volatile,
        and any one who wishes to trade in any meme coin should be prepared for
        the possibility of losing their entire investment. Gamera makes no
        representations or warranties regarding the success or profitability of
        any meme coin developed on the platform. Gamera is a public,
        decentralized, and permissionless platform. Participation by any project
        should not be seen as an endorsement or recommendation by Gamera. Users
        should assess their financial situation, risk tolerance, and do their
        own research before trading in any meme coins on the platform. Gamera
        will not be held liable for any losses, damages, or issues that may
        arise from trading in any meme coins developed on the platform.
      </Text>
      <Stack direction="row" alignItems="center" spacing={2}>
        {DATA.map(({ Icon, ...item }) => (
          <Link
            sx={{ height: 24 }}
            key={item.href}
            href={item.href}
            target="_blank"
          >
            <Icon sx={{ color: "grey.400", fontSize: 24 }} />
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

export default memo(Footer);

const DATA = [
  { Icon: TwitterIcon, href: X_URL },
  { Icon: TelegramIcon, href: TELE_URL },
  // { Icon: DiscordIcon, href: "https://Gamera.ai" },
];
