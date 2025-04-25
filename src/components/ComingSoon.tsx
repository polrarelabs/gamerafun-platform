import { memo } from "react";
import { Stack } from "@mui/material";
import { Image, Text } from "./shared";
import { MIN_HEIGHT_SCREEN, SCREEN_PX } from "@constant";
import BotImg from "public/images/img-bot.png";

type ComingSoonProps = {};

const ComingSoon = (props: ComingSoonProps) => {
  return (
    <Stack
      px={SCREEN_PX}
      pt={4}
      pb={14}
      justifyContent="center"
      alignItems="center"
      spacing={2.5}
      width="100%"
      flex={1}
      minHeight={MIN_HEIGHT_SCREEN}
      mx="auto"
    >
      <Stack maxWidth={827} spacing={4} alignItems="center" width="100%">
        <Image
          src={BotImg}
          size={{ xs: 100, md: 200 }}
          sizes="200px"
          aspectRatio={1}
          alt=""
        />
        <Text
          letterSpacing="20px"
          textTransform="uppercase"
          fontSize={{ xs: 30, md: 40, lg: 60, xl: 82 }}
          fontWeight={600}
          textAlign="center"
        >
          Coming soon
        </Text>
      </Stack>
    </Stack>
  );
};

export default memo(ComingSoon);
