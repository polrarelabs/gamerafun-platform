/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { formatMMMMDoYYYY } from "@components/helper";
import { Image, Text } from "@components/shared";
import Breadcumbs, { BreadcumbsItem } from "@components/shared/Breadcumbs";
import { SCREEN_PX } from "@constant";
import { HOME_PATH, NEWS_PATH } from "@constant/paths";
import CircleCheckIcon from "@icons/common/CircleCheckIcon";
import { Stack } from "@mui/material";
import { useBlog } from "@store/new";
import { useParams } from "next/navigation";
import { palette } from "public/material";
import { memo, useEffect } from "react";

const BannerNew = () => {
  const { getBlogId, blogId } = useBlog();

  const param = useParams();

  useEffect(() => {
    const id = param.slug as string;
    getBlogId(id);
  }, [param.slug]);

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
    <Stack
      px={SCREEN_PX}
      py={4}
      direction={"column"}
      gap={2}
      position={"relative"}
    >
      <Stack
        position={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        zIndex={2}
        sx={{
          background: palette.colorRelate?.linearImage,
          opacity: 0.5,
        }}
      />
      <Stack
        position={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        zIndex={1}
      >
        {blogId.thumbnailUrl && (
          <Image
            src={blogId.thumbnailUrl}
            alt={`img-${blogId.thumbnailUrl}`}
            size="100%"
            aspectRatio={3 / 2}
            sizes={`1920px`}
            containerProps={{
              sx: {
                width: `100%`,
                height: "100%",
                overflow: "hidden",
                opacity: 0.1,
                border: "1px",
                borderColor: palette.borderColorLinear,
                "& img": {
                  objectFit: "cover",
                  objectPosition: "center",
                },
              },
            }}
          />
        )}
      </Stack>
      <Stack direction={"column"} gap={2} maxWidth={"50%"} zIndex={2}>
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
      <Text color={"white"} fontWeight={700} fontSize={"44px"} zIndex={2}>
        {blogId.title}
      </Text>
      <Stack direction={"row"} gap={2} alignItems={"center"} zIndex={2}>
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
          Updated {formatMMMMDoYYYY(blogId.publicDate)}
        </Text>
      </Stack>
    </Stack>
  );
};

export default memo(BannerNew);
