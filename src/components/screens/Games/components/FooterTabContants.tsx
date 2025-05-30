"use client";

import { Image, Text } from "@components/shared";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { palette } from "public/material";
import React, { memo } from "react";
import YoutubeIcon from "@icons/socials/YoutubeIcon";
import TwitterIcon from "@icons/socials/TwitterIcon";
import DiscordIcon from "@icons/socials/DiscordIcon";
import TelegramIcon from "@icons/socials/TelegramIcon";
import MediumIcon from "@icons/socials/MediumIcon";
import Link from "@components/Link";

const FooterTabContants = () => {
  const { gameById } = useGame();

  const arrSocial = [
    {
      social: "YOUTUBE",
      href: gameById.youtube,
    },
    {
      social: "TWITTER",
      href: gameById.twitter,
    },
    {
      social: "DISCORD",
      href: gameById.discord,
    },
    {
      social: "TELEGRAM",
      href: gameById.telegramChat,
    },
    {
      social: "MEDIUM",
      href: gameById.medium,
    },
  ];

  const GetIconSocail = (value: string) => {
    switch (value) {
      case "YOUTUBE":
        return <YoutubeIcon sx={{ fontSize: 20 }} />;
      case "TWITTER":
        return <TwitterIcon sx={{ fontSize: 20 }} />;
      case "DISCORD":
        return <DiscordIcon sx={{ fontSize: 20 }} />;
      case "TELEGRAM":
        return <TelegramIcon sx={{ fontSize: 20 }} />;
      default:
        return <MediumIcon sx={{ fontSize: 20 }} />;
    }
  };

  return (
    <Stack gap={2}>
      <Stack direction={"row"} alignItems={"center"} gap={2} width={"100%"}>
        <Text
          color={palette.colorGray}
          fontSize={"20px"}
          letterSpacing={"8px"}
          whiteSpace="nowrap"
          sx={{ flexShrink: 0 }}
        >
          About {gameById.name}
        </Text>
        <hr
          style={{
            flex: 1,
            border: "none",
            borderBottom: `1px dashed ${palette.colorRelate?.borderColor}`,
            margin: 0,
            minWidth: 0,
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack gap={1}>
          <Text color={palette.colorGray} fontSize={"16px"}>
            Studio
          </Text>
          <Text color={palette.textWhite} fontSize={"20px"}>
            Name Studio
          </Text>
        </Stack>
        <Stack gap={1}>
          <Text color={palette.colorGray} fontSize={"16px"}>
            Website
          </Text>
          <Text color={palette.textWhite} fontSize={"20px"}>
            {gameById.website}
          </Text>
        </Stack>
        <Stack
          display={"grid"}
          gridTemplateColumns={"repeat(5,1fr)"}
          alignItems={"center"}
          gap={1}
        >
          {arrSocial.map((item, index) => {
            if (item.href && item.href.length > 0) {
              return (
                <Stack
                  key={index}
                  component={Link}
                  href={item.href}
                  height={40}
                  width={42}
                  border={`1px solid ${palette.bgMenuHover}`}
                  borderRadius={"8px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    color: `${palette.textWhite} !important`,
                    background: palette.colorRelate?.bgBtnSocial,
                    "&:hover": {
                      background: palette.colorRelate?.bgBtnSocialHover,
                      cursor: "pointer",
                      color: "white !important",
                    },
                  }}
                >
                  {GetIconSocail(item.social)}
                </Stack>
              );
            }
          })}
        </Stack>

        {gameById.mediaUrl && gameById.mediaUrl.length > 0 && (
          <Stack position={"relative"}>
            <Image
              src={gameById.mediaUrl[0]}
              alt={`img-${gameById.mediaUrl[0]}`}
              size="100%"
              aspectRatio={1 / 1}
              sizes={150}
              draggable={false}
              containerProps={{
                sx: {
                  width: 150,
                  height: 150,
                  overflow: "hidden",
                  "& img": {
                    objectFit: "cover",
                    objectPosition: "center",
                  },
                },
              }}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default memo(FooterTabContants);
