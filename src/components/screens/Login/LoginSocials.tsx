"use client";
import { setToken } from "@api/helpers";
import WalletModal from "@components/Connect/WalletModal";
import { Button, Image, Text } from "@components/shared";
import { HOME_PATH } from "@constant/paths";
import useToggle from "@hooks/useToggle";
import ArrowRightCircleIcon from "@icons/common/ArrowRightCircleIcon";
import DiscordIcons from "@icons/socials/DiscordIcons";
import GoogleIcon from "@icons/socials/GoogleIcon";
import ImmutableIcon from "@icons/socials/ImmutableIcon";
import SteamIcon from "@icons/socials/SteamIcon";
import TwitchIcon from "@icons/socials/TwitchIcon";
import XIcon from "@icons/socials/XIcon";
import { Stack } from "@mui/material";
import { useAuthLogin } from "@store/auth";
import { PropsLoginX } from "@store/auth/action";
import Cookies from "js-cookie";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import aptos from "public/images/aptos-seeklogo.svg";
import wave from "public/images/wave.gif";
import { memo, MouseEvent, useEffect, useState } from "react";
import { URL_CALLBACK_X } from "./helper";
import { palette } from "public/material";
import { ACCESSTOKEN_COOKIE, REFRESHTOKEN_COOKIE } from "@constant";

interface PropsSocials {
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

const LoginSocials = ({ setOption }: PropsSocials) => {
  const [isShow, onShow, onHide] = useToggle();
  const [_anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const onAnchor = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const router = useRouter();

  const searchParams = useSearchParams();

  const { data, LoginGoogle, LoginX, isConnectAptos } = useAuthLogin();
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
      setToken(data.accessToken);
      Cookies.set(ACCESSTOKEN_COOKIE, data.accessToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set(REFRESHTOKEN_COOKIE, data.refreshToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      router.push(HOME_PATH);
    }
  }, [data]);

  useEffect(() => {
    console.log("session", session);

    if (session?.user?.email) {
      LoginGoogle({ email: session.user.email });
      console.log("login google", session.user.email);
    }
  }, [session]);

  const handleLoginGoogle = () => {
    // signIn("google", { callbackUrl: HOME_PATH });
    signIn("google");
  };

  const handleLoginX = () => {
    window.location.href = URL_CALLBACK_X;
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
    <>
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
                border: `1px solid  ${palette.colorRelate?.borderColor} !important`,
                color: "white !important",
                background: "inherit !important",
                height: "52px !important",
                "&:hover": {
                  background: `${palette.colorRelate?.bgColorHover} !important`,
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
      <Stack width={"100%"} direction={"row"} alignItems={"center"}>
        <hr
          style={{
            width: "100%",
            border: "none",
            borderTop: `1px solid ${palette.colorRelate?.borderColor}`,
            margin: 0,
          }}
        />
        <Text
          fontWeight={400}
          fontSize={"16px"}
          color={palette.text80}
          width={"100%"}
          textAlign={"center"}
        >
          Or continue with
        </Text>
        <hr
          style={{
            width: "100%",
            border: "none",
            borderTop: `1px solid ${palette.colorRelate?.borderColor}`,
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
          onClick={() => {
            setOption("email");
          }}
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
    </>
  );
};

export default memo(LoginSocials);
