/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { setToken } from "@api/helpers";
import { Button } from "@components/shared";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { ACCESSTOKEN_COOKIE, REFRESHTOKEN_COOKIE } from "@constant";
import { HOME_PATH } from "@constant/paths";
import ArrowRightCircleIcon from "@icons/common/ArrowRightCircleIcon";
import { Stack } from "@mui/material";
import { LoginGoogle, useAuthLogin } from "@store/auth";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { memo, useEffect } from "react";

interface LoginEmailProps {
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

const LoginEmail = ({ setOption }: LoginEmailProps) => {
  const router = useRouter();
  const { data, LoginGoogle } = useAuthLogin();

  const initialValues: LoginGoogle = {
    email: "",
    displayName: "",
    avatar: "",
  };

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setToken(data.accessToken);
      Cookies.set(ACCESSTOKEN_COOKIE, data.accessToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set(REFRESHTOKEN_COOKIE, data.accessToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      router.push(HOME_PATH);
    }
  }, [data]);

  const formik = useFormik({
    initialValues,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);

      LoginGoogle(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction={"column"} gap={2} position={"relative"} pt={6}>
        <ArrowRightCircleIcon
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            rotate: "180deg",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => setOption("social")}
        />

        <Stack gap={2}>
          <TextFieldFormik label="Email" name="email" formik={formik} />

          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default memo(LoginEmail);
