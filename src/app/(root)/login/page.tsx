import { LayoutLogin } from "@components/screens/Login";
import { memo } from "react";

import { generateMetadata } from "@utils/seo";
import { Metadata } from "next";
import { LOGIN_PATH } from "@constant/paths";

export const metadata: Metadata = generateMetadata("Login", LOGIN_PATH);

const Login = () => {
  return <LayoutLogin />;
};

export default memo(Login);
