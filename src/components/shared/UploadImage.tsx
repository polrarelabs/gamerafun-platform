"use client";

import { Button, Image, Text } from "@components/shared";
import { Dialog, Stack, styled } from "@mui/material";
import React, { memo, useEffect, useRef, useState } from "react";
import { useGame } from "@store/game";
import { InfoImage } from "@components/screens/Games/components";
import { useGallery } from "@store/media";
import EyeIcon from "@icons/common/EyeIcon";
import TrashIcon from "@icons/common/TrashIcon";
import { palette } from "public/material";
import img from "/public/images/img-logo.png";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export interface PropsUpload {
  ratioWidth: number;
  ratioHeight: number;
  imgUrl?: string | null;
}

export interface PropsInfo {
  file: File;
  widthImg: number;
  heightImg: number;
}

interface InfoImage {
  widthImg: number;
  heightImg: number;
  url: string;
}

const UploadImage = ({
  ratioWidth,
  ratioHeight,
  imgUrl = null,
}: PropsUpload) => {
  const { errorsSizeImage, SetErrorsSizeImage } = useGame();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [hover, setHover] = useState<boolean>(false);
  const handleDelete = () => {
    // dataList.splice(id, 1);
    console.log("delete");
  };

  const IconAction = [
    {
      ICON: EyeIcon,
      onClick: handleClickOpen,
    },
    {
      ICON: TrashIcon,
      onClick: handleDelete,
    },
  ];

  const { uploadGallery, dataGallery, loadingGallery } = useGallery();
  const [image, setImage] = useState<InfoImage | null>(null);
  useEffect(() => {
    if (dataGallery) {
      console.log("success", dataGallery);
    } else console.log("loading");
  }, [loadingGallery]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const files = e.target.files;
    if (!file || !files?.length) return;

    const message = getMessageCheckFile(files[0]);
    if (message) {
      SetErrorsSizeImage(message);
      if (inputRef?.current?.value) {
        inputRef.current.value = "";
      }
    } else {
      const imageUrl = URL.createObjectURL(file);
      const img = new window.Image();
      img.src = imageUrl;

      img.onload = () => {
        const actualRatio = img.width / img.height;
        const expectedRatio = ratioWidth / ratioHeight;
        const isValidRatio = Math.abs(actualRatio - expectedRatio) < 0.5;

        if (isValidRatio) {
          setImage({
            widthImg: img.width,
            heightImg: img.height,
            url: imageUrl,
          });
          SetErrorsSizeImage(null);
          const data = new FormData();
          data.append("file", file);
          data.append("name", file.name);
          data.append("description", file.type);
          uploadGallery(data);
        } else {
          SetErrorsSizeImage(
            `The image must follow a ${ratioWidth}:${ratioHeight} aspect ratio`,
          );
        }
      };
    }
  };

  console.log("image", image);
  console.log("imgUrl", imgUrl);

  return (
    <>
      <Stack position="relative" direction="row" height="100%" width="100%">
        <Stack flex={1} alignItems={"center"} gap={2} mt={2}>
          {image === null && imgUrl === null ? (
            <Button
              component="label"
              variant="outlined"
              tabIndex={-1}
              sx={{
                borderRadius: "8px",
                p: 2,
                width: "max-content",
              }}
            >
              Upload image
              <VisuallyHiddenInput
                ref={inputRef}
                type="file"
                onChange={handleChange}
                accept="image/png"
              />
            </Button>
          ) : (
            <Stack
              position={"relative"}
              sx={{
                borderRadius: "8px",
                width: 600,
                height: 400,
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Stack
                component={"label"}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Image
                  src={image ? image.url : imgUrl}
                  alt="preview"
                  size="100%"
                  aspectRatio={3 / 2}
                  sizes="960px"
                  containerProps={{
                    sx: {
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      borderRadius: "8px",
                      "& img": {
                        objectFit: "cover",
                        objectPosition: "center",
                      },
                    },
                  }}
                />
                <VisuallyHiddenInput
                  ref={inputRef}
                  type="file"
                  onChange={handleChange}
                  accept="image/png"
                />
              </Stack>
              <Stack
                position={"absolute"}
                left={"50%"}
                sx={{
                  translate: "-50% -50%",
                }}
                bottom={-2}
                direction={"row"}
                gap={2}
                alignItems={"center"}
              >
                {IconAction.map(({ ICON, onClick }, index) => {
                  return (
                    <ICON
                      key={index}
                      sx={{
                        color: hover
                          ? palette.colorIconHover
                          : palette.colorIcon,
                        fontSize: 20,
                        height: 20,
                        width: 20,
                        borderRadius: 1000,
                        "&:hover": {
                          color: "black",
                          cursor: "pointer",
                        },
                      }}
                      onClick={onClick}
                    />
                  );
                })}
              </Stack>
            </Stack>
          )}
          {errorsSizeImage && (
            <Text
              color="red"
              sx={{
                width: "100%",
                textAlign: "center",
              }}
            >
              {errorsSizeImage}
            </Text>
          )}
        </Stack>
      </Stack>
      <Dialog fullWidth open={open} onClose={handleClose} maxWidth={"xl"}>
        <Stack
          sx={{
            borderRadius: "8px",
            width: "100%",
            height: "100%",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          onClick={handleClickOpen}
        >
          <Image
            src={image?.url}
            alt="preview"
            size="100%"
            aspectRatio={3 / 2}
            sizes="960px"
            containerProps={{
              sx: {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "8px",
                "& img": {
                  objectFit: "cover",
                  objectPosition: "center",
                },
              },
            }}
          />
        </Stack>
      </Dialog>
    </>
  );
};

export default memo(UploadImage);

const MAX_SIZE = 10 * 1024 * 1024;

export const IMAGES_ACCEPT_INPUT = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/svg+xml",
  "image/webp",
];

const getMessageCheckFile = (file: File) => {
  const { type, size } = file;
  switch (true) {
    case !IMAGES_ACCEPT_INPUT.includes(type):
      return "Image is invalid";
    case size > MAX_SIZE:
      return "Image exceed 10MB";
    default:
      return undefined;
  }
};
