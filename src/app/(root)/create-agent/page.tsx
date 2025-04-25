import { Metadata } from "next";
import { AGENTS_PATH, CREATE_AGENT_PATH } from "@constant/paths";
import { generateMetadata } from "@utils/seo";
import { Stack } from "@mui/material";
import { Form } from "@components/screens/CreateAgent";
import Back from "@components/Back";
import { MIN_HEIGHT_SCREEN } from "@constant";

export const metadata: Metadata = generateMetadata(
  "Create Agent",
  CREATE_AGENT_PATH,
);

export default function Home() {
  return (
    <Stack flex={1} overflow="auto" minHeight={MIN_HEIGHT_SCREEN}>
      <Stack
        spacing={4}
        alignItems="center"
        flex={1}
        width="100%"
        mx="auto"
        maxWidth={1200}
        mb={14}
      >
        <Back label="Agents" href={AGENTS_PATH} alignSelf="flex-start" />
        <Form />
      </Stack>
    </Stack>
  );
}
