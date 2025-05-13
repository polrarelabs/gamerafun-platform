"use client";

import { Button, Image, Text } from "@components/shared";
import { Stack, styled } from "@mui/material";
import { useGameReducers } from "@store/game";
import { useGallery } from "@store/media";
import React, { memo, useRef } from "react";

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

interface PropsUpload {
  ratioWidth: number;
  ratioHeight: number;
}

const UploadAvarta = ({ ratioWidth, ratioHeight }: PropsUpload) => {
  const { uploadGallery, dataGallery } = useGallery();
  const { errorsSizeImage, SetErrorsSizeImage } = useGameReducers();
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

  return (
    <>
      {dataGallery.url ? (
        <Stack
          component="label"
          sx={{
            position: "absolute",
            borderRadius: "8px",
            width: 300,
            height: 200,
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Image
            src={dataGallery.url}
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
            accept="image/png,image/jpeg,image/jpg"
          />
        </Stack>
      ) : (
        <Stack
          position="relative"
          direction="column"
          height="100%"
          width="100%"
        >
          <Button
            component="label"
            variant="outlined"
            tabIndex={-1}
            sx={{
              position: "absolute",
              borderRadius: "8px",
              p: 10,
              width: 300,
              height: 200,
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
            }}
          >
            Upload image ({ratioWidth}:{ratioHeight})
            <VisuallyHiddenInput
              ref={inputRef}
              type="file"
              onChange={handleChange}
              accept="image/png,image/jpeg,image/jpg"
            />
          </Button>

          {errorsSizeImage && (
            <Text
              color="red"
              sx={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                translate: "-50% -50%",
                width: "100%",
                textAlign: "center",
              }}
            >
              {errorsSizeImage}
            </Text>
          )}
        </Stack>
      )}
    </>
  );
};

export default memo(UploadAvarta);

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
