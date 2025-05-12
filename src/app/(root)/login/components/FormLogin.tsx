"use client";

import { Button, Text } from "@components/shared";
import DiscordIcons from "@icons/DiscordIcons";
import GoogleIcon from "@icons/GoogleIcon";
import ImmutableIcon from "@icons/ImmutableIcon";
import SteamIcon from "@icons/SteamIcon";
import TwitchIcon from "@icons/TwitchIcon";
import XIcon from "@icons/XIcon";
import { Stack } from "@mui/material";
import { useAuthLoginX, useLoginGoogle, useSignMessage } from "@store/auth";
import { PropsLoginX } from "@store/auth/action";
import { useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import WalletIcon from "@icons/WalletIcon";
import { CREATE_AGENT_PATH } from "@constant/paths";
import Link from "@components/Link";
import useToggle from "@hooks/useToggle";
import WalletModal from "@components/Connect/WalletModal";
import Cookies from "js-cookie";

const FormLogin = () => {
  const { isConnectPetra, IsConnectPetra } = useSignMessage();
  const [isShow, onShow, onHide] = useToggle();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const onAnchor = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const paramsTestLocal =
    "?sessionId=o_4OibOSB4DlvF07TN637DRTqYlL22mT&xId=1688586721917796352";
  const router = useRouter();

  const searchParams = useSearchParams();
  // const [id, setId] = useState<string>();
  // const [sessionId, setSessionId] = useState<string>();
  const { LoginX, dataAuthLogin } = useAuthLoginX();
  const {
    dataAuthLoginGoogle,
    // loadingAuthLoginGoogle,
    // errorAuthLoginGoogle,
    LoginGoogle,
  } = useLoginGoogle();

  const { data: session } = useSession();
  // const pathName = usePathname()

  // useEffect(() => {
  //     setId(searchParams.get('xId') || undefined);
  //     setSessionId(searchParams.get('sessionId') || undefined);
  // }, [pathName, searchParams]);

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
    console.log("dataAuthLoginGoogle", dataAuthLoginGoogle);
  }, [dataAuthLoginGoogle]);

  useEffect(() => {
    if (session?.user?.email) {
      console.log("login", session?.user?.email);
      LoginGoogle({ email: session.user.email });
    }
  }, [session]);

  const [pathName, setPathName] = useState(false);

  useEffect(() => {
    if (pathName) {
      const param: PropsLoginX = {
        id: searchParams.get("xId") || "",
        sessionId: searchParams.get("sessionId") || "",
      };

      console.log(param);

      LoginX(param);
      setPathName(false);
    }
  }, [pathName]);

  useEffect(() => {
    console.log(dataAuthLogin);
    if (dataAuthLogin?.accessToken) {
      Cookies.set("accessToken", dataAuthLogin.accessToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
    }
  }, [dataAuthLogin]);

  const handleLoginGoogle = () => {
    // signIn("google", { callbackUrl: "/" })
    signIn("google");
  };

  const handleLoginX = async () => {
    // window.location.href = 'https://web3-common-service.polrare.co/api/auth/twitter/callback';

    // test local
    router.push(paramsTestLocal);
    setTimeout(() => setPathName(true), 1000);
  };
  // const handleLogiTwitch = () => {
  // }
  // const handleLoginSteam = () => {
  // }
  // const handleLoginImmutable = () => {
  // }

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
      width={{ md: "50%", xs: "90%" }}
      height={"auto"}
      direction={"column"}
      gap={4}
    >
      {session?.user?.email && (
        <Button variant="contained" onClick={() => signOut()}>
          Log out
        </Button>
      )}
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
            height: "70px !important",
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
