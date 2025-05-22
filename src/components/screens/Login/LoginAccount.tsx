"use client";
import React, { memo, useEffect } from "react";
import { useFormik } from "formik";
import { type LoginAccount, useAuthLogin } from "@store/auth";
import { Stack } from "@mui/material";
import { Button } from "@components/shared";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { validationSchema } from "./helper";
import { setToken } from "@api/helpers";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { HOME_PATH } from "@constant/paths";
import { ACCESSTOKEN_COOKIE, REFRESHTOKEN_COOKIE } from "@constant";
const LoginAccount = () => {
  const router = useRouter();
  const { data, LoginAccount } = useAuthLogin();

  const initialValues: LoginAccount = {
    userName: "",
    password: "",
  };

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      console.log("data-admin", data);

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
    validationSchema: validationSchema,
    onSubmit: (values) => {
      LoginAccount(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction={"column"} gap={2}>
        <TextFieldFormik label="Username" name="userName" formik={formik} />
        <TextFieldFormik
          label="Password"
          name="password"
          formik={formik}
          password={true}
        />
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default memo(LoginAccount);
