"use client";

import { Image, Text } from "@components/shared";
import { Stack } from "@mui/material";
import React, { memo, useState } from "react";
import img from "public/images/cover-seo.jpg";

const LastNewsLists = () => {
  const [hover, setHover] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

  return (
    <Stack flex={5} direction={"column"} gap={4}>
      <Stack>
        <Text color="#F9FAFB" fontWeight={700} fontSize={"31px"}>
          News
        </Text>
      </Stack>
      <Stack display={"grid"} gridTemplateColumns={"repeat(4,1fr)"} gap={4}>
        {Array.from({ length: 12 }).map((_, index) => {
          return (
            <Stack
              key={index}
              direction={"column"}
              borderRadius={"16px"}
              p={"6px"}
              border={"1px solid grey"}
              bgcolor={"#111827"}
              sx={{
                transition: "translate 0.2s ease-in-out",
                "&:hover": {
                  translate: "0 -6px",
                  cursor: "pointer",
                },
              }}
              onMouseEnter={() => {
                setHover(true);
                setId(index);
              }}
              onMouseLeave={() => {
                setHover(false);
                setId(null);
              }}
            >
              <Stack>
                <Image
                  src={img}
                  alt={`img-${img}`}
                  size="100%"
                  // aspectRatio={(hover && id === index) ? 7 / 4 : 7 / 3}
                  aspectRatio={7 / 3}
                  sizes="960px"
                  containerProps={{
                    sx: {
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      borderRadius: "16px",

                      border: "1px",
                      borderColor:
                        "linear-gradient(180deg,rgba(189, 189, 189, 1) 0%, rgba(87, 87, 87, 0.5) 100%)",
                      "& img": {
                        objectFit: hover && id === index ? "cover" : "fill",
                        objectPosition: "center",
                        transition: "all 0.5s ease-in-out",
                      },
                    },
                  }}
                />
              </Stack>

              <Stack direction={"column"} gap={2} p={2}>
                <Text color="#9CA3AF" fontSize={"12px"} fontWeight={600}>
                  TIME
                </Text>

                <Text color="#F9FAFB" fontSize={"18px"} fontWeight={700}>
                  Name
                </Text>

                <Text color="#9CA3AF" fontSize={"14px"} fontWeight={400}>
                  Description
                </Text>

                <Text
                  color="#7dffac"
                  fontSize={"12px"}
                  fontWeight={600}
                  textTransform={"uppercase"}
                  sx={{
                    backgroundColor:
                      "color-mix(in srgb, #33F57A, transparent 85%)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    width: "max-content",
                    border: "1px solid #0a5d2b80",
                  }}
                >
                  Tag
                </Text>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default memo(LastNewsLists);
