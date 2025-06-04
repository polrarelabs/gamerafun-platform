"use client";

import { getImageSrc } from "@components/helper";
import { BoxSelected, DialogShare, Image, Text } from "@components/shared";
import ShareIcon from "@icons/common/ShareIcon";
import { Avatar, AvatarGroup, Stack } from "@mui/material";
import { palette } from "public/material";
import React, { memo, useState } from "react";
import img from "public/images/img-local.png";
import { usePathname } from "next/navigation";
import { useQuest } from "@store/quests";

const InfoQuest = () => {
  const { questById } = useQuest();

  const pathname = usePathname();

  const [openShare, setOpenShare] = useState<boolean>(false);

  const [hover, setHover] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenShare(true);
  };

  return (
    <Stack gap={4}>
      <Stack>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <BoxSelected
            value="active"
            isClose={false}
            isBorder={false}
            border={true}
            color={palette.colorQuests?.main}
            bgColor={palette.colorQuests?.bgTags}
            isPadding={false}
          />
          <Text
            color={palette.colorQuests?.main}
            fontSize={"12px"}
            fontWeight={600}
            textTransform={"uppercase"}
          >
            Ends in 17D 07H
          </Text>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Text fontSize={"44px"} fontWeight={700} color="white">
            {questById.name}
          </Text>
          <ShareIcon
            onClick={handleOpen}
            sx={{
              "&:hover": {
                cursor: "pointer",
                // background: palette.colorQuests?.bgMissionHover
              },
            }}
          />
        </Stack>
      </Stack>
      <Stack width={100}>
        <Image
          src={getImageSrc("data.mediaUrl[0]", img)}
          alt={`img-${img}`}
          size="100%"
          aspectRatio={2 / 1}
          sizes={100}
          draggable={false}
          containerProps={{
            sx: {
              width: 100,
              height: 48,
              overflow: "hidden",
              borderRadius: "8px",

              border: "1px",
              borderColor: palette.borderColorLinear,
              "& img": {
                objectFit: "cover",
                objectPosition: "center",
                transition: "all 0.2s ease-in-out",
              },
            },
          }}
        />
      </Stack>
      <Text color={palette.colorReview?.textCopy} fontSize={"18px"}>
        Moonfrost combines the charm of classic titles like Stardew Valley.
        Customize your farm, build relationships with a diverse cast of
        characters, and uncover the secrets of the mysterious Frost.
      </Text>
      <Text color={palette.colorReview?.textCopy} fontSize={"18px"}>
        Complete the missions below for a chance to win one of 75 Gnome Key NFTs
        and 20 Whitelist spots.
      </Text>
      <Stack
        direction={"row"}
        justifyContent={"start"}
        gap={1}
        alignItems={"center"}
      >
        <AvatarGroup
          spacing={hover ? 10 : 15}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={img.src}
            sx={{ width: 44, height: 44 }}
          />
          <Avatar
            alt="Travis Howard"
            src={img.src}
            sx={{ width: 44, height: 44 }}
          />
          <Avatar
            alt="Agnes Walker"
            src={img.src}
            sx={{ width: 44, height: 44 }}
          />
        </AvatarGroup>
        <Text fontSize={"14px"} color={palette.colorReview?.textCopy}>
          +1000 completing
        </Text>
      </Stack>

      <DialogShare
        open={openShare}
        setOpen={setOpenShare}
        pathname={pathname}
      />
    </Stack>
  );
};

export default memo(InfoQuest);
