"use client";
import { Text } from "@components/shared";
import { SCREEN_PX } from "@constant";
import { Breadcrumbs, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@components/Link";
import { memo } from "react";
import { NEWS_PATH } from "@constant/paths";

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
          <Link underline="hover" color="inherit" href={NEWS_PATH}>
            <Text sx={{ color: "text.primary" }}>NEWS</Text>
          </Link>
          <Text sx={{ color: "text.primary" }}>id</Text>
        </Breadcrumbs>
        <Stack direction={"column"}>
          <Text color="#F9FAFB" fontWeight={700} fontSize={"31px"}>
            Details
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(News);
