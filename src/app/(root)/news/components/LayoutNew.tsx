import { Image, Text } from "@components/shared";
import { Stack } from "@mui/material";
import React, { memo } from "react";
import img from "public/images/cover-seo.jpg";

const LayoutNew = () => {
  return (
    <Stack direction={"column"} gap={3}>
      <Stack direction={"row"} gap={3}>
        <Stack flex={2} position={"relative"}>
          <Image
            src={img}
            alt={`img-${img}`}
            size="100%"
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
                  objectFit: "cover",
                  objectPosition: "center",
                },
              },
            }}
          />
          <Stack position={"absolute"} bottom={0} p={4} direction={"column"}>
            <Text color="white" fontWeight={700} fontSize={"20px"}>
              News
            </Text>
            <Text color="#9ca3af" fontWeight={400} fontSize={"14px"}>
              Stay on top of the latest blockchain gaming news and enjoy
              exclusive interviews and informative web3 gaming opinion pieces.
            </Text>
          </Stack>
        </Stack>

        <Stack flex={1} position={"relative"}>
          <Image
            src={img}
            alt={`img-${img}`}
            size="100%"
            aspectRatio={7 / 3}
            sizes="960px"
            containerProps={{
              sx: {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "16px",
                "& img": { objectFit: "cover", objectPosition: "center" },
              },
            }}
          />
          <Stack position={"absolute"} bottom={0} p={4} direction={"column"}>
            <Text color="white" fontWeight={700} fontSize={"20px"}>
              News
            </Text>
            <Text color="#9ca3af" fontWeight={400} fontSize={"14px"}>
              Stay on top of the latest blockchain gaming news and enjoy
              exclusive interviews and informative web3 gaming opinion pieces.
            </Text>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction={"row"} gap={3}>
        <Stack flex={1} position={"relative"} gap={2}>
          <Image
            src={img}
            alt={`img-${img}`}
            size="100%"
            aspectRatio={3 / 1.5}
            sizes="960px"
            containerProps={{
              sx: {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "16px",
                "& img": { objectFit: "cover", objectPosition: "center" },
              },
            }}
          />
          <Text color="white" fontWeight={700} fontSize={"20px"}>
            News
          </Text>
        </Stack>
        <Stack flex={1} position={"relative"} gap={2}>
          <Image
            src={img}
            alt={`img-${img}`}
            size="100%"
            aspectRatio={3 / 1.5}
            sizes="960px"
            containerProps={{
              sx: {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "16px",
                "& img": { objectFit: "cover", objectPosition: "center" },
              },
            }}
          />
          <Text color="white" fontWeight={700} fontSize={"20px"}>
            News
          </Text>
        </Stack>
        <Stack flex={1} position={"relative"} gap={2}>
          <Image
            src={img}
            alt={`img-${img}`}
            size="100%"
            aspectRatio={3 / 1.5}
            sizes="960px"
            containerProps={{
              sx: {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "16px",
                "& img": { objectFit: "cover", objectPosition: "center" },
              },
            }}
          />
          <Text color="white" fontWeight={700} fontSize={"20px"}>
            News
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(LayoutNew);
