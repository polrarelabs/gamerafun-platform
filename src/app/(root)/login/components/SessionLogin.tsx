"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import FormLogin from "./FormLogin";

const SessionLogin = () => {
  return (
    <SessionProvider>
      <FormLogin />
    </SessionProvider>
  );
};

export default SessionLogin;
