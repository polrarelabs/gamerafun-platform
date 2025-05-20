import { Breadcrumbs, Stack } from "@mui/material";
import { memo } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@components/Link";
import { Text } from "@components/shared";
import { SCREEN_PX } from "@constant";
import Layout from "@components/News/Layout";

const News = () => {
  return (
    <Stack px={SCREEN_PX} py={4} direction={"column"} gap={4}>
      <Stack direction={"column"} gap={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{
            color: "#FFFFFFA5",
          }}
        >
          <Link underline="hover" color="inherit" href="/">
            <Text sx={{ color: "text.primary" }}>HOME</Text>
          </Link>

          <Text sx={{ color: "text.primary" }}>NEWS</Text>
        </Breadcrumbs>
        <Stack direction={"column"}>
          <Text color="#F9FAFB" fontWeight={700} fontSize={"31px"}>
            News
          </Text>
          <Text color="#9ca3af" fontWeight={400} fontSize={"16px"}>
            Stay on top of the latest blockchain gaming news and enjoy exclusive
            interviews and informative web3 gaming opinion pieces.
          </Text>
        </Stack>
        <Layout />
      </Stack>
    </Stack>
  );
};

export default memo(News);
