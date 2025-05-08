import { Metadata } from "next";
import { AGENTS_PATH, HOME_PATH, GAME_PATH } from "@constant/paths";
import { generateMetadata } from "@utils/seo";
import { redirect } from "next/navigation";

export const metadata: Metadata = generateMetadata("Gamera", "/");

export default function Home() {
  redirect(HOME_PATH);
}
