import { Metadata } from "next";
import { AGENTS_PATH, HOME_PATH } from "@constant/paths";
import { generateMetadata } from "@utils/seo";
import { redirect } from "next/navigation";

export const metadata: Metadata = generateMetadata("Noctra AI", HOME_PATH);

export default function Home() {
  redirect(AGENTS_PATH);
}
