import { Metadata } from "next";
import { LOGIN_PATH } from "@constant/paths";
import { generateMetadata } from "@utils/seo";
import { redirect } from "next/navigation";

export const metadata: Metadata = generateMetadata("Gamera", "/");

export default function Home() {
  redirect(LOGIN_PATH);
}
