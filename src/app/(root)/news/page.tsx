import Layout from "@components/screens/News/Layout";
import { Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX } from "@constant";
import { Stack } from "@mui/material";
import { palette } from "public/material";
import { memo } from "react";

const News = () => {
  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: "/",
      title: "HOME",
    },
    {
      title: "NEWS",
    },
  ];

  return (
    <Stack px={SCREEN_PX} py={4} direction={"column"} gap={4}>
      <Stack direction={"column"} gap={2}>
        <Breadcumbs breadcumbs={breadcrumbs} />
        <Stack direction={"column"}>
          <Text color={palette.textWhite} fontWeight={700} fontSize={"31px"}>
            News
          </Text>
          <Text color={palette.colorGray} fontWeight={400} fontSize={"16px"}>
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
