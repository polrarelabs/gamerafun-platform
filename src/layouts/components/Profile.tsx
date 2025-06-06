"use client";

import { Button, Image, Text } from "@components/shared";
import { ACCESSTOKEN_COOKIE, REFRESHTOKEN_COOKIE } from "@constant";
import useAptosWallet from "@hooks/useAptosWallet";
import DropDownIcon from "@icons/common/DropDownIcon";
import LogOutIcon from "@icons/web3/LogOutIcon";
import { Popover, Stack } from "@mui/material";
import { useAuthLogin, useLogOut } from "@store/auth";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import login_token from "public/images/login-token.svg";
import { palette } from "public/material";
import React, { memo, useState } from "react";
import { GetEmail, GetUserName } from "./helper";
import {
  CREATE_GAME_PATH,
  CREATE_GENRES_PATH,
  CREATE_NEWS_PATH,
  QUESTS_CREATE_PATH,
  UPDATE_GAME_PATH,
} from "@constant/paths";
import { useRouter } from "next/navigation";
declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

const Profile = () => {
  const { logOut } = useLogOut();
  const { data } = useAuthLogin();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { disconnect } = useAptosWallet();

  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleLogOut = () => {
    Cookies.remove(ACCESSTOKEN_COOKIE, { path: "/" });
    Cookies.remove(REFRESHTOKEN_COOKIE, { path: "/" });
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
    signOut();
    disconnect();
    logOut();
  };

  const handleNext = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          background: "inherit !important",
        }}
      >
        <Stack gap={1} direction={"row"} alignItems={"center"}>
          <Image src={login_token} alt="LoginToken" />
          <DropDownIcon
            sx={{
              height: "14px",
              width: "14px",
            }}
          />
        </Stack>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          zIndex: 9999,
        }}
      >
        <Stack direction={"column"} gap={"16px"} p={"16px"}>
          <Stack
            sx={{
              borderBottom: `1px solid ${palette.colorBorderBlack}`,
              paddingBottom: "16px",
            }}
            direction={"row"}
            gap="8px"
            alignItems={"center"}
          >
            <Stack
              height={50}
              width={50}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                src={login_token}
                alt="LoginToken"
                size="100%"
                aspectRatio={1 / 1}
                sizes="14px"
                containerProps={{
                  sx: {
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "8px",
                    "& img": {
                      objectFit: "cover",
                      objectPosition: "center",
                    },
                  },
                }}
              />
            </Stack>
            <Stack direction={"column"} justifyContent={"center"}>
              <Text
                color="white"
                lineHeight={"150%"}
                fontSize="16px"
                fontWeight={500}
              >
                {GetUserName(data)}
              </Text>

              <Text
                color={palette.text80}
                lineHeight={"150%"}
                fontSize="14px"
                fontWeight={400}
              >
                {GetEmail(data)}
              </Text>
            </Stack>
          </Stack>

          <Stack gap={2}>
            {ListFeature.map((item, index) => {
              return (
                <Stack
                  key={index}
                  onClick={() => handleNext(item.path)}
                  sx={{
                    padding: 1,
                    "&:hover": {
                      background: palette.bgMenuHover,
                      cursor: "pointer",
                    },
                  }}
                >
                  {item.title}
                </Stack>
              );
            })}
          </Stack>

          <Stack
            color="white"
            direction={"row"}
            gap="8px"
            alignItems={"center"}
            onClick={handleLogOut}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <LogOutIcon />
            <Text
              color="white"
              lineHeight={"150%"}
              fontSize="16px"
              fontWeight={500}
            >
              Log out
            </Text>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};

export default memo(Profile);

const ListFeature = [
  {
    title: "Create Game",
    path: CREATE_GAME_PATH,
  },
  {
    title: "Update Game",
    path: UPDATE_GAME_PATH,
  },
  {
    title: "Create Blog",
    path: CREATE_NEWS_PATH,
  },
  {
    title: "Create Genres",
    path: CREATE_GENRES_PATH,
  },
  {
    title: "Create Quest",
    path: QUESTS_CREATE_PATH,
  },
];
