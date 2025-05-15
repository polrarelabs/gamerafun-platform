"use client";

import { setToken } from "@api/helpers";
import WalletModal from "@components/Connect/WalletModal";
import { Button, Image, Text } from "@components/shared";
import useToggle from "@hooks/useToggle";
import GoogleIcon from "@icons/GoogleIcon";
import WalletIcon from "@icons/WalletIcon";
import XIcon from "@icons/XIcon";
import { Stack } from "@mui/material";
import { useAuthLoginX, useLoginGoogle, useSignMessage } from "@store/auth";
import { PropsLoginX } from "@store/auth/action";
import { setCookie } from "@utils";
import Cookies from "js-cookie";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { ACCESSTOKEN_COOKIE } from "../../../../constant/index";
import { HOME_PATH } from "@constant/paths";
import LoginAccount from "./LoginAccount";
import wave from "public/images/wave.gif";

const FormLogin = () => {
  const { isConnectPetra, IsConnectPetra } = useSignMessage();
  const [isShow, onShow, onHide] = useToggle();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const onAnchor = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const searchParams = useSearchParams();
  const { LoginX, dataAuthLogin } = useAuthLoginX();
  const {
    dataAuthLoginGoogle,
    // loadingAuthLoginGoogle,
    // errorAuthLoginGoogle,
    LoginGoogle,
  } = useLoginGoogle();

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

  // useEffect(() => {
  //     if (id && sessionId) {
  //         const param: PropsLoginX = {
  //             id: id,
  //             sessionId: sessionId
  //         };
  //         LoginX(param);
  //     }
  // }, [id, sessionId]);

  // test local

  useEffect(() => {
    if (dataAuthLoginGoogle) {
      // setToken(dataAuthLoginGoogle.accessToken);
      // Cookies.set("accessToken", dataAuthLoginGoogle.accessToken, {
      //   expires: 7,
      //   secure: true,
      //   sameSite: "Strict",
      // });
      // setCookie(ACCESSTOKEN_COOKIE, dataAuthLoginGoogle.accessToken)

      console.log("dataAuthLoginGoogle", dataAuthLoginGoogle);
    }
  }, [dataAuthLoginGoogle]);

  useEffect(() => {
    if (session?.user?.email) {
      LoginGoogle({ email: session.user.email });
    }
  }, [session]);

  // const [pathName, setPathName] = useState(false);

  // useEffect(() => {
  //   if (pathName) {
  //     const param: PropsLoginX = {
  //       id: searchParams.get("xId") || "",
  //       sessionId: searchParams.get("sessionId") || "",
  //     };

  //     console.log(param);

  //     LoginX(param);
  //     setPathName(false);
  //   }
  // }, [pathName]);

  useEffect(() => {
    if (dataAuthLogin && dataAuthLogin.accessToken) {
      setToken(dataAuthLogin.accessToken);
      Cookies.set("accessToken", dataAuthLogin.accessToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      // setCookie(ACCESSTOKEN_COOKIE, dataAuthLogin.accessToken)
      // router.push(HOME_PATH);
      console.log("x duoc r", dataAuthLogin);
    }
  }, [dataAuthLogin]);

  const handleLoginGoogle = () => {
    signIn("google", { callbackUrl: "/" });
    // signIn("google");
  };

  const handleLoginX = async () => {
    window.location.href =
      "https://web3-common-service.polrare.co/api/auth/twitter/callback";

    // test local
    // router.push(paramsTestLocal);
    // setTimeout(() => setPathName(true), 1000);
  };

  const OptionLogin = [
    {
      name: "Google",
      Icon: GoogleIcon,
      functions: handleLoginGoogle,
    },
    // {
    //     name: 'Discord',
    //     Icon: DiscordIcons,
    //     functions: handleLoginDiscord,
    // },
    {
      name: "X (Twitter)",
      Icon: XIcon,
      functions: handleLoginX,
    },
    // {
    //     name: 'Twitch',
    //     Icon: TwitchIcon,
    //     functions: handleLogiTwitch,
    // },
    // {
    //     name: 'Steam',
    //     Icon: SteamIcon,
    //     functions: handleLoginSteam,
    // },
    // {
    //     name: 'Immutable',
    //     Icon: ImmutableIcon,
    //     functions: handleLoginImmutable,
    // },
  ];

  return (
    <Stack
      width={{ md: "40%", xs: "90%" }}
      height={"auto"}
      direction={"column"}
      gap={3}
    >
      {/* {session?.user?.email && (
        <Button variant="contained" onClick={() => signOut()}>
          Log out
        </Button>
      )} */}
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
        <Text fontSize={"28px"} fontWeight={700}>
          Hello Gamer
        </Text>
        <Stack height={30} width={30}>
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
                borderColor: "#94A7C4 !important",
                color: "white !important",
                background: "inherit !important",
                height: "52px !important",
              }}
              onClick={() => functions()}
            >
              <Stack direction={"row"} alignItems={"center"} gap={2}>
                <Icon /> {name}
              </Stack>
            </Button>
          );
        })}
      </Stack>

      <LoginAccount />

      <Stack width={"100%"} direction={"row"} alignItems={"center"} gap={2}>
        <hr style={{ width: "100%", margin: "0 auto", color: "" }} />
        <Text>Or</Text>
        <hr style={{ width: "100%", margin: "0 auto", color: "" }} />
      </Stack>

      <Stack width={"100%"}>
        <Button
          onClick={isConnectPetra ? onAnchor : onShow}
          variant="outlined"
          sx={{
            width: "100%",
            borderRadius: "8px !important",
            border: "none !important",
            height: "50px !important",
            fontSize: "16px",
            fontWeight: 700,
            "&:hover": {
              color: "black",
              background: "#00CE6B",
            },
          }}
        >
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <WalletIcon /> Login With Wallet
          </Stack>
        </Button>
        <WalletModal onClose={onHide} open={isShow} />
      </Stack>
    </Stack>
  );
};

export default FormLogin;
