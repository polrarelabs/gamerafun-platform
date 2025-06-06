/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, DialogShare, Image, Text } from "@components/shared";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { usePathname } from "next/navigation";
import { palette } from "public/material";
import { memo, useState } from "react";
import useBreakpoint from "@hooks/useBreakpoint";
import GroupButtons from "./GroupButtons";
import { GetIcon } from "../Games/components";

const InfoOverview = () => {
  const pathname = usePathname();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { gameById } = useGame();

  const option = [
    {
      title: "Developer",
      value: gameById.developer,
    },
    {
      title: "Status",
      value: gameById.statusGame,
    },
    {
      title: "Platforms",
      value: gameById.platformLink,
    },
  ];
  const getPlatform = (data: any[]) => {
    const arr: string[] = [];
    if (data && data.length > 0) {
      data.forEach((item) => arr.push(Object.keys(item)[0]));
    }
    return arr;
  };

  const { isLgSmaller, isSmSmaller } = useBreakpoint();

  return (
    <Stack direction={"column"} gap={4} position={"sticky"} top={0}>
      {!isLgSmaller && <GroupButtons />}
      <Stack
        direction={"column"}
        p={"24px"}
        gap={4}
        bgcolor={palette.colorRelate?.colorBtn}
      >
        {gameById.mediaUrl && (
          <Stack position={"relative"}>
            <Image
              src={gameById.mediaUrl[0]}
              alt={`img-${gameById.mediaUrl[0]}`}
              size="100%"
              aspectRatio={1 / 1}
              sizes={150}
              draggable={false}
              containerProps={{
                sx: {
                  width: 150,
                  height: 150,
                  overflow: "hidden",
                  borderRadius: "5px",
                  "& img": {
                    objectFit: "cover",
                    objectPosition: "center",
                  },
                },
              }}
            />
          </Stack>
        )}
        {!isSmSmaller && (
          <Text color={palette.textWhite} fontSize={"16px"}>
            {gameById.description}
          </Text>
        )}

        <Stack direction={"row"} gap={1} alignItems={"center"}>
          {gameById &&
            gameById.genreName &&
            gameById.genreName.length > 0 &&
            gameById.genreName.map((item, index) => {
              return (
                <Text
                  key={index}
                  color={palette.greenColorText}
                  fontSize={"12px"}
                  fontWeight={600}
                  textTransform={"uppercase"}
                  sx={{
                    backgroundColor: palette.greenColorButton,
                    padding: "4px 8px",
                    borderRadius: "5px",
                    width: "max-content",
                    border: `1px solid ${palette.colorBorderTag}`,
                  }}
                >
                  {item}
                </Text>
              );
            })}
        </Stack>
        {isSmSmaller && (
          <Text color={palette.textWhite} fontSize={"16px"}>
            {gameById.description}
          </Text>
        )}
        <Stack direction={"column"} gap={2}>
          {option.map((item, index) => {
            return (
              <Stack key={index} direction={"row"} gap={1} alignItems={"end"}>
                <Text color={palette.colorTextGray} fontSize={"16px"}>
                  {item.title}
                </Text>
                <hr
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: `1px dashed ${palette.colorRelate?.borderColor}`,
                    marginBottom: 6,
                  }}
                />
                {index === 2 ? (
                  <GetIcon array={getPlatform(item.value as any[])} />
                ) : (
                  <Text color={"white"} fontSize={"16px"}>
                    {item.value as string}
                  </Text>
                )}
              </Stack>
            );
          })}
        </Stack>

        <Stack>
          <Button
            variant="contained"
            sx={{
              borderRadius: "5px !important",
              fontWeight: "700 !important",
              fontSize: "18px !important",
            }}
            onClick={() => setOpenDialog(true)}
          >
            Share
          </Button>
        </Stack>
      </Stack>
      <DialogShare
        open={openDialog}
        setOpen={setOpenDialog}
        pathname={pathname}
      />
    </Stack>
  );
};

export default memo(InfoOverview);
