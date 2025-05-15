"use client";
import React, { memo, useEffect } from "react";
import { useFormik } from "formik";
import { type LoginAccount, useLoginAccount } from "@store/auth";
import { Stack } from "@mui/material";
import { Button } from "@components/shared";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { validationSchema } from "./ValidationSchema";
import { setToken } from "@api/helpers";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { HOME_PATH } from "@constant/paths";
const LoginAccount = () => {
  const router = useRouter();
  const { LoginAccount, dataAuthLoginAccount } = useLoginAccount();

  const initialValues: LoginAccount = {
    userName: "",
    password: "",
  };

  useEffect(() => {
    if (dataAuthLoginAccount && dataAuthLoginAccount.accessToken) {
      setToken(dataAuthLoginAccount.accessToken);
      Cookies.set("accessToken", dataAuthLoginAccount.accessToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      router.push(HOME_PATH);
    }
  }, [dataAuthLoginAccount]);

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
