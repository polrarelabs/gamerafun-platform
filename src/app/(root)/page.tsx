import { HOME_PATH } from "@constant/paths";
import { generateMetadata } from "@utils/seo";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = generateMetadata("Gamera", "/");

export default function Home() {
  redirect(HOME_PATH);
}
