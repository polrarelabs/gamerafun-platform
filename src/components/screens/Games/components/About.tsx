"use client";

import { Image, Text } from "@components/shared";
import DiscordIcon from "@icons/socials/DiscordIcon";
import FacebookIcon from "@icons/socials/FacebookIcon";
import InstagramIcon from "@icons/socials/InstagramIcon";
import TwitterIcon from "@icons/socials/TwitterIcon";
import WebsiteIcon from "@icons/web3/WebsiteIcon";
import YoutubeIcon from "@icons/socials/YoutubeIcon";
import { Stack, Divider, Box } from "@mui/material";
import logoGame from "/public/images/img-logo.png";
import { memo } from "react";
import { useGame } from "@store/game";

const About = () => {
  const { gameById } = useGame();
  return (
    <>
      <Stack my={4}>
        <Divider textAlign="left">ABOUT {gameById.name}</Divider>
      </Stack>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Stack direction={"column"} spacing={1}>
          <Text variant="body2">Studio</Text>
          <Text variant="h4">Multiverse</Text>
        </Stack>
        <Stack direction={"column"} spacing={1}>
          <Text variant="body2">Website</Text>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          {listIcon.map((item, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "darkslategray",
                borderColor: "white",
                borderRadius: "25%",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.icon}
            </Box>
          ))}
        </Stack>
        <Image
          src={logoGame}
          alt={`img-${logoGame}`}
          containerProps={{
            sx: {
              width: "100px",
              height: "100px",
              overflow: "hidden",
            },
          }}
        />
      </Stack>
    </>
  );
};

export default memo(About);

interface Icon {
  icon: React.ReactNode;
}
const listIcon: Icon[] = [
  { icon: <WebsiteIcon /> },
  { icon: <TwitterIcon /> },
  { icon: <DiscordIcon /> },
  {
    icon: (
      <InstagramIcon
        sx={{ width: "14px !important", height: "14px !important" }}
      />
    ),
  },
  {
    icon: (
      <YoutubeIcon
        sx={{ width: "14px !important", height: "14px !important" }}
      />
    ),
  },
  {
    icon: (
      <FacebookIcon
        sx={{ width: "14px !important", height: "14px !important" }}
      />
    ),
  },
];
