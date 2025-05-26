"use client";
import { NewsDetail } from "@components/screens/News";
import { Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX } from "@constant";
import { HOME_PATH, NEWS_PATH } from "@constant/paths";
import { Stack } from "@mui/material";
import { useBlog } from "@store/new";
import { palette } from "public/material";
import { memo, useEffect } from "react";
import CircleCheckIcon from "@icons/common/CircleCheckIcon";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useParams } from "next/navigation";
dayjs.extend(advancedFormat);

const News = () => {
  const { blogId, getBlogId } = useBlog();

  const param = useParams();

  useEffect(() => {
    const id = param.token as string;
    getBlogId(id);
  }, []);

  const breadcrumbs: BreadcumbsItem[] = [
    {
      href: HOME_PATH,
      title: "HOME",
    },
    {
      href: NEWS_PATH,
      title: "NEWS",
    },
    {
      title: blogId.title,
    },
  ];
  return (
    <Stack px={SCREEN_PX} py={4} direction={"column"} gap={2}>
      <Stack direction={"column"} gap={2} maxWidth={"50%"}>
        <Breadcumbs breadcumbs={breadcrumbs} />
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          p={"6px 16px 4px"}
          bgcolor={palette.colorGame?.colorBtnNew}
          sx={{
            clipPath:
              "polygon(calc(0% + 10px) 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            width: "fit-content",
          }}
        >
          <Text
            color={"white"}
            fontWeight={500}
            fontSize={"12px"}
            fontStyle={"italic"}
            textTransform={"uppercase"}
          >
            news
          </Text>
        </Stack>
      </Stack>
      <Text color={"white"} fontWeight={700} fontSize={"44px"}>
        {blogId.title}
      </Text>
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <Text color={palette.textWhite} fontSize={"17px"} fontWeight={600}>
          {blogId.author}
        </Text>
        <CircleCheckIcon
          sx={{
            color: palette.greenColor,
            fontSize: 16,
          }}
        />
        <span
          style={{
            color: palette.textWhite,
          }}
        >
          -
        </span>
        <Text color={palette.colorGray} fontSize={"16px"} fontWeight={400}>
          Updated {dayjs(blogId.publicDate).format("MMMM Do YYYY")}
        </Text>
      </Stack>
      {/* <Text
        color={palette.colorGame?.textColor}
        fontWeight={300}
        fontSize={"21px"}
      >
        {blogId.shortDescription}
      </Text> */}
      <NewsDetail />
    </Stack>
  );
};

export default memo(News);
