"use client";

import { setToken } from "@api/helpers";
import WalletModal from "@components/Connect/WalletModal";
import { Button, Image, Text } from "@components/shared";
import { HOME_PATH } from "@constant/paths";
import useAptosWallet from "@hooks/useAptosWallet";
import useToggle from "@hooks/useToggle";
import GoogleIcon from "@icons/GoogleIcon";
import XIcon from "@icons/XIcon";
import { Stack } from "@mui/material";
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
  // const { data: session } = useSession();
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

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;

        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        );

        const googleUser: GoogleUser = {
          email: data.email,
          name: data.name,
          picture: data.picture,
        };

        console.log("Google user info:", googleUser);

        await LoginGoogle({ email: googleUser.email });
      } catch (error) {
        console.error("Failed to fetch Google user", error);
      }
    },
    onError: () => {
      console.error("Login Failed");
    },
  });

  const handleLoginX = () => {
    window.location.href =
      "https://web3-common-service.polrare.co/api/auth/twitter/callback";
  };

  const OptionLogin = [
    {
      name: "Google",
      Icon: GoogleIcon,
      functions: login,
    },
    // {
    //     name: 'Discord',
    //     Icon: DiscordIcons,
    //     functions: handleLoginDiscord,
    // },
    {
      name: "X (Twitter)",
      Icon: () => <XIcon />,
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

  const { disconnect } = useAptosWallet();

  return (
    <Stack
      width={{ md: "40%", xs: "90%" }}
      height={"auto"}
      direction={"column"}
      gap={{ md: 3, xs: 2 }}
    >
      {/* {session?.user?.email && (
        <Button variant="contained" onClick={() => signOut()}>
          Log out
        </Button>
      )} */}
      {/* <Button onClick={() => disconnect()}>out</Button> */}
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
              onClick={() => functions?.()}
            >
              <Stack direction={"row"} alignItems={"center"} gap={2}>
                {Icon && <Icon />} {name}
              </Stack>
            </Button>
            // <>
            //   {name === 'Google' ?
            //     <Stack>
            //       <GoogleLogin
            //         onSuccess={handleLoginGoogleSuccess}
            //         onError={handleLoginGoogleError}
            //         useOneTap
            //         theme="filled_black"
            //         size="large"
            //         width="100%"

            //       />
            //     </Stack>
            //     :
            // <Button
            //   key={name}
            //   variant="outlined"
            //   sx={{
            //     width: "100%",
            //     borderRadius: "8px !important",
            //     borderColor: "#94A7C4 !important",
            //     color: "white !important",
            //     background: "inherit !important",
            //     height: "52px !important",
            //   }}
            //   onClick={() => functions?.()}
            // >
            //   <Stack direction={"row"} alignItems={"center"} gap={2}>
            //     {Icon && <Icon />} {name}
            //   </Stack>
            // </Button>
            //   }
            // </>
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
              // background: "#00CE6B",
            },
          }}
        >
          <Stack direction={"row"} alignItems={"center"} gap={2}>
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
        <WalletModal onClose={onHide} open={isShow} />
      </Stack>
    </Stack>
  );
};

export default FormLogin;
