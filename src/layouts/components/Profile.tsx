"use client";

import { GetEmail } from "@components/auth/GetEmail";
import { GetUserName } from "@components/auth/GetUserName";
import { Image, Text } from "@components/shared";
import { LOGIN_PATH } from "@constant/paths";
import useAptosWallet from "@hooks/useAptosWallet";
import DropDownIcon from "@icons/DropDownIcon";
import LogOutIcon from "@icons/LogOutIcon";
import { Fade, Popper, Stack } from "@mui/material";
import { useAuthLogin, useLogOut } from "@store/auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import login_token from "public/images/login-token.svg";
import React, { memo, useState } from "react";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { disconnect } = useAptosWallet();
  const { logOut } = useLogOut();

  const { data } = useAuthLogin();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleLogOut = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
    disconnect();
    signOut();
    logOut();
    router.push(LOGIN_PATH);
  };

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={"8px"}
        color={"white"}
        onClick={handleClick}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Image src={login_token} alt="LoginToken" />
        <DropDownIcon
          sx={{
            height: "14px",
            width: "14px",
          }}
        />
      </Stack>
      <Popper
        sx={{
          zIndex: 1200,
          mt: "19.5px !important",
          backgroundColor: "#181A20",
          borderRadius: "8px",
          padding: "24px",
          border: "1px solid #FFFFFF1A",
          width: "100%",
          maxWidth: "320px",
        }}
        open={open}
        anchorEl={anchorEl}
        placement={"bottom-end"}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Stack direction={"column"} gap={"16px"}>
              <Stack
                sx={{
                  borderBottom: "1px solid #FFFFFF1A",
                  paddingBottom: "16px",
                }}
                direction={"row"}
                gap="16px"
              >
                <Stack height={"48px"} width={"48px"}>
                  <Image src={login_token} alt="LoginToken" />
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
                    color="#FFFFFF80"
                    lineHeight={"150%"}
                    fontSize="14px"
                    fontWeight={400}
                  >
                    {GetEmail(data)}
                  </Text>
                </Stack>
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
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default memo(Profile);
