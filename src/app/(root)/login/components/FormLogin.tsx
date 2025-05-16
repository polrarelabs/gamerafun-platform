"use client";

import { setToken } from "@api/helpers";
import WalletModal from "@components/Connect/WalletModal";
import { Button, Image, Text } from "@components/shared";
import { HOME_PATH } from "@constant/paths";
import useAptosWallet from "@hooks/useAptosWallet";
import useToggle from "@hooks/useToggle";
import GoogleIcon from "@icons/GoogleIcon";
import XIcon from "@icons/XIcon";
import { Box, Stack } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { useAptos, useAuthLogin } from "@store/auth";
import { PropsLoginX } from "@store/auth/action";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import wave from "public/images/wave.gif";
import { MouseEvent, useEffect, useState } from "react";
import LoginAccount from "./LoginAccount";
import aptos from "public/images/aptos-seeklogo.svg";
import ImmutableIcon from "@icons/ImmutableIcon";
import SteamIcon from "@icons/SteamIcon";
import TwitchIcon from "@icons/TwitchIcon";
import DiscordIcons from "@icons/DiscordIcons";
import { signIn, useSession } from "next-auth/react";
import ArrowLongIcon from "@icons/ArrowLongIcon";
import ArrowRightCircleIcon from "@icons/ArrowRightCircleIcon";

type GoogleUser = {
  email: string;
  name: string;
  picture: string;
};

const FormLogin = () => {
  const { isConnectAptos, IsConnectAptos } = useAptos();
  const [isShow, onShow, onHide] = useToggle();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const onAnchor = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const router = useRouter();

  const searchParams = useSearchParams();

  const { data, LoginGoogle, LoginX } = useAuthLogin();
  const { data: session } = useSession();
  const pathName = usePathname();

  useEffect(() => {
    const id = searchParams.get("xId") || undefined;
    const sessionId = searchParams.get("sessionId") || undefined;
    if (id !== undefined && sessionId !== undefined) {
      const param: PropsLoginX = {
        id: id,
        sessionId: sessionId,
      };
      LoginX(param);
    }
  }, [pathName]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      console.log("dataLogin", data);

      setToken(data.accessToken);
      Cookies.set("accessToken", data.accessToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      router.push(HOME_PATH);
    }
  }, [data]);

  useEffect(() => {
    if (session?.user?.email) {
      console.log("sess", session?.user?.email);

      LoginGoogle({ email: session.user.email });
    }
  }, [session]);

  const handleLoginGoogle = () => {
    signIn("google", { callbackUrl: HOME_PATH });
    // signIn("google");
  };
  // const login = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       const { access_token } = tokenResponse;

  //       const { data } = await axios.get(
  //         "https://www.googleapis.com/oauth2/v3/userinfo",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${access_token}`,
  //           },
  //         },
  //       );

  //       const googleUser: GoogleUser = {
  //         email: data.email,
  //         name: data.name,
  //         picture: data.picture,
  //       };

  //       console.log("Google user info:", googleUser);

  //       await LoginGoogle({ email: googleUser.email });
  //     } catch (error) {
  //       console.error("Failed to fetch Google user", error);
  //     }
  //   },
  //   onError: () => {
  //     console.error("Login Failed");
  //   },
  // });

  const handleLoginX = () => {
    window.location.href =
      "https://web3-common-service.polrare.co/api/auth/twitter/callback";
  };

  const OptionLogin = [
    {
      name: "Google",
      Icon: GoogleIcon,
      functions: handleLoginGoogle,
    },
    {
      name: "Discord",
      Icon: DiscordIcons,
      // functions: handleLoginDiscord,
    },
    {
      name: "X (Twitter)",
      Icon: () => <XIcon />,
      functions: handleLoginX,
    },
    {
      name: "Twitch",
      Icon: TwitchIcon,
      // functions: handleLogiTwitch,
    },
    {
      name: "Steam",
      Icon: SteamIcon,
      // functions: handleLoginSteam,
    },
    {
      name: "Immutable",
      Icon: ImmutableIcon,
      // functions: handleLoginImmutable,
    },
  ];

  const [hover, setHover] = useState<boolean>(false);

  return (
    <Stack
      width={{ md: "40%", xs: "90%" }}
      height={"auto"}
      direction={"column"}
      gap={{ md: 3, xs: 2 }}
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
        <Text fontSize={"48px"} fontWeight={700}>
          Hello Gamer
        </Text>
        <Stack height={48} width={48}>
          <Image
            src={wave}
            alt="preview"
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
      </Stack>
      <Stack display={"grid"} gridTemplateColumns={"repeat(2,1fr)"} gap={2}>
        {OptionLogin.map(({ Icon, name, functions }) => {
          return (
            <Button
              key={name}
              variant="outlined"
              sx={{
                width: "100%",
                borderRadius: "8px !important",
                border: "1px solid #FFFFFF40 !important",
                color: "white !important",
                background: "inherit !important",
                height: "52px !important",
                "&:hover": {
                  background: "#FFFFFF1A !important",
                },
              }}
              onClick={() => functions?.()}
            >
              <Stack direction={"row"} alignItems={"center"} gap={2}>
                {Icon && <Icon />} {name}
              </Stack>
            </Button>
          );
        })}
      </Stack>

      {/* <LoginAccount /> */}

      <Stack width={"100%"} direction={"row"} alignItems={"center"}>
        <hr
          style={{
            width: "100%",
            border: "none",
            borderTop: "1px solid #FFFFFF40",
            margin: 0,
          }}
        />
        <Text
          fontWeight={400}
          fontSize={"16px"}
          color="#FFFFFF80"
          width={"100%"}
          textAlign={"center"}
        >
          Or continue with
        </Text>
        <hr
          style={{
            width: "100%",
            border: "none",
            borderTop: "1px solid #FFFFFF40",
            margin: 0,
          }}
        />
      </Stack>

      <Stack width={"100%"}>
        <Button
          onClick={isConnectAptos ? onAnchor : onShow}
          variant="outlined"
          sx={{
            width: "100%",
            borderRadius: "10008px !important",
            border: "none !important",
            height: "50px !important",
            fontSize: "16px",
            fontWeight: 700,
            background: "white !important",
            "&:hover": {
              color: "black",
            },
          }}
        >
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Text color="black" fontSize={"18px"} fontWeight={700}>
              Connect
            </Text>
            <Stack height={24} width={24}>
              <Image
                src={aptos}
                alt="preview"
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
            <Text color="black" fontSize={"18px"} fontWeight={700}>
              Aptos Wallet
            </Text>
          </Stack>
        </Button>

        <Stack
          direction={"row"}
          alignItems={"center"}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          mt={2}
          gap={1}
          justifyContent={"center"}
        >
          <Text
            color="white"
            fontWeight={700}
            fontSize={"18px"}
            sx={{
              textDecoration: hover ? "underline" : undefined,
            }}
          >
            Continue With Email
          </Text>
          <ArrowRightCircleIcon />
        </Stack>
        <WalletModal onClose={onHide} open={isShow} />
      </Stack>
    </Stack>
  );
};

export default FormLogin;
